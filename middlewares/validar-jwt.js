



const jwt = require('jsonwebtoken');

const validarJWT = async (req, res, next) => {
    const token = req.header('token');

    if (!token) {
        return res.status(401).json({
            error: 'No hay token en la petición'
        });
    }

    try {
        jwt.verify(token, process.env.SECRETEORPRIVATEKEY);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            error: 'Token no válido'
        });
    }
};

module.exports = {
    validarJWT
};