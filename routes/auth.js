const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const { login, googleSignIn } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar-campos')

router.post('/login', [
  check('correo', 'El correo es obligarotio').isEmail(),
  check('password', 'La contraseña es obligatoria').notEmpty(),
  validarCampos
], login)
router.post('/google', [
  check('id_token', 'El id_token es obligarotio').notEmpty(),
  validarCampos
], googleSignIn)

module.exports = router
