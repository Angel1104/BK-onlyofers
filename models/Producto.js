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
    }
});

module.exports = mongoose.model('Producto', ProductosSchema);