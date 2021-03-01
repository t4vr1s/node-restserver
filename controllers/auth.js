const { response } = require('express')
const bcryptjs = require('bcrypt')
const { Usuario } = require('../models')
const { generarJWT } = require('../helpers/generar-jwt')
const { googleVerify } = require('../helpers/google-verify')

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

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body
  try {
    const googleUser = await googleVerify(id_token)
    const { nombre, correo, img } = googleUser
    let usuario = await Usuario.findOne({ correo })
    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: ':P',
        img,
        google: true
      }

      usuario = new Usuario(data)
      await usuario.save()

      if (!usuario.estado) {
        return res.status(401).json({
          msg: 'Hable con el administrador'
        })
      }
      // generar jwt
      const token = await generarJWT(usuario.id)
      res.json({
        usuario,
        token
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({
      msg: 'Token de google no válido'
    })
  }
}

module.exports = {
  login,
  googleSignIn
}
