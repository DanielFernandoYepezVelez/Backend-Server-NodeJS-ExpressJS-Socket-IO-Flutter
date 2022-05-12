/* Aqui Tengo La Configuración De Socket.io */
const { io } = require('../index');

/* Socket Controller */
const { connectedUser, disconnectedUser, saveMessage } = require('../controllers/socket_controller');

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

    /* Cuando Un Cliente Se Conecta A Nuestro Socket Server Tenemos Dos Salas Por Defecto. */
    /* Debemos Ingresar Al Usuario Autenticado A Una Sala En Particular. */
    /* La Primera Sala Es Una Sala Global, Donde Se Encuentran Todos Los Usuarios (Dispositivos Conectados) 
    Esta Sala Se Identifica Con El io.emit => El Cual Envia Un Mensaje A Todo El Mundo. */
    /* Para Mandar Un Mensaje Privado A Un Cliente, Puedo Hacerlo Mediante El Client.id, Que Es Generado 
    Automáticamente Por El Socket Server Para Cada Cliente Conectado. */
    /* Pero Adicionalmente, Yo Quiero Unir Un Usuario A Una Sala Individual, Donde Un Tercero Pueda Decirle
    "Yo Quiero Enviarle Un Mensaje A Este Usuario", Entonces, Este Usuario Debe Estar Escuchando Esta
    Sala. */
    /* Dicha Sala Va A Trabajar Con El uid De La Base De Datos De Cada Usuario, Y Ese uid Me Va A Servir Para 
    Identificar Al Usuario Al Cual Yo Le Quiero Enviar El Mensaje. */
    /* La Sala Anteriormente Mencionada Va A Tener Como Nombre El uid De La Base De Datos. */
    /* Entonces, Para Unir A Un Usuario A La Sala Del uid Debemos Hacer Lo Siguiente. */
    client.join(uid);

    /* Si Yo Quiero Enviar Un Mensaje A Un Usuario En Particular, Hacemos Lo Siguiente. */
    // client.to(uid).emit('')

    /* Escuchar El Mensaje Del Cliente El 'mensaje-personal' En La Sala Del uid */
    client.on('mensaje-personal', async(payload) => {
        // console.log(payload);

        /* TODO: Guardar Mensaje En La Base De Datos */
        await saveMessage(payload);

        /* io => Servidor De io, Es Decir, El Socket Server Va A Enviar Un Mensaje */
        /* to => Va A Enviar Un Mensaje A Un Canal O A Una Sala En Particular, Que Es A La Que Se Unio El Cliente Anteriormente (uid) */
        /* payload.para => El Nombre Del Canal O La Sala Esta En Nuestro "payload.para (uid)" Es Decir, El Mensaje Va A Ir A Un Usuario Unico */
        /* emit => El Socket Server Emite El Mensaje Para Quién Realmente Es, El Usuario Único Dueño Del uid */
        io.to(payload.para).emit('mensaje-personal', payload);
    });

    client.on('disconnect', () => {
        console.log('Cliente Desconectado');
        disconnectedUser(uid);
    });

    client.on('mensaje', (payload) => {
        console.log('mensaje: ', payload);
        io.emit('mensaje', { admin: 'Mensaje RECIBIDO Desde El Frontend' });
    });
});