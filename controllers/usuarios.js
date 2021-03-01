const { response, request } = require('express')
const bcrypt = require('bcrypt')
const { Usuario } = require('../models/')

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query
  const query = { estado: true }
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
  ])
  res.json({
    total,
    usuarios
  })
}

const usuariosPost = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body
  const usuario = new Usuario({ nombre, correo, password, rol })
  // encriptar password
  const salt = bcrypt.genSaltSync()
  usuario.password = bcrypt.hashSync(password, salt)
  // guardar db
  await usuario.save()
  res.json({
    usuario
  })
}

const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params
  const { password, google, ...newBody } = req.body
  console.log(newBody)
  // TODO: validar contra db
  if (password) {
    // encriptar password
    const salt = bcrypt.genSaltSync()
    newBody.password = bcrypt.hashSync(password, salt)
  }
  const usuario = await Usuario.findByIdAndUpdate(id, newBody)
  res.json(usuario)
}

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: 'patch api - desde el controlador'
  })
}

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params
  const usuario = await Usuario.findByIdAndUpdate(id, {
    estado: false
  })
  const usuarioAutenticado = req.usuario
  res.json({
    usuario,
    usuarioAutenticado
  })
}

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
}
