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
var gqlRestimeArr = [];
var gqlCpuArr = [];
var gqlRamArr = [];


var restRestimeArr = [];
var restCpuArr = [];
var restRamArr = [];



async function populateLists() {
    //users = await gqlQueries.getUsersFnameLNameReviewsMovieName();
    //users = users.data;
    //movies = await gqlQueries.getMovies();
    //movies = movies.data;
    for (var i = 0; i < 250; i++) {
        await gqlQueries.getUserById("646365ce182ba4bbb0dc157d");
    }



    //await doTest6Queries(100);
    //reviews = await gqlQueries.getReviews();
    //reviews = reviews.data;

    //doDifferentTasks1000Iterations();
    //getAllUsers200Iterations();

    //doAddUserAllFields1000Iterations();
    //doAddUserLimitedFields1000Iterations();

    //doUpdateUserLimitedFields1000iterations();
    //doUpdateUserAllFields1000iterations();
    //doAddReview(10000);
    //sleep(5000);
    await testGetSpecificUserAllFields(500, "646365ce182ba4bbb0dc157d");
    await testGetSpecificUserLimitedFields(500, "646365ce182ba4bbb0dc157d");






    //userList = await fetcher.getUserList();
    //movieList = await fetcher.getMovieList();
}

populateLists();

async function testGetSpecificUserAllFields(iterations, userID) {
    clearArrays();
    console.log("Testing GQL");
    let json;
    json = await gqlTester.testGetSpecificUserAllFields(iterations, userID);
    gqlRestimeArr = gqlRestimeArr.concat(json.testArr);
    gqlCpuArr = restCpuArr.concat(json.cpuArr);
    gqlRamArr = restRamArr.concat(json.ramArr);

    console.log("Testing Rest")
    json = await restTester.testGetSpecificUser(iterations, userID);
    restRestimeArr = restRestimeArr.concat(json.testArr);
    restCpuArr = restCpuArr.concat(json.cpuArr);
    restRamArr = restRamArr.concat(json.ramArr);

    testWriter.saveFileToCsv(gqlRestimeArr, gqlCpuArr, gqlRamArr, restRestimeArr, restCpuArr, restRamArr, `../Testresults/getSpecificUserAllFields_iterations_${iterations}.csv`);
}
async function testGetSpecificUserLimitedFields(iterations, userID) {
    clearArrays();
    console.log("Testing GQL");
    let json;
    json = await gqlTester.testGetSpecificUserLimitedFields(iterations, userID);
    gqlRestimeArr = gqlRestimeArr.concat(json.testArr);
    gqlCpuArr = gqlCpuArr.concat(json.cpuArr);
    gqlRamArr = gqlRamArr.concat(json.ramArr);

    console.log("Testing Rest")
    json = await restTester.testGetSpecificUser(iterations, userID);
    restRestimeArr = restRestimeArr.concat(json.testArr);
    restCpuArr = restCpuArr.concat(json.cpuArr);
    restRamArr = restRamArr.concat(json.ramArr);

    testWriter.saveFileToCsv(gqlRestimeArr, gqlCpuArr, gqlRamArr, restRestimeArr, restCpuArr, restRamArr, `../Testresults/getSpecificUserLimitedFields_iterations_${iterations}.csv`);
}

async function createMovieTwoReviews(iterations) {
    clearArrays();
    console.log("Testing GQL");
    let json;
    json = await gqlTester.testCreateMovieTwoReviews(iterations, users, movies);
    gqlRestimeArr = gqlRestimeArr.concat(json.testArr);


    console.log("Testing Rest")
    json = await restTester.testCreateMovieTwoReviews(iterations, users, movies);
    restRestimeArr = restRestimeArr.concat(json.testArr);
    restCpuArr = restCpuArr.concat(json.cpuArr);
    restRamArr = restRamArr.concat(json.ramArr);

    testWriter.saveFileToCsvBatching(gqlRestimeArr, restRestimeArr, restCpuArr, restRamArr, `../Testresults/createMovieTwoReviews_iterations_${iterations}.csv`);
}

