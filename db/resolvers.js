const Empresa = require('../models/Empresa');
const Producto = require('../models/Producto');
const Cliente = require('../models/Cliente');
const Vendedor = require('../models/Vendedor');


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
        obtenerCliente: async (_,{id}) =>{
            const cliente = await Cliente.findById(id);
            if(!cliente){
                throw new Error('Cliente no encontrado');
            }
            return cliente
        },
        obtenerClientes: async ()=>{
            try {
                const clientes = await Cliente.find({});
                return clientes;
            } catch (error) {
                console.log(error)
            }
        },
        obtenerVendedor: async (_,{id}) =>{
            const vendedor = await Vendedor.findById(id);
            if(!vendedor){
                throw new Error('Vendedor no encontrado');
            }
            return vendedor
        },
        obtenerVendedores: async ()=>{
            try {
                const vendedores = await Vendedor.find({});
                return vendedores;
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
        },

        //desde acá
        nuevoCliente : async (_,{input})=> {
            const{nombre, apellido} = input;

            //Verificar Cliente Registrado
            const existeNombre = await Cliente.findOne({nombre});
            const existeApellido = await Cliente.findOne({apellido});
            if (existeNombre && existeApellido){
                throw new Error('El Cliente ya se encuentra registrado')
            }

            try {
                const cliente = new Cliente(input);
                const resultado = cliente.save();
                return resultado;
            } catch (error) {
                console.log(error)
            }
        },
        actualizarCliente: async (_,{id, input})=>{
            //revisar existencia
            let cliente = await Cliente.findById(id);
            if (!cliente) {
                throw new Error('Cliente no Encontrado');
            }
            //guardamos
            cliente = await Cliente.findOneAndUpdate({_id:id },input, {new:true});
            return cliente;
        },
        eliminarCliente: async(_,{id})=>{
             //revisar existencia
             const cliente = await Cliente.findById(id);
             if (!cliente) {
                 throw new Error('Cliente No Encontrado');
             }
             //eliminamos
             await Cliente.findOneAndDelete({_id: id});
             return "Cliente eliminado";
        },
        nuevoVendedor : async (_,{input})=> {
            const{nombre, apellido} = input;

            //Verificar Cliente Registrado
            const existeNombre = await Vendedor.findOne({nombre});
            const existeApellido = await Vendedor.findOne({apellido});
            if (existeNombre && existeApellido){
                throw new Error('El Vendedor ya se encuentra registrado')
            }

            try {
                const vendedor = new Vendedor(input);
                const resultado = vendedor.save();
                return resultado;
            } catch (error) {
                console.log(error)
            }
        },
        actualizarVendedor: async (_,{id, input})=>{
            //revisar existencia
            let vendedor = await Vendedor.findById(id);
            if (!vendedor) {
                throw new Error('Vendedor no Encontrado');
            }
            //guardamos
            vendedor = await Vendedor.findOneAndUpdate({_id:id },input, {new:true});
            return vendedor;
        },
        eliminarVendedor: async(_,{id})=>{
             //revisar existencia
             const vendedor = await Vendedor.findById(id);
             if (!vendedor) {
                 throw new Error('Vendedor No Encontrado');
             }
             //eliminamos
             await Vendedor.findOneAndDelete({_id: id});
             return "Vendedor eliminado";
        }
    }
}

module.exports = resolvers;