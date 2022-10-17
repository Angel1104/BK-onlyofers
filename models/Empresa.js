const mongoose = require('mongoose');

const EmpresaSchema = mongoose.Schema({
    nombre_empresa :{
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    numero_sucursal : {
        type: Number,
        require: true,
        trim: true
    },
    direccion_empresa: {
        type: String,
        require: true,
        trim: true
    },
    creado: {
        type: Date,
        default: Date.now()
    },
    telefono: {
        type: Number,
        require: true,
        unique: true,
        trim: true
    },
    tipo_empresa:{
        type: mongoose.Schema.Types.String,
        require: true,
        ref: 'TipoEmpresa'
    }
});

module.exports = mongoose.model('Empresa', EmpresaSchema);