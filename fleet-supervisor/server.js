const cote = require('cote')
const net = require('net')
const os = require('os')
const http = require('http')
const { exec } = require('child_process')

const HTTP_PORT = 3000
const SNAPCAST_PORT = 1705

const fleetPublisher = new cote.Publisher({ name: 'Fleet publisher' })
const fleetSubscriber = new cote.Subscriber({ name: 'Fleet subscriber' })

let snapcastMasterServer = '127.0.0.1'

// Connect to the local snapcast server
let snapcast = new net.Socket()
snapcast.connect(SNAPCAST_PORT, 'localhost')

snapcast.on('data', (data) => {
  let server = getIpAddress()
  let action = getSnapcastAction(data)
  fleetPublisher.publish('fleet-update', { server: server, action: action })
})

// Handle fleet-update events
fleetSubscriber.on('fleet-update', (update) => {
  console.log(update)

  // Restart snapcast client if streaming has started and master server has changed
  if (update.action === 'playing' && snapcastMasterServer !== update.server) {
    restartSnapcastClient() 
    snapcastMasterServer = update.server // Update master server
  }

})

// Simple http server to share server address
// On restart, snapcast client will grab the new master server ip address
// TODO: Find a better way of doing this
const server = http.createServer((request, response) => {
  response.end(snapcastMasterServer)
})

server.listen(HTTP_PORT)


function getIpAddress () {
  let interfaces = os.networkInterfaces()
  let address = ''

  if (interfaces.wlan0) {
    address = interfaces.wlan0.find(i => i.family === 'IPv4').address
  } else if (interfaces.eth0) {
    address = interfaces.eth0.find(i => i.family === 'IPv4').address
  }

  return address
}

function getSnapcastAction (data) {
  try {
    let json = JSON.parse(data)
    return json.params.stream.status
  } catch (error) {
    return ''
  }
}

function restartSnapcastClient () {
  let command = 'curl --header "Content-Type:application/json" "$BALENA_SUPERVISOR_ADDRESS/v2/applications/$BALENA_APP_ID/restart-service?apikey=$BALENA_SUPERVISOR_API_KEY" -d \'{"serviceName": "snapcast-client"}\''
  exec(command, (err, stdout, stderr) => {
    if (err) {
      return
    }
    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
  })
}