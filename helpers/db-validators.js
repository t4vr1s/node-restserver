const Role = require('../models/role')
const Usuario = require('../models/usuario')

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

module.exports = {
  esRoleValido,
  esEmail,
  existeUsuarioPorId
}
