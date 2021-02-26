const mongoose = require('mongoose')
require('colors')

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    console.log('CONECTADO A LA DB'.green)
  } catch (error) {
    console.log(error)
    throw new Error('ERROR AL CONECTAR CON LA BASE DE DATOS'.red)
  }
}

module.exports = {
  dbConnection
}
