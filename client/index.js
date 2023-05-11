var gqlTester = require('./gqlTester');
var restTester = require('./restTester');
const testWriter = require('./helpers/testWriter')
const gqlQueries = require('./GraphQL/Queries/gqlQueries');
const fetcher = require("./helpers/fetcher");
const {
    restart
} = require('nodemon');

var users = [];
var movies = [];
var reviews = [];



async function populateLists() {
    users = await gqlQueries.getUsersFnameLNameReviewsMovieName();
    users = users.data;

    movies = await gqlQueries.getMovies();
    movies = movies.data;
    reviews = await gqlQueries.getReviews();
    reviews = reviews.data;

    //doDifferentTasks1000Iterations();
    getAllUsers200Iterations();





    //userList = await fetcher.getUserList();
    //movieList = await fetcher.getMovieList();
}

populateLists();
async function doTestAddUser300Iterations() {
    var gqlArr = [];
    var restArr = [];
    gqlArray.push('Res_Time_GQL');
    restArr.push('Res_Time_Rest')
    console.log("Running graphql testAddUser 300 iterations");
    gqlArr = await gqlTester.testAddUser(300);
    console.log("Running rest testadduser 300 iterations");
    restArr = await restTester.testAddUser(300);
    testWriter.saveFileToCsv(gqlArr, restArr, "../Testresults/testAdduser_300_iterations.csv");
}

async function doTestGetUser300Iteration() {
    var gqlArr = [];
    var restArr = [];
    gqlArray.push('Res_Time_GQL');
    restArr.push('Res_Time_Rest')
    console.log('Running graphQL testgetuser 300 iterations...');
    gqlArr = await gqlTester.testGetUser(300, users);
    console.log('Running rest testgetuser 300 iterations.... ');
    restArr = await restTester.testGetUser(300, users);
    console.log('Writing to file..');
    testWriter.saveFileToCsv(gqlArr, restArr, "../Testresults/testGetUser_300_iterations.csv")
}

async function getAllUsers200Iterations() {
    var gqlRestimeArr = [];
    var gqlCpuArr = [];
    var gqlRamArr = [];


    var restRestimeArr = [];
    var restCpuArr = [];
    var restRamArr = [];
    gqlRestimeArr.push('Res_Time_GQL');
    gqlCpuArr.push('Cpu_usage_GQL');
    gqlRamArr.push('Ram_Usage_GQL');
    restRestimeArr.push('Res_Time_Rest');
    restCpuArr.push('Cpu_usage_Rest');
    restRamArr.push('Ram_Usage_Rest');

    let json = await gqlTester.testGetAllUsers(20);
    gqlRestimeArr = gqlRestimeArr.concat(json.testArr);
    gqlCpuArr = gqlCpuArr.concat(json.cpuArr);
    gqlRamArr = gqlRamArr.concat(json.ramArr);

    json = await restTester.testGetAllUsers(20);
    restRestimeArr = restRestimeArr.concat(json.testArr);
    restCpuArr = restCpuArr.concat(json.cpuArr);
    restRamArr = restRamArr.concat(json.ramArr);

    testWriter.saveFileToCsv(gqlRestimeArr, gqlCpuArr, gqlRamArr, restRestimeArr, restCpuArr, restRamArr, "../Testresults/getAllUsers_200_iterations.csv");
}

async function doDifferentTasks1000Iterations() {

    var gqlRestimeArr = [];
    var gqlCpuArr = [];
    var gqlRamArr = [];


    var restRestimeArr = [];
    var restCpuArr = [];
    var restRamArr = [];
    gqlRestimeArr.push('Res_Time_GQL');
    gqlCpuArr.push('Cpu_usage_GQL');
    gqlRamArr.push('Ram_Usage_GQL');
    restRestimeArr.push('Res_Time_Rest');
    restCpuArr.push('Cpu_usage_Rest');
    restRamArr.push('Ram_Usage_Rest');

    //GQL TESTS
    console.log("Testing GQL");
    let json;
    for (var i = 0; i < 50; i++) {
        json = await gqlTester.testAddUser(1);
        gqlRestimeArr = gqlRestimeArr.concat(json.testArr);
        gqlCpuArr = gqlCpuArr.concat(json.cpuArr);
        gqlRamArr = gqlRamArr.concat(json.ramArr);

        json = await gqlTester.testAddMovie(1);
        gqlRestimeArr = gqlRestimeArr.concat(json.testArr);
        gqlCpuArr = gqlCpuArr.concat(json.cpuArr);
        gqlRamArr = gqlRamArr.concat(json.ramArr);

        json = await gqlTester.testAddReview(1, users, movies)
        gqlRestimeArr = gqlRestimeArr.concat(json.testArr);
        gqlCpuArr = gqlCpuArr.concat(json.cpuArr);
        gqlRamArr = gqlRamArr.concat(json.ramArr);

        json = await gqlTester.testUpdateReview(1, reviews);
        gqlRestimeArr = gqlRestimeArr.concat(json.testArr);
        gqlCpuArr = gqlCpuArr.concat(json.cpuArr);
        gqlRamArr = gqlRamArr.concat(json.ramArr);
    }
    //REST Tests
    console.log("Testing rest");
    for (var i = 0; i < 50; i++) {
        json = await restTester.testAddUser(1);
        restRestimeArr = restRestimeArr.concat(json.testArr);
        restCpuArr = restCpuArr.concat(json.cpuArr);
        restRamArr = restRamArr.concat(json.ramArr);

        json = await restTester.testAddMovie(1);
        restRestimeArr = restRestimeArr.concat(json.testArr);
        restCpuArr = restCpuArr.concat(json.cpuArr);
        restRamArr = restRamArr.concat(json.ramArr);

        json = await restTester.testAddReview(1, users, movies);
        restRestimeArr = restRestimeArr.concat(json.testArr);
        restCpuArr = restCpuArr.concat(json.cpuArr);
        restRamArr = restRamArr.concat(json.ramArr);

        json = await restTester.testUpdateReview(1, reviews);
        restRestimeArr = restRestimeArr.concat(json.testArr);
        restCpuArr = restCpuArr.concat(json.cpuArr);
        restRamArr = restRamArr.concat(json.ramArr);
    }
    testWriter.saveFileToCsv(gqlRestimeArr, gqlCpuArr, gqlRamArr, restRestimeArr, restCpuArr, restRamArr, "../Testresults/differentTasks_1000_iterations.csv");
}



function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}