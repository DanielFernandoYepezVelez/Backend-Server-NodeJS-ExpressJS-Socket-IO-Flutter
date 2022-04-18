const { default: mongoose } = require("mongoose")

const dbConection = async() => {
    try {
        console.log('init db config');
        await mongoose.connect(process.env.DB_CONECTION);

        /* Estas Configuraciones Recomendadas Por Mongoose, Al Parecer Ya No Son Obligatorias {
            useNewUrlParser: true,
            useCreateIndex: true, No Support
            useUnifiedTopology: true,
        } */

        console.log('db Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error En La Base De Datos.');
    }
}

module.exports = {
    dbConection,
}