
const { Router } = require('express');


const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { registerAdmin, registerCustomer, registerEmpleado, login } = require('../controllers/auth.controller');

const router = Router();


//? Registro de un nuevo admin
router.post('/register/admin', [
    validarJWT,
    validarCampos
], registerAdmin);


//? Registro de un nuevo customer
router.post('/register/customer', [
    validarJWT,
    validarCampos
], registerCustomer);


//? Registro de un nuevo empleado
router.post('/register/empleado', [
    validarJWT,
    validarCampos
], registerEmpleado);


//? Login de los customers autorizados
router.post('/login', login);


module.exports = router;


