


const { poolOdontologia } = require('../../../../models/databaseConnection');



const updateInsumo = async ( body ) => {

    try {
        const { ID_insumo, nombre_insumo, descripcion_insumo, stock_disponible, precio_unitario, fecha_compra } = body;

        // Verificar si el insumo existe
        const [existingInsumo] = await poolOdontologia.query(
            'SELECT * FROM tbl_insumos WHERE ID_insumo = ?',
            [ID_insumo]
        );

        if (existingInsumo.length === 0) {

            const data = { 
                error: 'Insumo no encontrado.',
                status: 404,
            };
            return data;

        };

        // Construir la consulta SQL dinámicamente
        const updateFields = [];
        const updateValues = [];

        if ( nombre_insumo && nombre_insumo.length > 0 ) {
            updateFields.push('nombre_insumo = ?');
            updateValues.push(nombre_insumo);
        };

        if ( descripcion_insumo && descripcion_insumo.length > 0) {
            updateFields.push('descripcion_insumo = ?');
            updateValues.push(descripcion_insumo);
        };

        if ( stock_disponible && stock_disponible.length > 0) {
            updateFields.push('stock_disponible = ?');
            updateValues.push(stock_disponible);
        };

        if ( precio_unitario && precio_unitario.length > 0) {
            updateFields.push('precio_unitario = ?');
            updateValues.push(precio_unitario);
        };

        if ( fecha_compra && fecha_compra.length > 0) {
            updateFields.push('fecha_compra = ?');
            updateValues.push(fecha_compra);
        };

        // Actualizar insumo en la base de datos
        await poolOdontologia.query(
            `UPDATE tbl_insumos SET ${updateFields.join(', ')} WHERE ID_insumo = ?`,
            [...updateValues, ID_insumo]
        );

        const data = {
            msg: 'Insumo actualizado exitosamente.',
            status:200,
        };

        return data;
        
    } catch ( error ) {
        throw error;
    };

};



module.exports = {
    updateInsumo,
};
