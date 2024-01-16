const { Router } = require('express');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getFormularios } = require('../controllers/form.controller');
const { getServices, getGenders } = require('../custom/odontologia/controller/getData.controller');

const { getDebts } = require('../custom/odontologia/controller/getData.controller');

const { routeFormsPostOdontologia, routeFormsPutOdontologia } = require('../custom/odontologia/forms/routeForms.odontologia');


const router = Router();


//? Obtiene todos los formularios de un customer
router.get('/get/:id',[
    validarJWT,
    validarCampos
], getFormularios);



//!--------------------------------------------------------------------------------
//* Rutas Odontologia
//!--------------------------------------------------------------------------------

//? Obtiene las deudas de una persona por su cedula 
router.get('/deudas/:cedula', [
    validarJWT,
    validarCampos
], getDebts);


//? Obtiene todos los servicios de la odontologia
router.get('/services/odontologia',[
    validarJWT,
    validarCampos
], getServices);


//? Obtiene los genero
router.get('/genders', [
    validarJWT,
    validarCampos
], getGenders);


//? Todos los post de la odontologia
router.post('/post/odontologia/:idForm', [
    validarJWT,
], routeFormsPostOdontologia);


//? Todos los put de la odontologia
router.put('/put/odontologia/:idForm', [
    validarJWT,
], routeFormsPutOdontologia);

//!--------------------------------------------------------------------------------
//* Rutas Odontologia
//!--------------------------------------------------------------------------------



module.exports = router;


