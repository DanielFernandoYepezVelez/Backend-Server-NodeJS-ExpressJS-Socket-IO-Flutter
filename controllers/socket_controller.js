/* User Model */
const User = require('../models/user_model');

/* Cuando Un Usuario Se Conecte Con El Socket Server */
const connectedUser = async(uid = '') => {
    const user = await User.findById(uid);

    user.online = true;
    await user.save();

    return user;
}

/* Cuando Un Usuario Se Desconecte Del Socket Server */
const disconnectedUser = async(uid = '') => {
    const user = await User.findById(uid);

    user.online = false;
    await user.save();

    return user;
}

module.exports = {
    connectedUser,
    disconnectedUser,
}