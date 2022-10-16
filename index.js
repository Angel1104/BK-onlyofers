const {ApolloServer} = require('apollo-server');
const resolvers = require('./db/resolvers');
const typeDefs = require('./db/schema');
const conectarDB = require('./conf/db');

//conectar a la db
conectarDB();

//servidor
const server = new ApolloServer({
    typeDefs,
    resolvers
});



//arrancar el servidor
server.listen().then(({url})=>{
    console.log(`servidor listo en la URL ${url}`)
})