

const { poolOdontologia } = require('../../../../models/databaseConnection');


const payService = async ( body ) => {

    const { ID_pago, montoCancelado } = body;

    try {

        // Obtener información necesaria de la base de datos
        const [servicePaymentInfo] = await poolOdontologia.query(`
            SELECT
                monto_cancelado,
                precio_servicio
            FROM
                tbl_pagos
            INNER JOIN
                tbl_servicio_vendido ON tbl_pagos.ID_servicio = tbl_servicio_vendido.ID_servicio
            INNER JOIN
                tbl_servicio ON tbl_servicio_vendido.ID_servicio = tbl_servicio.ID_servicio
            WHERE
                tbl_pagos.ID_pago = ? AND
                tbl_pagos.cancelado = false
        `, [ID_pago]);


        if (servicePaymentInfo.length === 0) {

            const data = { 
                error: 'Pago no encontrado.',
                status: 404,
            };

            return data;
        };


        const { monto_cancelado, precio_servicio } = servicePaymentInfo[0];

        // Convertir monto_cancelado a número antes de sumar el abono
        const montoCanceladoNumerico = parseFloat(monto_cancelado);

        // Calcular nuevo monto cancelado sumando el abono
        const nuevoMontoCancelado = montoCanceladoNumerico + parseFloat(montoCancelado);

        // Validar si el nuevo monto cancelado es mayor o igual al precio del servicio
        const cancelado = nuevoMontoCancelado >= precio_servicio;

        // Actualizar la base de datos con el nuevo monto_cancelado y el estado de cancelado
        const [updateResult] = await poolOdontologia.query(`
            UPDATE tbl_pagos
            SET monto_cancelado = ?, cancelado = ?
            WHERE ID_pago = ? AND cancelado = false
        `, [nuevoMontoCancelado, cancelado, ID_pago]);

        if (updateResult.affectedRows > 0) {

            if ( cancelado ) {

                const data = { 
                    error: 'El servicio ha sido completamente cancelado.',
                    status: 200,
                };
                return data;
                
            } else {

                const data = { 
                    error: 'Se realizó el abono al servicio.',
                    status: 200,
                };
                return data;

            };

        } else {

            const data = { 
                error: 'Pago no encontrado o ya ha sido cancelado.',
                status: 404,
            };
            return data;

        };

    } catch ( error ) {
        throw error;    
    };

};


module.exports = {
    payService
};