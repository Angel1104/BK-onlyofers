const Cliente = require('../models/Cliente');
const Empresa = require('../models/Empresa');
const Producto = require('../models/Producto');
const TipoEmpresa = require('../models/TipoEmpresa');
const TipoProducto = require('../models/TipoProducto');
const Vendedor = require('../models/Vendedor');
const bcryptjs = require('bcryptjs');
require('dotenv').config({path: 'variables.env'});
const jwt = require('jsonwebtoken');

const crearTokenVendedor = (usuario,secreta,expiresIn)=>{
    console.log(usuario);
    const {id,correo_vendedor,nombre_vendedor,NIT,contrasenia_vendedor}=usuario;
    return jwt.sign({id,correo_vendedor,nombre_vendedor,NIT,contrasenia_vendedor},secreta,{expiresIn})
}
const crearTokenCliente = (usuario,secreta,expiresIn)=>{
    console.log(usuario);
    const {id,correo_cliente,contrasenia_cliente}=usuario;
    return jwt.sign({id,correo_cliente,contrasenia_cliente},secreta,{expiresIn})
}

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
        obtenerVendedores: async () =>{
            try{
                const vendedores = await Vendedor.find({})
                return vendedores;
            } catch (error){
                console.log(error);
            }
        },
        obtenerVendedor: async(_,{correo_vendedor}) =>{
            try{
            const vendedor = await Vendedor.findOne({correo_vendedor})
            return vendedor;
            } catch (error){
                console.log(error);
            }
        },
        obtenerVendedorToken: async (_,{token})=>{
            const usuarioID = await jwt.verify(token, process.env.SECRETA)
            return usuarioID
        },
        obtenerClientes: async () =>{
            try{
                const clientes = await Cliente.find({})
                return clientes;
            } catch (error){
                console.log(error);
            }
        },
        obtenerCliente: async(_,{correo_cliente}) =>{
            try{
            const cliente = await Cliente.findOne({correo_cliente})
            return cliente;
            } catch (error){
                console.log(error);
            }
        },
        obtenerClienteToken: async (_,{token})=>{
            const usuarioID = await jwt.verify(token, process.env.SECRETA)
            return usuarioID
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
        },
        obtenerProductosEstado: async (_,{estado})=>{
            try {
                const producto = await Producto.find({estado: estado})
                return producto;
            } catch (error) {
                console.log(error)
            }
        }
    },
    Mutation : {
        nuevoVendedor: async (_,{input}) => {

            const{correo_vendedor, contrasenia_vendedor} = input;
            //vendedor registrado?
            const existecorreo = await Vendedor.findOne({correo_vendedor});
            if(existecorreo){
               throw new Error('El correo ya esta registrado');
            }

            // hash password
            const salt = await bcryptjs.genSalt(10);
            input.contrasenia_vendedor = await bcryptjs.hash(contrasenia_vendedor, salt);


            //guardar en bd
            try{
                const vendedor = new Vendedor(input);
                const resultado = vendedor.save();
                return resultado;
            }catch (error){
                console.log(error)
            }
        },

        actualizarVendedor: async(_,{id, input}) => {
            let vendedor = await Vendedor.findById(id);
            if (!vendedor) {
                throw new Error('Vendedor no encontrado');
            }
            //guardamos
            vendedor = await Vendedor.findOneAndUpdate({_id:id },input, {new:true});
            return vendedor;
        },
        eliminarVendedor: async(_,{id})=>{
            //revisar existencia
            const vendedor = await Vendedor.findById(id);
            if (!vendedor) {
                throw new Error('Vendedor no encontrado');
            }
            //eliminamos
            await Vendedor.findOneAndDelete({_id: id});
            return "Vendedor eliminada";
       },
        autenticarVendedor: async(_,{input})=>{
            
            const {correo_vendedor, contrasenia_vendedor,NIT}=input
            //si el usuario existe
            const existeVendedor = await Vendedor.findOne({correo_vendedor});
            if(!existeVendedor){
                throw new Error('El usuario no existe')
            }
            //Revisar pass correcto
            const contraCorrecta= await bcryptjs.compare(contrasenia_vendedor,existeVendedor.contrasenia_vendedor);
            if (!contraCorrecta) {
                throw new Error('La constraseña es incorrecta')
            }
            //revisar nit
            const nitCorrecto= await Vendedor.findOne({NIT});
            if(!nitCorrecto){
                throw new Error('El NIT es incorrecto')
            }
            //crear token
            return{
                token: crearTokenVendedor(existeVendedor, process.env.SECRETA, '48h')

            }
       },
        nuevoCliente: async (_,{input}) => {
        const{correo_cliente, contrasenia_cliente} = input;
        //cliente registrado?
        const existecorreo = await Cliente.findOne({correo_cliente});
        if(existecorreo){
            throw new Error('El correo ya esta registrado')
        }

        // hash password
        const salt = await bcryptjs.genSalt(10);
        input.contrasenia_cliente = await bcryptjs.hash(contrasenia_cliente, salt);
        
        //guardar en bd
        try{
            const cliente = new Cliente(input);
            const resultado = cliente.save();
            return resultado;
        }catch (error){
            console.log(error)
        }
        },
        autenticarCliente: async(_,{input})=>{
            const {correo_cliente, contrasenia_cliente}=input
            //si el usuario existe
            const existeCliente = await Cliente.findOne({correo_cliente});
            if(!existeCliente){
                throw new Error('El usuario no existe')
            }
            //Revisar pass correcto
            const contraCorrecta= await bcryptjs.compare(contrasenia_cliente,existeCliente.contrasenia_cliente);
            if (!contraCorrecta) {
                throw new Error('La constraseña es incorrecta')
            }
            //crear token
            return{
                token: crearTokenCliente(existeCliente, process.env.SECRETA, '48h')

            }
        },
        actualizarCliente: async(_,{id, input}) => {
            let vendedor = await Cliente.findById(id);
            if (!vendedor) {
                throw new Error('Cliente no encontrado');
            }
            //guardamos
            vendedor = await Cliente.findOneAndUpdate({_id:id },input, {new:true});
            return vendedor;
        },
        eliminarCliente: async(_,{id})=>{
            //revisar existencia
            const vendedor = await Cliente.findById(id);
            if (!vendedor) {
                throw new Error('Cliente no encontrado');
            }
            //eliminamos
            await Cliente.findOneAndDelete({_id: id});
            return "Cliente eliminada";
        },
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
        },
        nuevoTipoProducto : async (_,{input})=> {
            const{tipo_producto} = input;

            //usuario registrado?
            const existeTipoProducto = await TipoProducto.findOne({tipo_producto});
            if (existeTipoProducto){
                throw new Error('El Tipo de Producto ya Existe')
            }

            //guardar en bd
            try {
                const tipoProducto = new TipoProducto(input);
                const resultado = tipoProducto.save();
                return resultado;
            } catch (error) {
                console.log(error)
            }
        },
        eliminarTipoProducto: async (_,{id})=>{
            //verificar existencia
            const tipoProducto = await TipoProducto.findById(id);
            if(!tipoProducto){
                throw new Error('Tipo Producto no existente');
            }
            //eliminar
            await TipoProducto.findOneAndDelete({_id : id});
            return 'Tipo de Producto eliminado';
        },
        nuevoTipoEmpresa : async (_,{input})=> {
            const{tipo_empresa} = input;

            //usuario registrado?
            const existeTipoEmpresa = await TipoEmpresa.findOne({tipo_empresa});
            if (existeTipoEmpresa){
                throw new Error('El Tipo de Empresa ya Existe')
            }

            //guardar en bd
            try {
                const tipoEmpresa = new TipoEmpresa(input);
                const resultado = tipoEmpresa.save();
                return resultado;
            } catch (error) {
                console.log(error)
            }
        },
        eliminarTipoEmpresa: async (_,{id})=>{
            //verificar existencia
            const tipoEmpresa = await TipoEmpresa.findById(id);
            if(!tipoEmpresa){
                throw new Error('Tipo de Empresa no existente');
            }
            //eliminar
            await TipoEmpresa.findOneAndDelete({_id : id});
            return 'Tipo de Empresa eliminado';
        }
    }
}

module.exports = resolvers;