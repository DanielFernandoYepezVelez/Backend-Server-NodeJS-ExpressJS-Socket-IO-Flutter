require('dotenv').config();

const path = require('path');
const express = require('express');

/* Express App Es Compatible Con El Servidor Nativo De Node */
const app = express();

/* Node Server (Socket.io) Este Servidor Nativo Debe Comunicarse Con Express */
/* La App De Express Le Va Agregar La Funcionalidad De socket.io Al Servidor Nativo De Node */
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');

const publicPath = path.resolve(__dirname, 'public/');
app.use(express.static(publicPath));


server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log(`Server On Port ${process.env.PORT}`);
});