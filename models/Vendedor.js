const mongoose = require('mongoose');

const VendedorSchema = mongoose.Schema({
    nombre_vendedor:{
        type: String,
        require: true,
        trim: true
    },
    apellido_vendedor:{
        type: String,
        require: true,
        trim: true
    },
    correo_vendedor:{
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    contrasenia_vendedor:{
        type: String,
        require: true,
        trim: true
    },
    NIT: {
        type: String,
        require: true,
        trim: true
    }

});

module.exports = mongoose.model('Vendedor', VendedorSchema);