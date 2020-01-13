const cote = require('cote')
const snapcastServer = require('./src/SnapcastServer')
const masterServer = require('./src/MasterServer')
const { getIPAdress, restartBalenaService } = require('./src/utils')

const fleetPublisher = new cote.Publisher({ name: 'Fleet publisher' })
const fleetSubscriber = new cote.Subscriber({ name: 'Fleet subscriber' })

// Connect to the local snapcast server
// On audio playback, set this server as the master
snapcastServer.connect()
snapcastServer.onPlayback((data) => {
  fleetPublisher.publish('fleet-update', { master: getIPAdress() })
})

// Handle fleet-update events
// Whenever the master server changes, reset snapcast-client service
fleetSubscriber.on('fleet-update', (update) => {
  console.log(update)

  if (masterServer.address !== update.master) {
    restartBalenaService('snapcast-client')
    masterServer.update(update.master)
  }

})

// Simple http server to share server address
// On restart, snapcast-client service will grab the new master server ip address from here
// TODO: Find a better way of doing this
masterServer.listen()
