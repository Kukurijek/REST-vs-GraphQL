const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./REST/Routes/routes.js');




// defining the Express app
const app = express();
// defining an array to work as the database (temporary solution)
const ads = [{
    title: 'Hello, world (again)!'
}];

// adding Helmet to enhance your Rest API's security
app.use(helmet());

app.use(cors());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.use('/', routes);

module.exports = app;