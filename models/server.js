const express = require('express')
const cors = require('cors')

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT
    // routes
    this.usuariosPath = '/api/usuarios'
    // middlewares
    this.middlewares()
    // rutas de la app
    this.routes()
  }

  middlewares () {
    // cors
    this.app.use(cors())
    // lectura y parseo del body
    this.app.use(express.json())
    // directorio público
    this.app.use(express.static('public'))
  }

  routes () {
    this.app.use(this.usuariosPath, require('../routes/usuarios'))
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`Escuchando en http://localhost:${this.port}`)
    })
  }
}

module.exports = Server
