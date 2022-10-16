const mongoose = require('mongoose');

const TipoEmpresaSchema = mongoose.Schema({
    tipo_empresa :{
        type: String,
        require: true,
        trim: true
    }
});

module.exports = mongoose.model('TipoEmpresa', TipoEmpresaSchema);