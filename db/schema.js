const { gql } = require('apollo-server');



const typeDefs = gql`

    type Empresa {
        id: ID
        nombre_empresa: String
        numero_sucursal: Int
        direccion_empresa: String
        creado: String
        telefono: Int
        tipo_empresa : ID
    }

    input EmpresaInput {
        nombre_empresa: String!
        numero_sucursal: Int!
        direccion_empresa: String!
        telefono: Int!
        tipo_empresa : ID!
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
    }
    enum EstadoProducto {
        DISPONIBLE
        TERMINADO
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
    }
`;

module.exports = typeDefs;