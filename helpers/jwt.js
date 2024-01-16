

const jwt = require('jsonwebtoken')



const generarJWT = ( uid = '' ) => {

    return new Promise(( resolve, reject ) => {

        const payload = { uid }

        jwt.sign(payload, process.env.SECRETEORPRIVATEKEY, {

            expiresIn: '7d'

        }, ( err, token ) => {

            if ( err ) {

                console.log(err);
                reject('Failed to generate token')    

            } else {

                resolve(token)

            };
        });

    });

};


const desestructurarJWT = ( token = '' ) => {
    
    // Decodifica el token JWT (esto solo funciona si tienes la clave secreta)
    const infoToken = jwt.verify(token, process.env.SECRETEORPRIVATEKEY);
    
    // Ahora puedes acceder a los datos desestructurados
    const { uid } = infoToken;

    return uid;

};


module.exports = {
    generarJWT,
    desestructurarJWT,
};

