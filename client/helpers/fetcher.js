const fs = require('fs');
const {
    userInfo
} = require('os');

movieList = [];
userList = [];

async function getMovieList() {
    data = fs.readFileSync('./helpers/movieList.json')
    let json = JSON.parse(data);
    for (var i in json.data.getMovies) {
        movieList.push([i, json.data.getMovies[i]]);
    }
    return movieList;
}
async function getUserList() {
    data = fs.readFileSync('./helpers/userList.json')
    let json = JSON.parse(data);
    for (var i in json.data.getUsers) {
        userList.push([i, json.data.getUsers[i]]);
    }
    return userList;
}

module.exports.getUserList = getUserList;
module.exports.getMovieList = getMovieList;