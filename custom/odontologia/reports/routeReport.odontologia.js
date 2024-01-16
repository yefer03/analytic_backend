

const { cantidadServiciosVendidos, 
        clientesPorServicio, 
        citasAsignadas, 
        reporteInsumos } = require("./odontologia.reports");


const routeReportOdontologia = async ( idReport, dateStart, dateEnd ) => {

    try {
        switch ( idReport ) {
            case '6':
                return cantidadServiciosVendidos( dateStart, dateEnd );

            case '7':
                return clientesPorServicio( dateStart, dateEnd );

            case '8':
                return citasAsignadas( dateStart, dateEnd );

            case '9':
                return reporteInsumos( dateStart, dateEnd );

            default:
                return 'Este reporte no le pertenece tu customer';
        };

    } catch (error) {
        console.error('Error en routeReportOdontologia:', error);
        throw error;
    };
};


module.exports = {
    routeReportOdontologia
};
