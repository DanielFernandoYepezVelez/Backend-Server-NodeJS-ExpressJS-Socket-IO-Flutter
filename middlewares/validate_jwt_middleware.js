const jwt = require("jsonwebtoken");
const { response } = require("express");

const validateJwt = (req, res = response, next) => {

    /* Leer Token */
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No Hay Token En La Petición',
        });
    }

    try {
        /* Si El Verify Tiene Algún Problema Entonces Se Dispara El Error (Verifica Si El Token Es Valido Y Toma Su Payload)*/
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token No Válido',
        });
    }
}

module.exports = {
    validateJwt,
}