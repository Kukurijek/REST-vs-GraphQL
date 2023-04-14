'use strict';

const express = require('express');
const api = express.Router();

api.get('/', (req, res) => {
    res.send({
        message: 'Hello World!'
    });
});
module.exports = api;