


const { request, response } = require('express');
const { poolOdontologia } = require('../../../../models/databaseConnection');



const addInsumo = async ( body ) => {

    try {
        const { nombre_insumo, descripcion_insumo, stock_disponible, precio_unitario, fecha_compra } = body;

        // Insertar nuevo insumo en la base de datos
        const [insertResult] = await poolOdontologia.query(
            'INSERT INTO tbl_insumos (nombre_insumo, descripcion_insumo, stock_disponible, precio_unitario, fecha_compra) VALUES (?, ?, ?, ?, ?)',
            [ nombre_insumo, descripcion_insumo, stock_disponible, precio_unitario, fecha_compra ]
        );

        const ID_insumo = insertResult.insertId;

        const data = {
            msg: 'Insumo agregado exitosamente.',
            ID_insumo,
            status: 200,
        };

        return data;

    } catch ( error ) {
        throw error;
    }
};


module.exports = {
    addInsumo
};