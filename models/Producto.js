const mongoose = require('mongoose');

const ProductosSchema = mongoose.Schema({
    nombre_producto :{
        type: String,
        require: true,
        trim: true
    },
    precio : {
        type: Number,
        require: true,
        trim: true
    },
    descripcion_producto: {
        type: String,
        require: true,
        trim: true
    },
    creado: {
        type: Date,
        default: Date.now()
    },
    fecha_elaboracion: {
        type: Date
    },
    fecha_vencimiento: {
        type: Date
    },
    existencia: {
        type: Number,
        require: true,
        trim: true
    },
    tipo_producto: {
        type: mongoose.Schema.Types.String,
        require: true,
        ref : 'TipoProducto'
    },
    empresa: {
        type: mongoose.Schema.Types.String,
        require: true,
        ref: 'Empresa'
    },
    estado: {
        type:String,
        default: "DISPONIBLE"
    },
    imagen: {
        type: String,
        require: true,
        trim: true
    }
});

module.exports = mongoose.model('Producto', ProductosSchema);