const Empresa = require('../models/Empresa');
const Producto = require('../models/Producto');
const TipoEmpresa = require('../models/TipoEmpresa');
const TipoProducto = require('../models/TipoProducto');

//resolvers
const resolvers = {
    Query: {
        obtenerEmpresas: async ()=>{
            try {
                const empresas = await Empresa.find({});
                return empresas;
            } catch (error) {
                console.log(error)
            }
        },
        obtenerEmpresa: async (_,{id})=>{
            //revisar existencia
            const empresa = await Empresa.findById(id);
            if (!empresa) {
                throw new Error('Empresa no encontrado');
            }
            return empresa;
        },
        obtenerProductos: async () =>{
            try {
                const productos = await Producto.find({});
                return productos;
            } catch (error) {
                console.log(error);
            }
        },
        obtenerProducto: async (_,{id}) =>{
            const producto = await Producto.findById(id);
            if(!producto){
                throw new Error('Producto no encontrado');
            }
            return producto
        },
        obtenerTiposProductos: async()=>{
            try {
                const tipo_productos = await TipoProducto.find({});
                return tipo_productos;
            } catch (error) {
                console.log(error)
            }
        },
        obtenerTiposEmpresas: async()=>{
            try {
                const tipo_empresa = await TipoEmpresa.find({});
                return tipo_empresa;
            } catch (error) {
                console.log(error)
            }
        }
    },
    Mutation : {
        nuevaEmpresa : async (_,{input})=> {
            const{nombre_empresa, numero_sucursal} = input;

            //usuario registrado?
            const existeNombreEmpresa = await Empresa.findOne({nombre_empresa});
            const existeSucursalEmpresa = await Empresa.findOne({numero_sucursal});
            if (existeNombreEmpresa && existeSucursalEmpresa){
                throw new Error('La empresa y sucursal ya esta registrada')
            }

            //guardar en bd
            try {
                const empresa = new Empresa(input);
                const resultado = empresa.save();
                return resultado;
            } catch (error) {
                console.log(error)
            }
        },
        actualizarEmpresa: async (_,{id, input})=>{
            //revisar existencia
            let empresa = await Empresa.findById(id);
            if (!empresa) {
                throw new Error('Empresa no encontrado');
            }
            //guardamos
            empresa = await Empresa.findOneAndUpdate({_id:id },input, {new:true});
            return empresa;
        },
        eliminarEmpresa: async(_,{id})=>{
             //revisar existencia
             const empresa = await Empresa.findById(id);
             if (!empresa) {
                 throw new Error('Empresa no encontrado');
             }
             //eliminamos
             await Empresa.findOneAndDelete({_id: id});
             return "Empresa eliminada";
        },
        nuevoProducto: async (_,{input})=>{
            //guardar
            try {
                const producto = new Producto(input);
                const resultado = producto.save();
                return resultado;
            } catch (error) {
                console.log(error)
            }
        },
        actualizarProducto: async (_,{id,input})=>{
            //verificar existencia
            let producto = await Producto.findById(id);
            if(!producto){
                throw new Error('Producto no encontrado');
            }
            //guardamos
            producto = await Producto.findOneAndUpdate({_id:id },input, {new:true});
            return producto;
        },
        eliminarProducto: async (_,{id})=>{
            //verificar existencia
            const producto = await Producto.findById(id);
            if(!producto){
                throw new Error('Producto no encontrado');
            }
            //eliminar
            await Producto.findOneAndDelete({_id : id});
            return 'Producto eliminado';
        }
    }
}

module.exports = resolvers;