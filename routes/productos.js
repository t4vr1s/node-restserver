const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} = require('../controllers/productos')
const {
  existeCategoriaPorId,
  existeProductoPorId
} = require('../helpers/db-validators')
const {
  validarCampos,
  validarJWT,
  esAdminRol
} = require('../middlewares')

router.get('/', obtenerProductos)

router.get('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeProductoPorId),
  validarCampos
], obtenerProducto)

router.post('/', [
  validarJWT,
  check('nombre', 'El nombre no debe estar vacío').notEmpty(),
  check('categoria', 'La categoria no debe estar vacía').notEmpty(),
  check('categoria', 'No es un ID válido').isMongoId(),
  check('categoria').custom(existeCategoriaPorId),
  validarCampos
], crearProducto)

router.put('/:id', [
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeProductoPorId),
  validarCampos
], actualizarProducto)

router.delete('/:id', [
  validarJWT,
  esAdminRol,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeProductoPorId),
  validarCampos
], eliminarProducto)

module.exports = router
