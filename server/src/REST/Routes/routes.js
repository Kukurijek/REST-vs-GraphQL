'use strict';
var counter = 0;
const express = require('express');
const api = express.Router();
const Movie = require('../../Database/models/movie').Movies;


api.get('/hello', (req, res) => {
    counter++;
    console.log(counter)
    if (counter > 100000) {

    } else {
        res.send({
            message: test()
        });
    }

});

api.post('/test', (req, res) => {
    console.log(JSON.stringify(req.body));
    res.send('Received' + JSON.stringify(req.body));
})

api.get('/movies', async (req, res) => {

    let results = await Movie.find({})
    res.send(JSON.stringify(results)).status(200);

})


function test() {
    let arr = [];
    for (let i = 0; i < 1000; i++) {
        arr[i] = i;
    }


    return arr;
}
module.exports = api;