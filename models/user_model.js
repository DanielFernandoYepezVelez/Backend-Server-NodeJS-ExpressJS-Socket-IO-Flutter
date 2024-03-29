const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        unique: true,
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    online: {
        type: Boolean,
        default: false,
    },
});

/* Me Retorna Las Propiedades Que Esten En El ..object (Que No Son Sensibles) */
UserSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('User', UserSchema);