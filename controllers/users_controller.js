const { response } = require("express");

/* Users Model */
const User = require('../models/user_model');

const getUsers = async(req, res = response) => {

    /* Inicio De La Paginación */
    const from = Number(req.query.from) || 0;

    try {
        /* Esta Query Me Retorna Todos Los Usuario Menos El Conectado, También, Me Los Organiza Primero Los Que Esten Online
         Y Además, Me Retorna Una Paginación Gracias Al Skip - Limit */
        const users = await User.find({ _id: { $ne: req.uid } }).sort('-online').skip(from).limit(10);

        res.json({
            ok: true,
            users,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error En El Servidor - Hable Con El Admin.',
        });
    }
}

module.exports = {
    getUsers,
}