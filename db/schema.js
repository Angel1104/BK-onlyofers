const { gql } = require('apollo-server');



const typeDefs = gql`

    type Empresa {
        id: ID
        nombre_empresa: String
        numero_sucursal: Int
        direccion_empresa: String
        creado: String
        telefono: Int
        tipo_empresa : String
    }

    input EmpresaInput {
        nombre_empresa: String!
        numero_sucursal: Int!
        direccion_empresa: String!
        telefono: Int!
        tipo_empresa : String!
    }
    type TipoEmpresa {
        id: ID
        tipo_empresa : String
    }
    input TipoEmpresaInput {
        tipo_empresa : String!
    }


    type TipoProducto {
        id: ID
        tipo_producto : String
    }
    input TipoProductoInput {
        tipo_producto : String!
    }

    type Producto {
        id: ID
        nombre_producto: String
        descripcion_producto: String
        precio: Float
        existencia: Int
        fecha_elaboracion: String
        fecha_vencimiento: String
        creado: String
        tipo_producto: String
        empresa : String
        estado: EstadoProducto
        imagen: String
    }

    input ProductoInput{
        nombre_producto: String!
        descripcion_producto: String
        precio: Float!
        existencia: Int!
        fecha_elaboracion: String!
        fecha_vencimiento: String!
        tipo_producto: String!
        empresa: String!
        estado: EstadoProducto
        imagen: String!
    }
    enum EstadoProducto {
        DISPONIBLE
        TERMINADO
    }
    
    type Vendedor{
        id: ID
        nombre_vendedor: String
        apellido_vendedor: String
        correo_vendedor: String
        contrasenia_vendedor: String
        NIT: Int
    }

    input VendedorInput{
        nombre_vendedor: String!
        apellido_vendedor: String!
        correo_vendedor: String!
        contrasenia_vendedor: String!
        NIT: Int!
    }

    type Cliente{
        id: ID
        nombre_cliente: String
        apellido_cliente: String
        correo_cliente: String
        contrasenia_cliente: String
    }

    input ClienteInput{
        nombre_cliente: String!
        apellido_cliente: String!
        correo_cliente: String!
        contrasenia_cliente: String!
    }

    type Query {
        #empresas
        obtenerEmpresa(id: ID!): Empresa
        obtenerEmpresas: [Empresa]

        #tipoempresas
        obtenerTiposEmpresas: [TipoEmpresa]

        #productos
        obtenerProducto(id: ID!): Producto
        obtenerProductos: [Producto]
        obtenerProductosEstado(estado: String!): [Producto]

        #tipoProducto
        obtenerTiposProductos: [TipoProducto]

        #vendedores
        obtenerVendedor(correo_vendedor: String!): Vendedor
        obtenerVendedores: [Vendedor]

        #clientes
        obtenerCliente(correo_cliente: String!): Cliente
        obtenerClientes: [Cliente]
    }


    type Mutation {
        #empresa
        nuevaEmpresa(input: EmpresaInput) : Empresa
        actualizarEmpresa(id: ID!, input: EmpresaInput): Empresa
        eliminarEmpresa(id:ID!):String

        #productos
        nuevoProducto(input: ProductoInput): Producto
        actualizarProducto( id: ID!, input: ProductoInput ):Producto
        eliminarProducto(id: ID!):String

        #tipoProducto
        nuevoTipoProducto(input: TipoProductoInput): TipoProducto
        eliminarTipoProducto(id: ID!):String 

        #tipoEmpresa
        nuevoTipoEmpresa(input: TipoEmpresaInput): TipoEmpresa
        eliminarTipoEmpresa(id: ID!):String 

        #vendedor
        nuevoVendedor(input: VendedorInput) : Vendedor
        actualizarVendedor(id: ID!, input: VendedorInput): Vendedor
        eliminarVendedor(id: ID!): String

        #cliente
        nuevoCliente(input: ClienteInput): Cliente
        actualizarCliente(id: ID!, input: VendedorInput):String
        eliminarCliente(id: ID!): String
    }
`;

module.exports = typeDefs;