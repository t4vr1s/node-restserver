const { Usuario, Categoria, Role, Producto } = require('../models')

const esRoleValido = async (rol = '') => {
  const existRol = await Role.findOne({ rol })
  if (!existRol) {
    throw new Error(`El rol: ${rol}. No se encuentra registrado`)
  }
}

const esEmail = async (correo = '') => {
  const encontrarEmail = await Usuario.findOne({ correo })
  if (encontrarEmail) {
    throw new Error(`El correo: ${correo} ya se encuentra registrado`)
  }
}

const existeUsuarioPorId = async (id) => {
  const encuentraUsuario = await Usuario.findById(id)
  if (!encuentraUsuario) {
    throw new Error(`No existe un usuario con el id: ${id}`)
  }
}

const existeCategoriaPorId = async (id) => {
  const encuentraCategoria = await Categoria.findById(id)
  if (!encuentraCategoria) {
    throw new Error(`No existe una categoría con el id: ${id}`)
  }
}

const existeProductoPorId = async (id) => {
  const encuentraProducto = await Producto.findById(id)
  if (!encuentraProducto) {
    throw new Error(`No existe un producto con el id: ${id}`)
  }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
  const incluida = colecciones.includes(coleccion)
  if (!incluida) {
    throw new Error(`La colección: ${coleccion} no es permitida, ${colecciones}`)
  }
  return true
}

module.exports = {
  coleccionesPermitidas,
  esEmail,
  esRoleValido,
  existeCategoriaPorId,
  existeProductoPorId,
  existeUsuarioPorId
}