async function doTest6Queries(iterations) {
    clearArrays();
    console.log("Testing GQL");
    let json;
    json = await gqlTester.test6Queries(iterations, users, movies);
    gqlRestimeArr = gqlRestimeArr.concat(json.testArr);


    console.log("Testing Rest")
    json = await restTester.test6Queries(iterations, users, movies);
    restRestimeArr = restRestimeArr.concat(json.testArr);
    restCpuArr = restCpuArr.concat(json.cpuArr);
    restRamArr = restRamArr.concat(json.ramArr);

    testWriter.saveFileToCsvBatching(gqlRestimeArr, restRestimeArr, restCpuArr, restRamArr, `../Testresults/do6queriesbatch_iterations_${iterations}.csv`);
}

async function doDeleteReview(iterations) {
    clearArrays();
    console.log("Testing GQL");
    let json;
    json = await gqlTester.testDeleteReview(iterations, reviews);
    gqlRestimeArr = gqlRestimeArr.concat(json.testArr);
    gqlCpuArr = gqlCpuArr.concat(json.cpuArr);
    gqlRamArr = gqlRamArr.concat(json.ramArr);

    console.log("Testing Rest")
    json = await restTester.testDeleteReview(iterations, reviews);
    restRestimeArr = restRestimeArr.concat(json.testArr);
    restCpuArr = restCpuArr.concat(json.cpuArr);
    restRamArr = restRamArr.concat(json.ramArr);

    testWriter.saveFileToCsv(gqlRestimeArr, gqlCpuArr, gqlRamArr, restRestimeArr, restCpuArr, restRamArr, `../Testresults/deleteReview_iterations_${iterations}.csv`);
}
async function doDeleteUser(iterations) {
    clearArrays();
    console.log("Testing GQL");
    let json;
    json = await gqlTester.testDeleteUser(iterations, users);
    gqlRestimeArr = gqlRestimeArr.concat(json.testArr);
    gqlCpuArr = gqlCpuArr.concat(json.cpuArr);
    gqlRamArr = gqlRamArr.concat(json.ramArr);

    console.log("Testing Rest")
    json = await restTester.testDeleteUser(iterations, users);
    restRestimeArr = restRestimeArr.concat(json.testArr);
    restCpuArr = restCpuArr.concat(json.cpuArr);
    restRamArr = restRamArr.concat(json.ramArr);

    testWriter.saveFileToCsv(gqlRestimeArr, gqlCpuArr, gqlRamArr, restRestimeArr, restCpuArr, restRamArr, `../Testresults/deleteUser_iterations_${iterations}.csv`);
}
async function doDeleteMovie(iterations) {
    clearArrays();
    console.log("Testing GQL");
    let json;
    json = await gqlTester.testDeleteMovie(iterations, movies);
    gqlRestimeArr = gqlRestimeArr.concat(json.testArr);
    gqlCpuArr = gqlCpuArr.concat(json.cpuArr);
    gqlRamArr = gqlRamArr.concat(json.ramArr);

    console.log("Testing Rest")
    json = await restTester.testDeleteMovie(iterations, movies);
    restRestimeArr = restRestimeArr.concat(json.testArr);
    restCpuArr = restCpuArr.concat(json.cpuArr);
    restRamArr = restRamArr.concat(json.ramArr);

    testWriter.saveFileToCsv(gqlRestimeArr, gqlCpuArr, gqlRamArr, restRestimeArr, restCpuArr, restRamArr, `../Testresults/deleteMovie_iterations_${iterations}.csv`);
}


