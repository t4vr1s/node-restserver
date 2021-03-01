const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const { existeCategoriaPorId } = require('../helpers/db-validators')
const {
  validarJWT,
  esAdminRol,
  validarCampos
} = require('../middlewares')
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria
} = require('../controllers/categorias')

// obtener todas las categorias
router.get('/', obtenerCategorias)

// obtener una categoria
router.get('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos
], obtenerCategoria)

// crear una categoria - privado con token valido
router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').notEmpty(),
  validarCampos
], crearCategoria)

// actualizar una categoria - privado con token valido
router.put('/:id', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').notEmpty(),
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos
], actualizarCategoria)

// borrar categoria - privado admin

router.delete('/:id', [
  validarJWT,
  esAdminRol,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos
], borrarCategoria)

module.exports = router
