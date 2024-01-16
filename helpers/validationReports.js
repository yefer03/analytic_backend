

const { pool } = require('../models/databaseConnection');


const obtenerIdUsuario = async (idUser) => {

    try {
        // Consulta SQL para obtener el idUsuario si coincide con el idUser
        const [rows] = await pool.query(
            'SELECT idUsuario FROM tbl_usuarios WHERE idUsuario = ?',
            [idUser]
        );

        // Verificar si se encontró alguna coincidencia
        if (rows.length > 0) {
            // Retornar el idUsuario si hay coincidencia
            return rows[0].idUsuario;
        } else {
            // Retornar null si no hay coincidencia
            return null;
        };
    } catch (error) {
        console.error('Error al obtener el idUsuario:', error);
        throw error;
    };
};


const obtenerIdEmpleadoCustomer = async (idUsuario) => {

    try {
        // Consulta SQL para obtener el idEmpleadoCustomer por idUsuario
        const [rows] = await pool.query(`
            SELECT idEmpleadoCustomer
            FROM tbl_usuarios
            WHERE idUsuario = ?;
        `, [idUsuario]);

        // Verificar si se encontraron resultados
        if (rows.length > 0) {
            // Devolver el idEmpleadoCustomer encontrado
            return rows[0].idEmpleadoCustomer;
        } else {
            // Si no se encuentra ningún registro, devolver null o un valor predeterminado según sea necesario
            return null;
        };
        
    } catch (error) {
        console.error('Error en la consulta obtenerIdEmpleadoCustomer:', error);
        throw error;
    };
};


module.exports = {
    obtenerIdUsuario,
    obtenerIdEmpleadoCustomer,
};