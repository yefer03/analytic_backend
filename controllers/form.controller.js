

const { request, response } = require('express')

const { pool } = require('../models/databaseConnection');


const getFormularios = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        // Realiza una consulta para obtener todos los formularios asociados a un idCustomer
        const [formularios] = await pool.query('SELECT * FROM tbl_forms WHERE idCustomer = ?;', [id]);

        // Verifica si hay formularios
        if (formularios.length > 0) {
            // Construye la respuesta con los IDs y nombres de los formularios
            const formulariosList = formularios.map((formulario) => ({
                idForm: formulario.idForm,
                idCustomer: formulario.idCustomer,
                nameForm: formulario.nameForm,
                // Agrega otros campos relevantes del formulario si es necesario
            }));

            return res.status(200).json({ formularios: formulariosList });
        } else {
            return res.status(404).json({ error: 'No se encontraron formularios asociados a este cliente' });
        }
    } catch (error) {
        console.error('Error fetching formularios:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getFormularios
};