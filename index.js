/* Variables De Entorno */
require('dotenv').config();

const path = require('path');
const express = require('express');

/* DB Config */
const { dbConection } = require('./database/config');
dbConection();

/* Express App Es Compatible Con El Servidor Nativo De Node */
const app = express();

/* Lectura Y Parseo Del Body */
app.use(express.json());

/* Node Server (Socket.io) Este Servidor Nativo Debe Comunicarse Con Express */
/* La App De Express Le Va Agregar La Funcionalidad De socket.io Al Servidor Nativo De Node */
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

/* Socket IO */
require('./sockets/socket');

/* Static Files */
const publicPath = path.resolve(__dirname, 'public/');
app.use(express.static(publicPath));

/* Routes */
app.use('/api/login', require('./routes/auth_route'));
app.use('/api/users', require('./routes/users_route'));


/* Listening PORT */
server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log(`Server On Port ${process.env.PORT}`);
});