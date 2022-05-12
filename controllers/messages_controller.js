const { response } = require("express");

/* Message Model */
const Messages = require('../models/message_model');

const getMessagesChat = async(req, res = response) => {
    const myUid = req.uid;
    const messagesFrom = req.params.from;

    try {
        const last30 = await Messages.find({
            $or: [{ from: myUid, for: messagesFrom }, { from: messagesFrom, for: myUid }]
        }).sort({ createdAt: 'desc' }).limit(30);

        return res.json({
            ok: true,
            messages: last30,
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
    getMessagesChat,
}