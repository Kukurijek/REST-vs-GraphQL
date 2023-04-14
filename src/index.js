const app = require('./rest');
const config = require('./configDomain');


app.listen(config.port, () => {
    console.log(`Rest API running on ${config.port}`)
})