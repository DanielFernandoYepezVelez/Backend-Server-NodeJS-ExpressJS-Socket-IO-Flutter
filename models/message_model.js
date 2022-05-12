const { Schema, model } = require("mongoose");

const MessageSchema = Schema({
    from: {
        /* Este Mensaje Esta Relacionado A Un Usuario De Mi Base De Datos (Clave Primaria) */
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    for: {
        /* Este Mensaje Esta Relacionado A Un Usuario De Mi Base De Datos (Clave Primaria) */
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

/* Me Retorna Las Propiedades Que Esten En El ..object (Que No Son Sensibles) */
MessageSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    return object;
});

module.exports = model('Message', MessageSchema);