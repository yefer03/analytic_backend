

const { pool } = require('../models/databaseConnection');
const jwt = require('jsonwebtoken');


const getIdAndRole = async (token) => {
    try {
        const { uid } = jwt.verify(token, process.env.SECRETEORPRIVATEKEY);

        const role = await buscarRolUsuario(uid);

        if (role) {
            return { id: uid, role };
        }

        return null; // Si el id no se encuentra en ninguna tabla

    } catch (error) {
        console.error('Error during token validation:', error);
        return null; // Si hay un error en la validación del token
    }
};

// Función auxiliar para buscar el rol de un usuario en la tabla tbl_usuarios
const buscarRolUsuario = async (uid) => {
    const [rows] = await pool.query('SELECT idRoleUsuario FROM tbl_usuarios WHERE idUsuario = ?', [uid]);

    if (rows.length > 0) {
        // Se encontró el ID en la tabla tbl_usuarios, devolver el rol
        return role = rows[0].idRoleUsuario;
    }

    return null; // El ID no se encontró en la tabla tbl_usuarios
};



module.exports = {
    getIdAndRole
};