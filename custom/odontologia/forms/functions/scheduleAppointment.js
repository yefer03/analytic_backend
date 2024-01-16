

const { poolOdontologia } = require('../../../../models/databaseConnection');


const scheduleAppointment = async ( body ) => {

    try {

        const { cedula, fecha_cita, hora_cita, ID_servicio } = body;

        // Buscar ID_cliente en tbl_clientes usando la cédula
        const [clienteRow] = await poolOdontologia.query(
            'SELECT ID_cliente FROM tbl_clientes WHERE cedula = ? LIMIT 1',
            [cedula]
        );

        if (clienteRow.length === 0) {

            const data = { 
                error: 'Cliente no encontrado con la cédula proporcionada.',
                status: 404,
            }

            return data;

        };

        const ID_cliente = clienteRow[0].ID_cliente;

        // Insertar nueva cita en tbl_citas
        const [insertCitaResult] = await poolOdontologia.query(
            'INSERT INTO tbl_citas (ID_cliente, fecha_cita, hora_cita, ID_servicio) VALUES (?, ?, ?, ?)',
            [ID_cliente, fecha_cita, hora_cita, ID_servicio]
        );

        const nuevaCitaID = insertCitaResult.insertId;

        const data = {
            msg: 'Cita agendada con éxito.',
            nuevaCitaID,
            status: 200,
        };

        return data;

    } catch ( error ) {

        throw error;

    };
};


module.exports = {
    scheduleAppointment,
};