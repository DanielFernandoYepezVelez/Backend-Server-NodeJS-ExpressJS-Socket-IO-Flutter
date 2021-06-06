const { io } = require('../index');

/* Mensajes De Sockets */
/* Todos Los Clientes Que Se Conecten A Este Backend Server Escucharán Estos Mensajes */
io.on('connection', client => {
    console.log('Cliente Conectado');

    client.on('disconnect', () => {
        console.log('Cliente Desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('mensaje: ', payload);

        io.emit('mensaje', { admin: 'Mensaje RECIBIDO Desde El Frontend' });
    });

});