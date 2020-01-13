const os = require('os')
const { exec } = require('child_process')

module.exports.getIPAdress = () => {
  let interfaces = os.networkInterfaces()
  let address = '127.0.0.1'

  if (interfaces.wlan0) {
    address = interfaces.wlan0.find(i => i.family === 'IPv4').address
  } else if (interfaces.eth0) {
    address = interfaces.eth0.find(i => i.family === 'IPv4').address
  }

  return address
}

module.exports.restartBalenaService = (serviceName) => {
  let command = `curl --header "Content-Type:application/json" "$BALENA_SUPERVISOR_ADDRESS/v2/applications/$BALENA_APP_ID/restart-service?apikey=$BALENA_SUPERVISOR_API_KEY" -d \'{"serviceName": "${serviceName}"}\'`
  exec(command, (err, stdout, stderr) => {
    if (err) {
      return
    }
    console.log(`stdout: ${stdout}`)
    console.log(`stderr: ${stderr}`)
  })
}