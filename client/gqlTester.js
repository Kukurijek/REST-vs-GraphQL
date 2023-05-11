const gqlQueries = require('./GraphQL/Queries/gqlQueries');
var users = [];
var movies = [];
var testArray = [];
var cpuArray = [];
var ramArray = [];






async function testGetUser(iterations, userList) {
    testArray = [];
    ramArray = [];
    cpuArray = [];
    for (var i = 0; i < iterations; i++) {
        const startTime = Date.now();
        var test = await gqlQueries.getUserById(userList.getUsers[i].id);
        const totalTime = Date.now() - startTime;
        ramArray.push(JSON.parse(test.headers.get('performance')).ram);
        cpuArray.push(JSON.parse(test.headers.get('performance')).cpu);
        testArray.push(totalTime);
    }
    var json = {
        testArr: testArray,
        cpuArr: cpuArray,
        ramArr: ramArray
    }
    return json;

}
async function testAddUser(iterations) {
    testArray = [];
    ramArray = [];
    cpuArray = [];
    for (var i = 0; i < iterations; i++) {
        const startTime = Date.now();
        var test = await gqlQueries.addUser();
        const totalTime = Date.now() - startTime;
        ramArray.push(JSON.parse(test.headers.get('performance')).ram);
        cpuArray.push(JSON.parse(test.headers.get('performance')).cpu);
        testArray.push(totalTime);
    }
    var json = {
        testArr: testArray,
        cpuArr: cpuArray,
        ramArr: ramArray
    }
    return json;
}
async function testAddMovie(iterations) {
    testArray = [];
    ramArray = [];
    cpuArray = [];
    for (var i = 0; i < iterations; i++) {
        const startTime = Date.now();
        var test = await gqlQueries.addMovie();
        const totalTime = Date.now() - startTime;
        ramArray.push(JSON.parse(test.headers.get('performance')).ram);
        cpuArray.push(JSON.parse(test.headers.get('performance')).cpu);
        testArray.push(totalTime);
    }
    var json = {
        testArr: testArray,
        cpuArr: cpuArray,
        ramArr: ramArray
    }
    return json;
}
async function testAddReview(iterations, userList, movieList) {
    testArray = [];
    ramArray = [];
    cpuArray = [];
    for (var i = 0; i < iterations; i++) {
        const startTime = Date.now();
        var test = await gqlQueries.addReview(userList.getUsers[i].id, movieList.getMovies[i].id);
        const totalTime = Date.now() - startTime;
        ramArray.push(JSON.parse(test.headers.get('performance')).ram);
        cpuArray.push(JSON.parse(test.headers.get('performance')).cpu);
        testArray.push(totalTime);
    }
    var json = {
        testArr: testArray,
        cpuArr: cpuArray,
        ramArr: ramArray
    }
    return json;
}
async function testUpdateReview(iterations, reviewList) {
    testArray = [];
    ramArray = [];
    cpuArray = [];
    for (var i = 0; i < iterations; i++) {
        const startTime = Date.now();
        var test = await gqlQueries.updateReview(reviewList.getReviews[i].id);
        const totalTime = Date.now() - startTime;
        ramArray.push(JSON.parse(test.headers.get('performance')).ram);
        cpuArray.push(JSON.parse(test.headers.get('performance')).cpu);
        testArray.push(totalTime);
    }
    var json = {
        testArr: testArray,
        cpuArr: cpuArray,
        ramArr: ramArray
    }
    return json;
}




module.exports.testGetUser = testGetUser;
module.exports.testAddUser = testAddUser;
module.exports.testAddMovie = testAddMovie;
module.exports.testAddReview = testAddReview;
module.exports.testUpdateReview = testUpdateReview;