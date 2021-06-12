/* Aqui Tengo La Configuación De Socket.io */
const { io } = require('../index');

const Bands = require('../models/Bands');
const Band = require('../models/Band');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Heroes Del Silencio'));
bands.addBand(new Band('Metalica'));
// console.log(bands);

/* Mensajes De Sockets */
/* Todos Los Clientes Que Se Conecten A Este Backend Server Escucharán Estos Mensajes */
io.on('connection', client => {
    console.log('Cliente Conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente Desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('mensaje: ', payload);
        io.emit('mensaje', { admin: 'Mensaje RECIBIDO Desde El Frontend' });
    });

    /* EJEMPLO PARA TENER ENCUENTA */
    /* client.on('emitir-mensaje', (payload) => {
        console.log(payload);
        io.emit('nuevo-mensaje', payload); // Emite Para Todo El Mundo E Incluso El Que Lo Emitio
        // client.broadcast.emit('Nuevo Mensaje Emitido Backend', 'Heyy!!!'); // Emite Para Todo El Mundo Excepto El Que Lo Emitio
    }); */

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);

        /* Todos Los Clientes Conectados Estan En IO */
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
});