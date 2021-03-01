const { response, request } = require('express')
const { Categoria } = require('../models')

const obtenerCategorias = async (req = request, res = response) => {
  const { limite = 0, desde = 0 } = req.query

  try {
    const query = { estado: true }
    const [total, categoria] = await Promise.all([
      Categoria.countDocuments(query),
      Categoria.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
        .populate('usuario', 'nombre')
    ])

    res.json({
      total,
      categoria
    })
  } catch (error) {
    console.log(error)
  }
}

const obtenerCategoria = async (req = request, res = response) => {
  const { id } = req.params
  try {
    const categoria = await Categoria
      .findById(id)
      .populate('usuario', 'nombre')
    res.json(categoria)
  } catch (error) {
    console.log(error)
  }
}

const crearCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase()
  const categoriaDB = await Categoria.findOne({ nombre })
  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoría: ${nombre} ya existe`
    })
  }
  const data = {
    nombre,
    usuario: req.usuario._id
  }
  const categoria = new Categoria(data)
  await categoria.save()
  res.status(201).json({
    categoria
  })
}

// actualizar categoria
const actualizarCategoria = async (req = request, res = response) => {
  const { id } = req.params
  const { estado, usuario, ...data } = req.body
  data.nombre = data.nombre.toUpperCase()
  data.usuario = req.usuario._id
  try {
    const categoria = await Categoria
      .findByIdAndUpdate(id, data, { new: true })
      .populate('usuario', 'nombre')
    res.json(categoria)
  } catch (error) {
    console.log(error)
  }
}

// borrar categoria - estado false
const borrarCategoria = async (req = request, res = response) => {
  const { id } = req.params
  const categoria = await Categoria.findByIdAndUpdate(id, {
    estado: false
  }, {
    new: true
  })
  res.json(categoria)
}

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria
}
