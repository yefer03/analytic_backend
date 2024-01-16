

// //! El host se puede cambiar por una ip en caso de que esté montado en algun servicio
// //! El puerto es el por defecto, se debe cambiar en caso que el servicio donde esté montado nos de otro
// //! La base de datos


const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'administrator',
    password: 'Pass;2023AdministratorAnalytics',
    port: 3306,
    database: 'analyticsDB',
    Promise: require('bluebird'),
});

const poolOdontologia = mysql.createPool({
    host: 'localhost',
    user: 'administrator',
    password: 'Pass;2023AdministratorAnalytics',
    port: 3306,
    database: 'odontologiaDB',
    Promise: require('bluebird'),
});

module.exports = {
    pool,
    poolOdontologia,
};
