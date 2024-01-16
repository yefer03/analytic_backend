

const { request, response } = require('express')
const bcryptjs = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');


const { pool } = require('../models/databaseConnection');
const { generarJWT } = require('../helpers/jwt');



const registerAdmin = async ( req = request, res = response ) => {

    const { idRole, name, lastName, address, email, password, phoneNumber, city } = req.body;

    if ( idRole != 1 ) {
        return res.status(500).json({
            error: 'El id no corresponde al tipo de usuario que quieres crear'
        });
    };

    try {

        // Verificar si el correo electrónico ya existe en la tabla
        const [existingRows] = await pool.query('SELECT * FROM tbl_usuarios WHERE emailUsuario = ?', [email]);
        const [existingPhoneNumberRows] = await pool.query('SELECT * FROM tbl_usuarios WHERE phoneNumberUsuario = ?', [phoneNumber]);

        if (existingRows.length > 0) {
            // El correo electrónico ya existe, devuelve un mensaje indicando que no se puede registrar
            return res.status(400).json({
                error: 'El correo electrónico ya está registrado. Por favor, utiliza otro.'
            });
        };

        if (existingPhoneNumberRows.length > 0) {
            // El número de teléfono ya está registrado, devuelve un mensaje indicando que no se puede registrar
            return res.status(400).json({
                error: 'El número de teléfono ya está registrado. Por favor, utiliza otro.'
            });
        };

        const startDate = new Date().toISOString().slice(0, 19).replace("T", " ");

        // Hashear la contraseña antes de almacenarla en la base de datos
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Generar un UUID para el nuevo cliente
        const idUsuario = uuidv4();


        //! //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // Insertar en tbl_usuarios
        await pool.query(
            'INSERT INTO tbl_usuarios (idUsuario, idRoleUsuario, nombreUsuario, apellidoUsuario, direccionUsuario, emailUsuario, passwordUsuario, phoneNumberUsuario, cityUsuario, startDate, stateUsuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [ idUsuario, idRole, name, lastName, address, email, hashedPassword, phoneNumber, city, startDate, true ]
        );

        return res.status(200).json({
            msg: 'Admin creado correctamente'
        });

        //! //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    } catch ( error ) {

        console.error('Error during insertion:', error);
        res.status(500).json({ error: 'Internal Server Error' });

    };
};




const registerCustomer = async ( req = request, res = response ) => {

    const { idRole, name, address, email, password, phoneNumber, city } = req.body;

    if ( idRole != 2 ) {
        return res.status(500).json({
            error: 'El id no corresponde al tipo de usuario que quieres crear'
        });
    };

    try {

        // Verificar si el correo electrónico ya existe en la tabla
        const [existingRows] = await pool.query('SELECT * FROM tbl_usuarios WHERE emailUsuario = ?', [email]);
        const [existingPhoneNumberRows] = await pool.query('SELECT * FROM tbl_usuarios WHERE phoneNumberUsuario = ?', [phoneNumber]);

        if (existingRows.length > 0) {
            // El correo electrónico ya existe, devuelve un mensaje indicando que no se puede registrar
            return res.status(400).json({
                error: 'El correo electrónico ya está registrado. Por favor, utiliza otro.'
            });
        };

        if (existingPhoneNumberRows.length > 0) {
            // El número de teléfono ya está registrado, devuelve un mensaje indicando que no se puede registrar
            return res.status(400).json({
                error: 'El número de teléfono ya está registrado. Por favor, utiliza otro.'
            });
        };

        const startDate = new Date().toISOString().slice(0, 19).replace("T", " ");

        // Hashear la contraseña antes de almacenarla en la base de datos
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Generar un UUID para el nuevo cliente
        const idUsuario = uuidv4();


        //? //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // Insertar en tbl_customer
        await pool.query(
            'INSERT INTO tbl_customer (idCustomer, nameCustomer) VALUES (?, ?)',
            [ idUsuario, name ]
        );


        // Insertar en tbl_usuarios
        await pool.query(
            'INSERT INTO tbl_usuarios (idUsuario, idRoleUsuario, nombreUsuario, apellidoUsuario, direccionUsuario, emailUsuario, passwordUsuario, phoneNumberUsuario, cityUsuario, startDate, stateUsuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [ idUsuario, idRole, name, null, address, email, hashedPassword, phoneNumber, city, startDate, true ]
        );


        return res.status(200).json({
            msg: 'Customer creado correctamente'
        });
        //? //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    } catch ( error ) {

        console.error('Error during insertion:', error);
        res.status(500).json({ error: 'Internal Server Error' });

    };
};



const registerEmpleado = async ( req = request, res = response ) => {

    const { idRole, idEmpleadoCustomer, name, lastName, address, email, password, phoneNumber, city } = req.body;

    if ( idRole != 3 ) {
        return res.status(500).json({
            error: 'El id no corresponde al tipo de usuario que quieres crear'
        });
    };

    try {

        // Verificar si el correo electrónico ya existe en la tabla
        const [existingRows] = await pool.query('SELECT * FROM tbl_usuarios WHERE emailUsuario = ?', [email]);
        const [existingPhoneNumberRows] = await pool.query('SELECT * FROM tbl_usuarios WHERE phoneNumberUsuario = ?', [phoneNumber]);

        if (existingRows.length > 0) {
            // El correo electrónico ya existe, devuelve un mensaje indicando que no se puede registrar
            return res.status(400).json({
                error: 'El correo electrónico ya está registrado. Por favor, utiliza otro.'
            });
        };

        if (existingPhoneNumberRows.length > 0) {
            // El número de teléfono ya está registrado, devuelve un mensaje indicando que no se puede registrar
            return res.status(400).json({
                error: 'El número de teléfono ya está registrado. Por favor, utiliza otro.'
            });
        };

        const startDate = new Date().toISOString().slice(0, 19).replace("T", " ");

        // Hashear la contraseña antes de almacenarla en la base de datos
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Generar un UUID para el nuevo cliente
        const idUsuario = uuidv4();


        //* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        role = 'Empleado'


        // Insertar en tbl_usuarios
        await pool.query(
            'INSERT INTO tbl_usuarios (idUsuario, idRoleUsuario, idEmpleadoCustomer, nombreUsuario, apellidoUsuario, direccionUsuario, emailUsuario, passwordUsuario, phoneNumberUsuario, cityUsuario, startDate, stateUsuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [ idUsuario, idRole, idEmpleadoCustomer, name, lastName, address, email, hashedPassword, phoneNumber, city, startDate, true ]
        );


        return res.status(200).json({
            msg: 'Empleado creado correctamente'
        });

        //* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    } catch ( error ) {

        console.error('Error during insertion:', error);
        res.status(500).json({ error: 'Internal Server Error' });

    };
};





const login = async ( req = request, res = response ) => {

    const { email, password } = req.body;

    try {
        const [userRows] = await pool.query('SELECT * FROM tbl_usuarios WHERE emailUsuario = ?', [email]);

        if (userRows.length === 0) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        };

        const validPassword = await bcryptjs.compare(password, userRows[0].passwordUsuario);

        if (!validPassword || !userRows[0].stateUsuario) {
            return res.status(401).json({ error: 'Credenciales incorrectas o usuario inhabilitado' });
        };

        const token = await generarJWT(userRows[0].idUsuario);
        const role = userRows[0].idRoleUsuario

        return res.status(200).json({
            ok: true,
            token,
            role,
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    };
    
};



module.exports = {
    registerAdmin, 
    registerCustomer, 
    registerEmpleado,
    login,
};


