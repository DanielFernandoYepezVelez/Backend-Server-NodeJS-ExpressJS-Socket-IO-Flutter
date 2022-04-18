const bcrypt = require('bcryptjs');
const { response } = require('express');

/* Model User (DB) */
const User = require('../models/user_model');

/* Helpers (JWT) */
const { generateJwt } = require('../helpers/jwt_helper');

const createUser = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const existEmail = await User.findOne({ email })

        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El Correo Electrónico Ya Esta Registrado.',
            });
        }

        const user = new User(req.body);

        /* Encriptar Password */
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        /* Generate JsonWebToken */
        const token = await generateJwt(user.id);

        res.json({
            ok: true,
            // Aquí Se LLama El Método toJSON Del Schema Mongoose
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error En El Servidor - Hable Con El Admin.',
        });
    }
}

/*  =========================================================== */

const loginUser = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const userDB = await User.findOne({ email });

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El Correo Electrónico No Existe.',
            });
        }

        /* Validate Password */
        const validPassword = bcrypt.compareSync(password, userDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La Contraseña No Es Válida.',
            });
        }

        /* Generate JsonWebToken */
        const token = await generateJwt(userDB.id);

        res.json({
            ok: true,
            // Aquí Se LLama El Método toJSON Del Schema Mongoose
            user: userDB,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error En El Servidor - Hable Con El Admin.',
        });
    }
}

/*  =========================================================== */

const renewToken = async(req, res = response) => {
    const _id = req.uid;

    try {
        const userDB = await User.findById({ _id });

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El Usuario No Existe.',
            });
        }

        /* Generate JsonWebToken (Renuevo El Token Anterior) */
        const token = await generateJwt(userDB.id);

        res.json({
            ok: true,
            // Aquí Se LLama El Método toJSON Del Schema Mongoose
            user: userDB,
            token,
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
    createUser,
    loginUser,
    renewToken,
}