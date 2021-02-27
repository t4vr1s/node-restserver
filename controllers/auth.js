const { response } = require('express')
const bcryptjs = require('bcrypt')
const Usuario = require('../models/usuario')
const { generarJWT } = require('../helpers/generar-jwt')

const login = async (req, res = response) => {
  const { correo, password } = req.body
  try {
    // verificar email
    const usuario = await Usuario.findOne({ correo })
    if (!usuario) {
      return res.status(400).json({
        msg: 'Usuario o Contraseña incorrectos'
      })
    }
    // verificar usuario activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'Usuario o Contraseña incorrectos'
      })
    }
    // verificar password
    const validPass = bcryptjs.compareSync(password, usuario.password)
    if (!validPass) {
      return res.status(400).json({
        msg: 'Usuario o Contraseña incorrectos'
      })
    }
    // generar jwt
    const token = await generarJWT(usuario.id)
    res.json({
      usuario,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Algo salió mal'
    })
  }
}

module.exports = {
  login
}
