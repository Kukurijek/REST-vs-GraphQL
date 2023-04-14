'use strict';
var counter = 0;
const express = require('express');
const api = express.Router();

api.get('/', (req, res) => {
    counter++;
    if (counter > 100000) {

    } else {
        res.send({
            message: test()
        });
    }

});
module.exports = api;

function test() {
    let arr;
    for (let i = 0; i < 1000; i++) {
        arr[i] = i;
    }


    return arr;
}