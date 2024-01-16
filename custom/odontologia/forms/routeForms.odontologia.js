

const { request, response } = require('express');

const { registerUserWithService } = require('./functions/registerUserWithService');
const { scheduleAppointment } = require('./functions/scheduleAppointment');
const { sellService } = require('./functions/sellService');
const { addInsumo } = require('./functions/addInsumo');
const { updateInsumo } = require('./functions/updateInsumo');
const { payService } = require('./functions/payService');


const routeFormsPostOdontologia = async ( req = request, res = response ) => {

    const { idForm } = req.params;

    const body = req.body;

    let status, data;

    try {

        switch ( idForm ) {
            case '6':
                //? Registrar usuario con servicio incluido - 6
                ( { status, ...data } = await registerUserWithService( body ) );
                return res.status(status).json({
                    ...data
                });


            case '7':
                //? Agendar citas en la odontologia - 7
                ( { status, ...data } = await scheduleAppointment( body ) );
                return res.status(status).json({
                    ...data
                });


            case '8':
                //? Vender un servicio a un cliente ya registrado - 8
                ( { status, ...data } = await sellService( body ) );
                return res.status(status).json({
                    ...data
                });


            case '9':
                //? Agregamos un nuevo insumo - 9
                ( { status, ...data } = await addInsumo( body ) );
                return res.status(status).json({
                    ...data
                });
                

            default:
                return res.status(400).json({
                    msg: 'Este formulario no le pertenece a una inserción'
                });
        };  

    } catch (error) {
        console.error('Error en el enrutador post:', error);
        throw error;
    };
};



const routeFormsPutOdontologia = async ( req = request, res = response ) => {

    const { idForm } = req.params;


    const body = req.body;

    let status, data;

    try {
        switch ( idForm ) {
            case '10':
                //? Actualizar un insumo
                ( { status, ...data } = await updateInsumo( body ) );
                return res.status(status).json({
                    ...data
                });


            case '11':
                //? Realizar un abono a una deuda
                ( { status, ...data } = await payService( body ) );
                return res.status(status).json({
                    ...data
                });


            default:
                return res.status(400).json({
                    msg: 'Este formulario no le pertenece a un put'
                });
        };

    } catch (error) {
        console.error('Error en el enrutador put:', error);
        throw error;
    };
};


module.exports = {
    routeFormsPostOdontologia,
    routeFormsPutOdontologia,
};
