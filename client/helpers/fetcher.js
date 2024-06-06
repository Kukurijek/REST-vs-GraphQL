const {
    error
} = require('console');
const fs = require('fs');
const {
    userInfo
} = require('os');

let movieList = [];
let userList = [];

function writetoFile(users, movies) {

    const listOfFiles = [{
        fileName: './helpers/movieList.json',
        data: movies
    }, {
        fileName: "./helpers/userList.json",
        data: users
    }];
    listOfFiles.reduce(function (curFile, nextFile) {
        return writeData(nextFile).then();
    }, writeData);

    function writeData(params) {
        return new Promise((resolve, reject) => {
            fs.writeFileSync(params.fileName, JSON.stringify(params.data), 'utf8', (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
}

async function getMovieList() {
    var data = fs.readFileSync('./helpers/movieList.json')
    let json = JSON.parse(data);
    for (let i in json.getMovies) {
        movieList.push([i, json.getMovies[i]]);
    }
    return movieList;
}
async function getUserList() {
    var data = fs.readFileSync('./helpers/userList.json')
    let json = JSON.parse(data);
    for (let i in json.getUsers) {
        userList.push([i, json.getUsers[i]]);
    }
    return userList;
}

module.exports.getUserList = getUserList;
module.exports.getMovieList = getMovieList;
module.exports.writetoFile = writetoFile;
