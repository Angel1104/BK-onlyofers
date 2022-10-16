const mongoose = require('mongoose');

const ClienteSchema = mongoose.Schema({
    nombre :{
        type: String,
        require: true
        //trim: true
    },
    apellido : {
        type: String,
        require: true
        //trim: true
    },
    telefono: {
        type: Number,
        require: true,
        trim: true
    },
    correo: {
        type: String,
        require: true,
        unique: true
    },
    contrasenia: {
        type: String,
        requiere: true,
        trim: true
    },
    edad: {
        type: Number,
        requiere: true,
        trim: true
    }
});

module.exports = mongoose.model('Cliente', ClienteSchema);