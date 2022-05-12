/* Models */
const User = require('../models/user_model');
const Message = require('../models/message_model');

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

/* Guardar El Mensaje En La Base De Datos */
const saveMessage = async(payload) => {
    try {
        const message = new Message({
            from: payload['de'],
            for: payload['para'],
            message: payload['mensaje'],
        });

        await message.save();



        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    connectedUser,
    disconnectedUser,
    saveMessage,
}