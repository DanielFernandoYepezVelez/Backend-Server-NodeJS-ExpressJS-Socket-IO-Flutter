const jwt = require("jsonwebtoken");

/* Creando El Token Para Nuestros Usuarios */
const generateJwt = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h',
        }, (err, token) => {
            if (err) {
                /* El Token No Se Pudo Crear */
                reject('No Se Puedo Generar El JWT.');
            } else {
                /* El Token Se Creó Correctamente */
                resolve(token);
            }
        });
    });
};

/* El Token Que Viene Del Cliente, Si Sea Válido */
const checkClientjwt = (token = '') => {
    try {
        /* Si El Verify Tiene Algún Problema Entonces Se Dispara El Error (Verifica Si El Token Es Valido Y Toma Su Payload)*/
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        return [true, uid];
    } catch (error) {
        return [false, null];
    }
};

module.exports = {
    generateJwt,
    checkClientjwt,
}