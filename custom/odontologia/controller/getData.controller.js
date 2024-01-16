


const { request, response } = require('express');
const { poolOdontologia } = require('../../../models/databaseConnection');


const getServices = async ( req = request, res = response ) => {

    try {

        const [ rows ] = await poolOdontologia.query(`
            SELECT ID_servicio, nombre_servicio, precio_servicio FROM tbl_servicio;
        `);

        return res.status(200).json({
            services: rows
        });

    } catch ( error ) {

        console.error('Error en la consulta:', error);
        throw error;

    };
};


const getGenders = async ( req = request, res = response ) => {

    try {

        const [ rows ] = await poolOdontologia.query(`
            SELECT ID_genero, nombre_genero FROM tbl_genero;
        `);

        return res.status(200).json({
            genders: rows
        });

    } catch ( error ) {

        console.error('Error en la consulta:', error);
        throw error;

    };
};



const getDebts = async (req = request, res = response) => {
    
    const { cedula } = req.params;

    try {

        const [existUser] = await poolOdontologia.query(
            'SELECT ID_cliente FROM tbl_clientes WHERE cedula = ?',
            [cedula]
        );
        
        if (existUser.length === 0) {
            return res.status(404).json({
                error: 'Este cliente no existe. La cédula no está registrada en la base de datos.',
            });
        };

        const [deudasPendientesResult] = await poolOdontologia.query(`
            SELECT
                tbl_pagos.ID_pago,
                tbl_servicio.nombre_servicio,
                tbl_servicio.precio_servicio,
                MAX(tbl_pagos.monto_cancelado) AS monto_cancelado,
                tbl_servicio.precio_servicio - MAX(tbl_pagos.monto_cancelado) AS totalDeuda
            FROM
                tbl_pagos
            INNER JOIN
                tbl_servicio_vendido ON tbl_pagos.ID_servicio = tbl_servicio_vendido.ID_servicio
            INNER JOIN
                tbl_servicio ON tbl_servicio_vendido.ID_servicio = tbl_servicio.ID_servicio
            INNER JOIN
                tbl_clientes ON tbl_pagos.ID_cliente = tbl_clientes.ID_cliente
            WHERE
                tbl_clientes.cedula = ? AND
                tbl_pagos.cancelado = false
            GROUP BY
                tbl_pagos.ID_pago, tbl_servicio.ID_servicio
        `, [cedula]);


        if ( deudasPendientesResult.length === 0 ) {
            return res.status(400).json({ error: 'El usuario no tiene deudas pendientes' });
        };


        const deudasPendientes = deudasPendientesResult.map((deuda) => {
            return {
                ID_pago: deuda.ID_pago,
                nombre_servicio: deuda.nombre_servicio,
                precio_servicio: deuda.precio_servicio,
                monto_cancelado: deuda.monto_cancelado,
                deudaPendiente: deuda.totalDeuda,
            };
        });

        return res.status(200).json({ deudasPendientes });


    } catch (error) {
        console.error('Error al obtener las deudas pendientes:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    };
};



module.exports = {
    getServices,
    getGenders,
    getDebts
};