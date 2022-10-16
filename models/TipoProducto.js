const mongoose = require('mongoose');

const TipoProductoSchema = mongoose.Schema({
    tipo_producto :{
        type: String,
        require: true,
        trim: true
    }
});

module.exports = mongoose.model('TipoProducto', TipoProductoSchema);