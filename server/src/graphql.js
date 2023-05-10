const express = require('express');
const schema = require('./GraphQL/Schema/schema');
const resolve = require('./GraphQL/Resolvers/resolver');
const configGraph = require('./GraphQL/Config/configDomain.js')
var os = require('os-utils')
const isPrint = true
const isMb = true


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
            console.log("CPU USAGE: " + totalUsage + "RAM: " + ramUsed.toFixed(2));

            res.send = oldResponse;

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

    async function measureCPUUtilization() {
        const data = await si.currentLoad();
        const cpuUtilization = data.currentload;
        console.log(`CPU Utilization: ${cpuUtilization}%`);
        // Add further code for CPU utilization analysis or recording
    }
}






module.exports.startServer = startServer;