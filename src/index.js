const app = require('./REST/rest');
const config = require('./REST/Config/configDomain');


app.listen(config.port, () => {
    console.log(`Rest API running on ${config.port}`)
})