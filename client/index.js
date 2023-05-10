var gqlTester = require('./gqlTester');
var restTester = require('./restTester');
const testWriter = require('./helpers/testWriter')
const gqlQueries = require('./GraphQL/Queries/gqlQueries');
const fetcher = require("./helpers/fetcher");
const {
    response
} = require('../server/src/rest');
var users = [];
var movies = [];

let userList;
let movieList;


async function populateLists() {
    users = await gqlQueries.getUsersFnameLNameReviewsMovieName();
    movies = await gqlQueries.getMovies();
    doTests();




    //userList = await fetcher.getUserList();
    //movieList = await fetcher.getMovieList();
}

populateLists();
async function doTests() {
    console.log('Running graphQL testgetuser 300 iterations...');
    gqlArr = await gqlTester.testGetUser(300, users);
    console.log('Running rest testgetuser 300 iterations.... ');
    restArr = await restTester.testGetUser(300, users);
    console.log('Writing to file..');
    testWriter.saveFileToCsv(gqlArr, restArr, "../Testresults/testGetUser_300_iterations.csv")
}



function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}