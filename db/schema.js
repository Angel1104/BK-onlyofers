const { gql } = require('apollo-server');



const typeDefs = gql`

    type Empresa {
        id: ID
        nombre_empresa: String
        numero_sucursal: Int
        direccion_empresa: String
        creado: String
        telefono: Int
    }

    input EmpresaInput {
        nombre_empresa: String!
        numero_sucursal: Int!
        direccion_empresa: String!
        telefono: Int!
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
    }

    input ProductoInput{
        nombre_producto: String!
        descripcion_producto: String
        precio: Float!
        existencia: Int!
        fecha_elaboracion: String!
        fecha_vencimiento: String!
    }
    

    type Query {
        #empresas
        obtenerEmpresa(id: ID!): Empresa
        obtenerEmpresas: [Empresa]

        #productos
        obtenerProducto(id: ID!): Producto
        obtenerProductos: [Producto]
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
    }
`;

module.exports = typeDefs;