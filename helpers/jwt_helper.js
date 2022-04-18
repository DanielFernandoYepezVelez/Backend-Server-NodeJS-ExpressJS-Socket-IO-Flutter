const jwt = require("jsonwebtoken");

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

module.exports = {
    generateJwt,
}