const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT
    // conexión a la db
    this.conectarDB()
    // routes
    this.path = {
      auth: '/api/auth',
      buscar: '/api/buscar',
      categorias: '/api/categorias',
      productos: '/api/productos',
      usuarios: '/api/usuarios'
    }
    // middlewares
    this.middlewares()
    // rutas de la app
    this.routes()
  }

  async conectarDB () {
    await dbConnection()
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
    this.app.use(this.path.auth, require('../routes/auth'))
    this.app.use(this.path.buscar, require('../routes/buscar'))
    this.app.use(this.path.categorias, require('../routes/categorias'))
    this.app.use(this.path.productos, require('../routes/productos'))
    this.app.use(this.path.usuarios, require('../routes/usuarios'))
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`Escuchando en http://localhost:${this.port}`)
    })
  }
}

module.exports = Server
