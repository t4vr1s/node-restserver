const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const { login } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar-campos')

router.post('/login', [
  check('correo', 'El correo es obligarotio').isEmail(),
  check('password', 'La contraseña es obligatoria').notEmpty(),
  validarCampos
], login)

module.exports = router
