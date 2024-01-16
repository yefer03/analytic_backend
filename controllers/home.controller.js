

const { request, response } = require('express')


const { pool } = require('../models/databaseConnection');

const { getIdAndRole } = require('../helpers/getIdAndRole');


const getRoles = async ( req = request, res = response ) => {

    const token = req.header('token');

    const { role } = await getIdAndRole(token)

    if ( role === 1) {

        const roles = [
            {
                idRole: 1,
                nombreRol: 'admin',
            },
            {
                idRole: 2,
                nombreRol: 'customer',
            },
            {
                idRole: 3,
                nombreRol: 'empleado',
            },
        ];
        return res.status(200).json({ roles });

    } else if ( role === 2) {

        const roles = [
            {
                idRole: 3,
                nombreRol: 'empleado',
            },
        ];
        return res.status(200).json({ roles });

    } else if ( role === 3) {

        return res.status(200).json({ error: 'No tienes roles disponibles' });
    };

};


const getCustomers = async ( req = request, res = response ) => {

    const token = req.header('token');

    const { id, role } = await getIdAndRole(token);

    try {
        if ( role === 1 ) {
            
            // Si es administrador, obtén todos los clientes
            const [customers] = await pool.query('SELECT * FROM tbl_customer;');    
    
            if (customers.length > 0) {
                const customersList = customers.map((customer) => ({
                    idCustomer: customer.idCustomer,
                    nameCustomer: customer.nameCustomer,
                }));
    
                return res.status(200).json({ customers: customersList, role });
            } else {
                return res.status(404).json({ error: 'No se encontraron clientes' });
            }
    
        } else if ( role === 2 ) {
    
            // Si es customer, busca el mismo ID en la tabla tbl_customer y devuelve el ID y el nombre
            const [customer] = await pool.query('SELECT * FROM tbl_customer WHERE idCustomer = ?', [id]);
    
            if (customer.length > 0) {
                const customerInfo = [{
                    idCustomer: customer[0].idCustomer,
                    nameCustomer: customer[0].nameCustomer,
                }];
    
                return res.status(200).json({ customers: customerInfo, role });
            } else {
                return res.status(404).json({ error: 'No se encontró el cliente correspondiente al ID' });
            }
            
        } else if ( role === 3 ) {
    
            // Si es empleado, busca el idEmpleadoCustomer en la tabla tbl_usuarios y luego busca ese id en la tabla tbl_customer
            const [employee] = await pool.query('SELECT * FROM tbl_usuarios WHERE idUsuario = ?', [id]);
    
            if (employee.length > 0 && employee[0].idEmpleadoCustomer) {
                const [customer] = await pool.query('SELECT * FROM tbl_customer WHERE idCustomer = ?', [employee[0].idEmpleadoCustomer]);
    
                if (customer.length > 0) {
                    const customerInfo = [{
                        idCustomer: customer[0].idCustomer,
                        nameCustomer: customer[0].nameCustomer,
                    }];
    
                    return res.status(200).json({ customers: customerInfo, role });
                } else {
                    return res.status(404).json({ error: 'No se encontró el cliente correspondiente al empleado' });
                }
            } else {
                return res.status(404).json({ error: 'No se encontró el empleado correspondiente al ID' });
            }
            
        };
    } catch (error) {
        console.error('Error fetching customers:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = {
    getRoles,
    getCustomers,
};

