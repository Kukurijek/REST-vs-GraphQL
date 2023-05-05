const express = require('express');
const schema = require('./GraphQL/Schema/schema');
const resolve = require('./GraphQL/Resolvers/resolver');
const configGraph = require('./GraphQL/Config/configDomain.js')
const {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageLocalDefault
} = require('apollo-server-core');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const {
    ApolloServer
} = require('apollo-server-express');
const {
    start
} = require('repl');
const {
    config
} = require('process');
async function startServer() {
    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs: schema.typeDefs,
        resolvers: resolve.resolvers,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [ApolloServerPluginDrainHttpServer({
            httpServer
        }), ApolloServerPluginLandingPageLocalDefault({
            embed: true
        })],
    });


    app.use(bodyParser.json());
    app.use('*', cors());

    await server.start();
    server.applyMiddleware({
        app,
        path: '/'
    });

    httpServer.listen({
        port: configGraph.port
    }, resolve);
    console.log(`GraphQL Server ready at http://localhost:${configGraph.port}`)
}




module.exports.startServer = startServer;