async function getAllUsers200Iterations() {
    clearArrays();

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
async function doAddUserLimitedFields1000Iterations() {
    clearArrays();
    console.log("Testing GQL");
    let json;
    json = await gqlTester.testAddUser(1000)
    gqlRestimeArr = gqlRestimeArr.concat(json.testArr);
    gqlCpuArr = gqlCpuArr.concat(json.cpuArr);
    gqlRamArr = gqlRamArr.concat(json.ramArr);

    console.log("Testing Rest")
    json = await restTester.testAddUser(1000);
    restRestimeArr = restRestimeArr.concat(json.testArr);
    restCpuArr = restCpuArr.concat(json.cpuArr);
    restRamArr = restRamArr.concat(json.ramArr);

    testWriter.saveFileToCsv(gqlRestimeArr, gqlCpuArr, gqlRamArr, restRestimeArr, restCpuArr, restRamArr, "../Testresults/AddUserLimitedFields_iterations_1000.csv");
}

async function doAddUserAllFields1000Iterations(iterations) {
    clearArrays();
    console.log("Testing GQL");
    let json;
    json = await gqlTester.testAddUserAllFields(iterations);
    gqlRestimeArr = gqlRestimeArr.concat(json.testArr);
    gqlCpuArr = gqlCpuArr.concat(json.cpuArr);
    gqlRamArr = gqlRamArr.concat(json.ramArr);

    console.log("Testing Rest")
    json = await restTester.testAddUserAllFields(iterations);
    restRestimeArr = restRestimeArr.concat(json.testArr);
    restCpuArr = restCpuArr.concat(json.cpuArr);
    restRamArr = restRamArr.concat(json.ramArr);

    testWriter.saveFileToCsv(gqlRestimeArr, gqlCpuArr, gqlRamArr, restRestimeArr, restCpuArr, restRamArr, `../Testresults/AddUserAllFields_iterations_${iterations}.csv`);

}
async function doUpdateUserLimitedFields1000iterations(iterations) {
    clearArrays();
    console.log("Testing GQL");
    let json;
    json = await gqlTester.testUpdateUserLimitedFields(iterations, users);
    gqlRestimeArr = gqlRestimeArr.concat(json.testArr);
    gqlCpuArr = gqlCpuArr.concat(json.cpuArr);
    gqlRamArr = gqlRamArr.concat(json.ramArr);

    console.log("Testing Rest")
    json = await restTester.testUpdateUserLimitedFields(iterations, users);
    restRestimeArr = restRestimeArr.concat(json.testArr);
    restCpuArr = restCpuArr.concat(json.cpuArr);
    restRamArr = restRamArr.concat(json.ramArr);

    testWriter.saveFileToCsv(gqlRestimeArr, gqlCpuArr, gqlRamArr, restRestimeArr, restCpuArr, restRamArr, `../Testresults/updateUser_iterations_${iterations}.csv`);
}
async function doAddUserBigData(iterations) {
    clearArrays();
    console.log("Testing GQL");
    let json;
    json = await gqlTester.testAddUserBigData(iterations);
    gqlRestimeArr = gqlRestimeArr.concat(json.testArr);
    gqlCpuArr = gqlCpuArr.concat(json.cpuArr);
    gqlRamArr = gqlRamArr.concat(json.ramArr);

    console.log("Testing Rest")
    json = await restTester.testAddUserBigData(iterations);
    restRestimeArr = restRestimeArr.concat(json.testArr);
    restCpuArr = restCpuArr.concat(json.cpuArr);
    restRamArr = restRamArr.concat(json.ramArr);

    testWriter.saveFileToCsv(gqlRestimeArr, gqlCpuArr, gqlRamArr, restRestimeArr, restCpuArr, restRamArr, `../Testresults/addUserBigdata_iterations_${iterations}.csv`);

}
async function doUpdateUserAllFields1000iterations() {
    clearArrays();
    console.log("Testing GQL");
    let json;
    json = await gqlTester.testUpdateUserAllFields(5000, users);
    gqlRestimeArr = gqlRestimeArr.concat(json.testArr);
    gqlCpuArr = gqlCpuArr.concat(json.cpuArr);
    gqlRamArr = gqlRamArr.concat(json.ramArr);

    console.log("Testing Rest")
    json = await restTester.testUpdateUserAllFields(5000, users);
    restRestimeArr = restRestimeArr.concat(json.testArr);
    restCpuArr = restCpuArr.concat(json.cpuArr);
    restRamArr = restRamArr.concat(json.ramArr);

    testWriter.saveFileToCsv(gqlRestimeArr, gqlCpuArr, gqlRamArr, restRestimeArr, restCpuArr, restRamArr, "../Testresults/updateUserAllFields_iterations_5000.csv");

}
async function doAddMovie(iterations) {
    clearArrays();
    console.log("Testing GQL");
    let json;
    json = await gqlTester.testAddMovie(iterations);
    gqlRestimeArr = gqlRestimeArr.concat(json.testArr);
    gqlCpuArr = gqlCpuArr.concat(json.cpuArr);
    gqlRamArr = gqlRamArr.concat(json.ramArr);

    console.log("Testing Rest")
    json = await restTester.testAddMovie(iterations);
    restRestimeArr = restRestimeArr.concat(json.testArr);
    restCpuArr = restCpuArr.concat(json.cpuArr);
    restRamArr = restRamArr.concat(json.ramArr);

    testWriter.saveFileToCsv(gqlRestimeArr, gqlCpuArr, gqlRamArr, restRestimeArr, restCpuArr, restRamArr, `../Testresults/addMovie_iterations_${iterations}.csv`);



}
async function doTestUpdateMovie(iterations) {
    clearArrays();
    console.log("Testing GQL");
    let json;
    json = await gqlTester.testUpdateMovie(iterations, movies);
    gqlRestimeArr = gqlRestimeArr.concat(json.testArr);
    gqlCpuArr = gqlCpuArr.concat(json.cpuArr);
    gqlRamArr = gqlRamArr.concat(json.ramArr);

    console.log("Testing Rest")
    json = await restTester.testUpdateMovie(iterations, movies);
    restRestimeArr = restRestimeArr.concat(json.testArr);
    restCpuArr = restCpuArr.concat(json.cpuArr);
    restRamArr = restRamArr.concat(json.ramArr);

    testWriter.saveFileToCsv(gqlRestimeArr, gqlCpuArr, gqlRamArr, restRestimeArr, restCpuArr, restRamArr, `../Testresults/updateMovie_iterations_${iterations}.csv`);

}

async function doAddReview(iterations) {
    clearArrays();
    console.log("Testing GQL");
    let json;
    json = await gqlTester.testAddReview(iterations, users, movies);
    gqlRestimeArr = gqlRestimeArr.concat(json.testArr);
    gqlCpuArr = gqlCpuArr.concat(json.cpuArr);
    gqlRamArr = gqlRamArr.concat(json.ramArr);

    console.log("Testing Rest")
    json = await restTester.testAddReview(iterations, users, movies);
    restRestimeArr = restRestimeArr.concat(json.testArr);
    restCpuArr = restCpuArr.concat(json.cpuArr);
    restRamArr = restRamArr.concat(json.ramArr);

    testWriter.saveFileToCsv(gqlRestimeArr, gqlCpuArr, gqlRamArr, restRestimeArr, restCpuArr, restRamArr, `../Testresults/addReview_iterations_${iterations}.csv`);



}
async function doUpdateReview(iterations) {
    clearArrays();
    console.log("Testing GQL");
    let json;
    json = await gqlTester.testUpdateReview(iterations, reviews);
    gqlRestimeArr = gqlRestimeArr.concat(json.testArr);
    gqlCpuArr = gqlCpuArr.concat(json.cpuArr);
    gqlRamArr = gqlRamArr.concat(json.ramArr);

    console.log("Testing Rest")
    json = await restTester.testUpdateReview(iterations, reviews);
    restRestimeArr = restRestimeArr.concat(json.testArr);
    restCpuArr = restCpuArr.concat(json.cpuArr);
    restRamArr = restRamArr.concat(json.ramArr);

    testWriter.saveFileToCsv(gqlRestimeArr, gqlCpuArr, gqlRamArr, restRestimeArr, restCpuArr, restRamArr, `../Testresults/updateReview_iterations_${iterations}.csv`);

}

async function doDifferentTasks1000Iterations() {

    clearArrays();

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


function clearArrays() {
    gqlRestimeArr = [];
    gqlCpuArr = [];
    gqlRamArr = [];


    restRestimeArr = [];
    restCpuArr = [];
    restRamArr = [];
    gqlRestimeArr.push('Res_Time_GQL');
    gqlCpuArr.push('Cpu_usage_GQL');
    gqlRamArr.push('Ram_Usage_GQL');
    restRestimeArr.push('Res_Time_Rest');
    restCpuArr.push('Cpu_usage_Rest');
    restRamArr.push('Ram_Usage_Rest');
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}