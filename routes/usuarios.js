const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const {
  esRoleValido,
  esEmail,
  existeUsuarioPorId
} = require('../helpers/db-validators')
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
} = require('../controllers/usuarios')

router.get('/', usuariosGet)

router.post('/', [
  check('nombre', 'El nombre es obligatorio').notEmpty(),
  check('password', 'El password debe tener al menos 6 letras').isLength({ min: 6 }),
  check('rol').custom(esRoleValido),
  check('correo', 'El correo no es válido').isEmail(),
  check('correo').custom(esEmail),
  validarCampos
], usuariosPost)

router.put('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom(esRoleValido),
  validarCampos
], usuariosPut)

router.patch('/', usuariosPatch)

router.delete('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  validarCampos
], usuariosDelete)

module.exports = router
