const { response, request } = require('express')

const esAdminRol = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: 'Se debe validar el token antes que el Rol'
    })
  }

  const { rol, nombre } = req.usuario

  if (rol !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${nombre} no es administrador - no puede hacer esto`
    })
  }

  next()
}

const tieneRol = (...roles) => {
  return (req, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: 'Se debe validar el token antes que el Rol'
      })
    }
    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`
      })
    }
    next()
  }
}

module.exports = {
  esAdminRol,
  tieneRol
}
