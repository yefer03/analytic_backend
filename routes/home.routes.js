const { Router } = require('express');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getRoles,
        getCustomers } = require('../controllers/home.controller');

const router = Router();


//? Obtiene todos los roles dependiendo del id del token
router.get('/get/roles', [
    validarJWT,
    validarCampos
], getRoles );


//? Obtiene todos los customers dependiendo del id del token
router.get('/get/customer', [
    validarJWT,
    validarCampos
], getCustomers );



module.exports = router;

