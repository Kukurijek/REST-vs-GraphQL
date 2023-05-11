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
    cpuUsage,
    memoryUsage
} = require('process');
const {
    set
} = require('./rest');
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
    app.use((req, res, next) => {
        const startUsage = process.cpuUsage()
        let oldResponse = res.send;
        res.send = async (data) => {
            const ramUsed = memoryUsage().heapUsed / 1024 / 1024
            const endUsage = process.cpuUsage();
            var totalUsage = endUsage.user - startUsage.user
            res.send = oldResponse;
            performance = {
                ram: ramUsed.toFixed(0),
                cpu: totalUsage
            }
            res.set('performance', JSON.stringify(performance))

            return res.send(data);




        }
        next();
    })

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