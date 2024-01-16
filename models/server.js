
const express = require('express');
const cors = require('cors');


require('dotenv').config();


class Server {

    constructor() {

        this.app = express();

        this.port = process.env.PORT || 8080;
        
        this.paths = {
            authPath:     '/auth',
            homePath:     '/home',
            formPath:     '/form',
            reportPath:   '/report',
        };
        
        this.middlewares();
        
        this.routes();
        
        this.server = require('http').createServer( this.app );

    };
    

    middlewares() {

        this.app.use( cors() );

        // Lectura y perseo
        this.app.use( express.json() );


    };


    routes() {

        this.app.use(this.paths.authPath,   require('../routes/auth.routes'));
        this.app.use(this.paths.homePath,   require('../routes/home.routes'));
        this.app.use(this.paths.formPath,   require('../routes/form.routes'));
        this.app.use(this.paths.reportPath, require('../routes/report.routes'));
        
    };


    listen() {

        this.server.listen( this.port, () => {
            console.log('Server running in port: ' + this.port);
        });
    };

};  


module.exports = Server

