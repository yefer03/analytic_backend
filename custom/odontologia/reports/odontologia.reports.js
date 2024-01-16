

const { poolOdontologia } = require('../../../models/databaseConnection');


const cantidadServiciosVendidos = async ( fechaInicio, fechaFin ) => {

    try {
        
        // Consulta SQL para obtener la cantidad de servicios vendidos por servicio
        const [rows] = await poolOdontologia.query(`
            SELECT nombre_servicio, COUNT(*) AS cantidad_servicios_vendidos
            FROM tbl_servicio
            INNER JOIN tbl_servicio_vendido ON tbl_servicio.ID_servicio = tbl_servicio_vendido.ID_servicio
            WHERE fecha_adquisicion BETWEEN ? AND ?
            GROUP BY nombre_servicio;
        `, [fechaInicio, fechaFin]);

        return rows;

    } catch (error) {
        console.error('Error en la consulta:', error);
        throw error;
    };
};


const clientesPorServicio = async ( fechaInicio, fechaFin) => {

    try {
        if (!fechaInicio) {
            fechaInicio = '2000-01-01';
        };
    
    
        if (!fechaFin) {
            fechaFin = new Date().toISOString().split('T')[0];
        };


        const [rows] = await poolOdontologia.query(`
            SELECT 
                tsv.ID_servicio_vendido as id,
                ts.nombre_servicio, 
                ts.precio_servicio, 
                DATE_FORMAT(tsv.fecha_adquisicion, '%Y-%m-%d') AS fecha_adquisicion,
                tsv.cantidad_citas,
                tc.cedula,
                tc.nombre,
                tc.apellido,
                tc.correo_electronico,
                tc.telefono,
                DATE_FORMAT(tc.fecha_nacimiento, '%Y-%m-%d') AS fecha_nacimiento,
                tp.monto_cancelado,
                DATE_FORMAT(tp.fecha_pago, '%Y-%m-%d') AS fecha_pago,
                tp.cancelado
            FROM tbl_servicio_vendido tsv
                INNER JOIN tbl_servicio ts ON ts.ID_servicio = tsv.ID_servicio
                INNER JOIN tbl_clientes tc ON tc.ID_cliente = tsv.ID_cliente
                INNER JOIN tbl_pagos tp ON tp.ID_servicio_vendido = tsv.ID_servicio_vendido
            WHERE tsv.fecha_adquisicion BETWEEN ? AND ?
            ORDER BY tsv.fecha_adquisicion DESC
        `, [fechaInicio, fechaFin]);

        return rows;

    } catch (error) {
        console.error('Error en la consulta clientesPorServicio:', error);
        throw error;
    };

};



const citasAsignadas = async ( fechaInicio, fechaFin ) => {

    try {

        if ( !fechaInicio ) {
            fechaInicio = '2000-01-01';
        };
    
        if (!fechaFin) {
            let currentDate = new Date();
            currentDate.setFullYear(currentDate.getFullYear() + 20);
            fechaFin = currentDate.toISOString().split('T')[0];
        };


        // Consulta SQL para obtener citas asignadas filtradas por fechas
        const [rows] = await poolOdontologia.query(`
            SELECT 
                tcl.nombre, 
                tcl.apellido, 
                tcl.cedula, 
                tcl.telefono, 
                tcl.correo_electronico, 
                tg.nombre_genero,
                tcl.direccion, 
                tc.fecha_cita,
                tc.fecha_cita,
                tc.hora_cita,
                DATE_FORMAT(tc.fecha_cita, '%Y-%m-%d') AS fecha_cita,
                tc.ID_cita as id,
                tbs.nombre_servicio
            FROM tbl_citas tc
            INNER JOIN tbl_clientes tcl ON tcl.ID_cliente = tc.ID_cliente
            INNER JOIN tbl_genero tg ON tg.ID_genero = tcl.genero
            INNER JOIN tbl_servicio tbs ON tbs.ID_servicio = tc.ID_servicio
            WHERE tc.fecha_cita BETWEEN ? AND ?
            ORDER BY fecha_cita DESC;
        `, [fechaInicio, fechaFin]);

        return rows;

    } catch (error) {
        console.error('Error en la consulta citasAsignadas:', error);
        throw error;
    };
};



const reporteInsumos = async ( fechaInicio, fechaFin ) => {

    try {

        if (!fechaInicio) {
            fechaInicio = '2000-01-01';
        };
    
    
        if (!fechaFin) {
            fechaFin = new Date().toISOString().split('T')[0];
        };

        const [rows] = await poolOdontologia.query(`
            SELECT
                ti.nombre_insumo,
                ti.descripcion_insumo,
                ti.stock_disponible,
                DATE_FORMAT(ti.fecha_compra, '%Y-%m-%d') AS fecha_compra,
                ti.precio_unitario,
                ti.stock_disponible * ti.precio_unitario AS total_valor,
                ti.ID_insumo as id
            FROM tbl_insumos ti
            WHERE ti.fecha_compra BETWEEN ? AND ?
            ORDER BY fecha_compra DESC;
        `, [fechaInicio, fechaFin]);

        return rows;

    } catch (error) {
        console.error('Error en la consulta reporteInsumos:', error);
        throw error;
    };

};


module.exports = {
    cantidadServiciosVendidos,
    clientesPorServicio,
    citasAsignadas,
    reporteInsumos,
};