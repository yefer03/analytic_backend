const { Router } = require('express');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getReports, identifyReport } = require('../controllers/report.controller');

const router = Router();


//? Obtiene todos reportes de un customer
router.get('/get/:id',[
    validarJWT,
    validarCampos
], getReports);


//? Obtiene los datos del reporte que envia en la url
router.post('/get/data/:idReport',[
    validarJWT,
    validarCampos
], identifyReport);

module.exports = router;


