/* Aqui Tengo La Configuración De Socket.io */
const { io } = require('../index');

/* Socket Controller */
const { connectedUser, disconnectedUser } = require('../controllers/socket_controller');

/* Helpers */
const { checkClientjwt } = require('../helpers/jwt_helper');


/* Mensajes De Sockets */
/* Todos Los Clientes Que Se Conecten A Este Backend Server Escucharán Estos Mensajes */
io.on('connection', client => {
    console.log('Cliente Conectado');

    /* Proceso Para Saber Quién Es El Usuario Que Se Conecto Y Necesitamos Activar Los Sockets Con Dicho Cliente */
    const tokenClient = client.handshake.headers['x-token'];
    const [valido, uid] = checkClientjwt(tokenClient);
    // console.log(valido, uid);

    /* Verificar Autenticación */
    if (!valido) { return client.disconnect(); }

    /* Cliente Autenticado */
    connectedUser(uid);

    client.on('disconnect', () => {
        console.log('Cliente Desconectado');
        disconnectedUser(uid);
    });

    client.on('mensaje', (payload) => {
        console.log('mensaje: ', payload);
        io.emit('mensaje', { admin: 'Mensaje RECIBIDO Desde El Frontend' });
    });
});