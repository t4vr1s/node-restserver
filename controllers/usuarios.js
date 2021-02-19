const { response, request } = require('express')

const usuariosGet = (req = request, res = response) => {
  const { query, nombre = 'sin nombre', apikey, limit = 5, page = 1 } = req.query
  res.json({
    msg: 'get api - desde el controlador',
    query,
    nombre,
    apikey,
    limit,
    page
  })
}
const usuariosPost = (req = request, res = response) => {
  const { body } = req
  res.json({
    msg: 'post api - desde el controlador',
    body
  })
}
const usuariosPut = (req = request, res = response) => {
  const { id } = req.params
  res.json({
    msg: 'put api - desde el controlador',
    id
  })
}
const usuariosPatch = (req, res = response) => {
  res.json({
    msg: 'patch api - desde el controlador'
  })
}
const usuariosDelete = (req, res = response) => {
  res.json({
    msg: 'delete api - desde el controlador'
  })
}

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
}
