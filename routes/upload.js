const { Router } = require('express')
const { validarCampos, validarArchivo } = require('../middlewares/')
const {
  cargarArchivo,
  actualizarImagenCloudinary,
  mostrarImagen
} = require('../controllers/upload')
const { check } = require('express-validator')
const { coleccionesPermitidas } = require('../helpers')
const router = Router()

router.get('/:coleccion/:id', [
  check('id', 'El id debe ser de mongo').isMongoId(),
  check('coleccion').custom(coleccion =>
    coleccionesPermitidas(coleccion, ['usuarios', 'productos'])),
  validarCampos
], mostrarImagen)

router.post('/', validarArchivo, cargarArchivo)

router.put('/:coleccion/:id', [
  validarArchivo,
  check('id', 'El id debe ser de mongo').isMongoId(),
  check('coleccion').custom(coleccion =>
    coleccionesPermitidas(coleccion, ['usuarios', 'productos'])),
  validarCampos
], actualizarImagenCloudinary)
// ], actualizarArchivo)

module.exports = router
