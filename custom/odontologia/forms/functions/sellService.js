

const { poolOdontologia } = require('../../../../models/databaseConnection');



const sellService = async ( body ) => {
    let connection; // Se declara la variable para la conexión fuera del bloque try para poder utilizarla en el bloque catch

    try {
        const { cedula, ID_servicio, montoCancelado, cantidad_citas } = body;

        // Obtener el ID_cliente usando la cédula
        const [clienteResult] = await poolOdontologia.query('SELECT ID_cliente FROM tbl_clientes WHERE cedula = ?', [cedula]);

        if (clienteResult.length === 0) {

            const data = { 
                error: 'Cliente no encontrado.',
                status: 404
            };      

            return data;
        };

        const ID_cliente = clienteResult[0].ID_cliente;

        // Obtener el precio del servicio usando el ID_servicio
        const [precioResult] = await poolOdontologia.query('SELECT precio_servicio FROM tbl_servicio WHERE ID_servicio = ?', [ID_servicio]);

        if (precioResult.length === 0) {
            const data = { 
                error: 'Servicio no encontrado.',
                status: 404
            };

            return data;
        };

        const precioServicio = precioResult[0].precio_servicio;

        console.log(montoCancelado >= precioServicio)

        // Iniciar una transacción para asegurar operaciones atómicas
        connection = await poolOdontologia.getConnection();
        await connection.beginTransaction();

        // Insertar en tbl_servicio_vendido
        const fechaAdquisicion = new Date().toISOString().split('T')[0];
        const [servicioVendidoResult] = await connection.query(
            'INSERT INTO tbl_servicio_vendido (ID_servicio, ID_cliente, fecha_adquisicion, cantidad_citas) VALUES (?, ?, ?, ?)',
            [ID_servicio, ID_cliente, fechaAdquisicion, cantidad_citas]
        );

        const ID_servicio_vendido = servicioVendidoResult.insertId;

        // Insertar en tbl_pagos
        const [pagoResult] = await connection.query(
            'INSERT INTO tbl_pagos (ID_servicio, ID_cliente, ID_servicio_vendido, fecha_pago, monto_cancelado, cancelado ) VALUES (?, ?, ?, ?, ?, ?)',
            [ID_servicio, ID_cliente, ID_servicio_vendido, fechaAdquisicion, montoCancelado, montoCancelado >= precioServicio]
        );
            
        //!Generar fecha y hora
        const fechaActual = new Date();

        // Obtener componentes de la fecha
        const anio = fechaActual.getFullYear();
        const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses son indexados desde 0
        const dia = String(fechaActual.getDate()).padStart(2, '0');

        // Obtener componentes de la hora
        const hora = String(fechaActual.getHours()).padStart(2, '0');
        const minutos = String(fechaActual.getMinutes()).padStart(2, '0');
        const segundos = String(fechaActual.getSeconds()).padStart(2, '0');

        // Formatear la fecha y hora
        const fechaCita = `${anio}-${mes}-${dia}`;
        const horaCita = `${hora}:${minutos}:${segundos}`;
        //!Generar fecha y hora

        // Insertar nueva cita en tbl_citas
        const [insertCitaResult] = await poolOdontologia.query(
            'INSERT INTO tbl_citas (ID_cliente, fecha_cita, hora_cita, ID_servicio) VALUES (?, ?, ?, ?)',
            [ID_cliente, fechaCita, horaCita, ID_servicio]
        );

        // Commit de la transacción si todo se realizó correctamente
        await connection.commit();

        const data = {
            msg: 'Venta realizada exitosamente.',
            ID_servicio_vendido,
            status: 200,
        };

        return data;

    } catch (error) {
        // Rollback en caso de error
        if (connection) {
            await connection.rollback();
            connection.release();
        }

        throw error;

    } finally {
        // Liberar la conexión después de la transacción
        if (connection) {
            connection.release();
        };
    };
};


module.exports = {
    sellService
};
