const rest = require('./src/rest');
const graph = require('./src/graphql')
const configRest = require('./src/REST/Config/configDomain.js');
const mongoose = require('mongoose');


const url = "mongodb+srv://rest:test@thesis.ipdmqyv.mongodb.net/?retryWrites=true&w=majority&appName=thesis";
const connect = mongoose.connect(url, {
    useNewUrlParser: true
});
connect.then((db) => {
    console.log('Connected correctly to server!');
}, (err) => {
    console.log(err);
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log(
            'Mongoose connection is disconnected due to application termination.'
        )
        process.exit(0)
    })
})

rest.listen(configRest.port, () => {
    console.log(`Rest API running on ${configRest.port}`)
})

graph.startServer();