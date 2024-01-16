


const { request, response } = require('express');

const { getIdAndRole } = require('../helpers/getIdAndRole');
const { pool } = require('../models/databaseConnection');
const { routeReportOdontologia } = require('../custom/odontologia/reports/routeReport.odontologia');
const { obtenerIdUsuario, obtenerIdEmpleadoCustomer } = require('../helpers/validationReports');


const getReports = async (req = request, res = response) => {

    try {
        const { id } = req.params;

        // Realiza una consulta para obtener todos los informes asociados a un idCustomer
        const [reports] = await pool.query('SELECT * FROM tbl_reports WHERE idCustomer = ?;', [id]);

        // Verifica si hay informes 
        if (reports.length > 0) {
            // Construye la respuesta con los IDs y nombres de los informes
            const reportsList = reports.map((report) => ({
                idReport: report.idReport,
                idCustomer: report.idCustomer,
                nameReport: report.nameReport,
            }));

            return res.status(200).json({ reports: reportsList });
        } else {
            return res.status(404).json({ error: 'No se encontraron informes asociados a este cliente' });
        }
    } catch (error) {
        console.error('Error fetching reports:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    };

};


const identifyReport = async ( req = request, res = response ) => {

    const token = req.header('token');

    const { id: idToken, role } = await getIdAndRole(token);

    try {
        const { idReport } = req.params;
        
        const dates = req.body.formattedDates;
        let startDate = dates.startDate;
        let endDate = dates.endDate;

        if ( idReport == 6 ) {
            if (!startDate) {
                startDate = obtenerFechaHaceTreintaDias();
            };
    
            if (!endDate) {
                endDate = obtenerFechaActual();
            };
        };

        let idCustomer;

        const [customerRows] = await pool.query(
            'SELECT idCustomer FROM tbl_reports WHERE idReport = ?',
            [idReport]
        );  

        if (customerRows.length > 0) {

            idCustomer = customerRows[0].idCustomer;

        } else {

            return res.status(404).json({
                error: 'No se encontró el idReport en la base de datos'
            });

        };


        if ( role == 2 ) {
            const respCustomer = await obtenerIdUsuario( idToken );

            if (respCustomer != idCustomer) {
                return res.json({
                    error: 'Error, este formulario no te pertenece'
                });
            };
        };


        if (role == 3) {

            const respCustomer = await obtenerIdEmpleadoCustomer( idToken );

            if (respCustomer != idCustomer) {
                return res.json({
                    error: 'Error, este formulario no te pertenece'
                });
            };
        };


        switch ( idCustomer ) {

            case '27869a04-debd-42fc-8d7f-dc1b70bd06f2':
                console.log('startDate: ', startDate, '\nendDate: ', endDate, '\n')
                const report = await routeReportOdontologia(idReport, startDate, endDate);
                return res.json({
                    report
                });

            default:
                return res.status(500).json({
                    error: 'No se logró identificar este customer en nuestra base de datos'
                });
        };

    } catch (error) {
        console.error('Error in identifyReport:', error);

        if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
            
            return res.status(400).json({ error: 'Error de sintaxis JSON en la solicitud' });
        };

        return res.status(500).json({
            error: 'Internal Server Error'
        });
    };

};


const obtenerFechaActual = () => {
    const hoy = new Date();
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

const obtenerFechaHaceTreintaDias = () => {
    const hoy = new Date();
    const haceTreintaDias = new Date(hoy);
    haceTreintaDias.setDate(hoy.getDate() - 30);

    const yyyy = haceTreintaDias.getFullYear();
    const mm = String(haceTreintaDias.getMonth() + 1).padStart(2, '0');
    const dd = String(haceTreintaDias.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};


module.exports = {
    getReports,
    identifyReport,
};