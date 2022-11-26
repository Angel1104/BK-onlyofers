const mongoose = require('mongoose');

const ClienteSchema = mongoose.Schema({
    nombre_cliente:{
        type: String,
        require: true,
        trim: true
    },
    apellido_cliente:{
        type: String,
        require: true,
        trim: true
    },
    correo_cliente:{
        type: String,
        require: true,
        trim: true
    },
    contrasenia_cliente:{
        type: String,
        require: true,
        trim: true
    }
    
});

module.exports = mongoose.model('Cliente', ClienteSchema);