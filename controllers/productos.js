const { request, response } = require('express')
const { Producto } = require('../models')

const obtenerProductos = async (req = request, res = response) => {
  const { limite = 0, desde = 0 } = req.query
  const query = { estado: true }
  try {
    const [total, productos] = await Promise.all([
      Producto.countDocuments(query),
      Producto
        .find(query)
        .limit(Number(limite))
        .skip(Number(desde))
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
    ])

    res.json({
      total,
      productos
    })
  } catch (error) {
    console.log(error)
  }
}

const obtenerProducto = async (req = request, res = response) => {
  const { id } = req.params
  try {
    const producto = await Producto
      .findById(id)
      .populate('usuario', 'nombre')
      .populate('categoria', 'nombre')
    res.json(producto)
  } catch (error) {
    console.log(error)
  }
}

const crearProducto = async (req = request, res = response) => {
  const { estado, usuario, ...body } = req.body
  try {
    const productoDB = await Producto.findOne({ nombre: body.nombre })
    if (productoDB) {
      return res.status(400).json({
        msg: `El Producto: ${productoDB.nombre} ya existe`
      })
    }
    const data = {
      nombre: body.nombre.toUpperCase(),
      body,
      usuario: req.usuario._id
    }
    const producto = new Producto(data)
    await producto.save()
    res.status(201).json(producto)
  } catch (error) {
    console.log(error)
  }
}
const actualizarProducto = async (req = request, res = response) => {
  const { id } = req.params
  const { estado, usuario, ...data } = req.body
  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase()
  }
  data.usuario = req.usuario._id
  try {
    const producto = await Producto
      .findByIdAndUpdate(id, data, { new: true })
      .populate('usuario', 'nombre')
      .populate('categoria', 'nombre')
    res.json(producto)
  } catch (error) {
    console.log(error)
  }
}
const eliminarProducto = async (req = request, res = response) => {
  const { id } = req.params
  const producto = await Producto.findByIdAndUpdate(id, {
    estado: false
  }, {
    new: true
  })
  res.json(producto)
}

module.exports = {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  obtenerProducto,
  obtenerProductos
}
