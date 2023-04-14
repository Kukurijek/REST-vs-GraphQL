const app = require('./src/REST/rest');
const config = require('./src/REST/Config/configDomain.js');


app.listen(config.port, () => {
    console.log(`Rest API running on ${config.port}`)
})