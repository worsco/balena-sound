const http = require('http')

class MasterServer {
  constructor (config = {}) {
    const options = Object.assign({
      port: 3000
    }, config)
    this.options = options

    this.address = 'localhost'

    this.server = http.createServer((req, res) => {
      res.end(this.address)
    })
  }

  listen () {
    this.server.listen(this.options.port)
  }

  update (address) {
    this.address = address
  }
}

module.exports = new MasterServer()