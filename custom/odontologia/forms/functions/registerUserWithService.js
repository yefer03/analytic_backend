


const { poolOdontologia } = require('../../../../models/databaseConnection');



const registerUserWithService = async ( body ) => {

    const connection = await poolOdontologia.getConnection();

    try {

        const {
            cedula,
            nombre,
            apellido,
            fecha_nacimiento,
            genero,
            direccion,
            telefono,
            correo_electronico,
            ID_servicio,
            cantidad_citas,
            montoCancelado,
        } = body;


        const [existingUserResult] = await connection.query(
            'SELECT ID_cliente FROM tbl_clientes WHERE cedula = ?',
            [cedula]
        );

        if ( existingUserResult.length > 0 ) {

            const data = { 
                error: 'La cédula ya está registrada en la base de datos.',
                status: 404,
            };

            return data;
        };
        

        await connection.beginTransaction();

        const [insertUsuarioResult] = await connection.query(
            'INSERT INTO tbl_clientes (cedula, nombre, apellido, fecha_nacimiento, genero, direccion, telefono, correo_electronico) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [cedula, nombre, apellido, fecha_nacimiento, genero, direccion, telefono, correo_electronico]
        );

        const ID_cliente = insertUsuarioResult.insertId;

        const fechaAdquisicion = new Date().toISOString().split('T')[0];

        const [insertServicioVendidoResult] = await connection.query(
            'INSERT INTO tbl_servicio_vendido (ID_servicio, ID_cliente, fecha_adquisicion, cantidad_citas) VALUES (?, ?, ?, ?)',
            [ID_servicio, ID_cliente, fechaAdquisicion, cantidad_citas]
        );
        
        const ID_servicio_vendido = insertServicioVendidoResult.insertId;

        // Verificar si el montoCancelado es igual al precio del servicio
        const [precioServicioResult] = await connection.query(
            'SELECT precio_servicio FROM tbl_servicio WHERE ID_servicio = ?',
            [ID_servicio]
        );

        const precioServicio = precioServicioResult[0].precio_servicio;

        // Insertar primer pago en tbl_pagos con el campo cancelado según la validación 
        const [insertPrimerPagoResult] = await connection.query(
            'INSERT INTO tbl_pagos (ID_servicio, ID_cliente, fecha_pago, monto_cancelado, cancelado, ID_servicio_vendido) VALUES (?, ?, ?, ?, ?, ?)',
            [ID_servicio, ID_cliente, fechaAdquisicion, montoCancelado, montoCancelado >= precioServicio, ID_servicio_vendido]
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

        // Insertar primer pago en tbl_pagos con el campo cancelado según la validación 
        const [insertCita] = await connection.query(
            'INSERT INTO tbl_citas (ID_cliente, fecha_cita, hora_cita, ID_servicio) VALUES (?, ?, ?, ?)',
            [ID_cliente, fechaCita, horaCita, ID_servicio]
        );


        await connection.commit();

        const data = {
            msg: 'Usuario registrado y servicio adquirido exitosamente.',
            ID_cliente,
            ID_servicio_vendido,
            ID_pago: insertPrimerPagoResult.insertId,
            ID_cita: insertCita.insertId,
            status: 200,
        };

        return data;

    } catch ( error ) {

        await connection.rollback();

        throw error;

    } finally {
        connection.release();
    }
};



module.exports = {
    registerUserWithService,
};