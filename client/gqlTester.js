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
async function testGetAllUsers(iterations) {
    testArray = [];
    ramArray = [];
    cpuArray = [];
    for (var i = 0; i < iterations; i++) {
        const startTime = Date.now();
        var test = await gqlQueries.getUsersFnameLNameReviewsMovieName();
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
async function testUpdateUserAllFields(iterations, userList) {
    testArray = [];
    ramArray = [];
    cpuArray = [];
    for (var i = 0; i < iterations; i++) {
        const startTime = Date.now();
        var test = await gqlQueries.updateUserAllFields(userList.getUsers[i].id);
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
async function testAddUserBigData(iterations) {
    testArray = [];
    ramArray = [];
    cpuArray = [];
    for (var i = 0; i < iterations; i++) {
        const startTime = Date.now();
        var test = await gqlQueries.addUserBigData();
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
async function testUpdateUserLimitedFields(iterations, userList) {
    testArray = [];
    ramArray = [];
    cpuArray = [];
    for (var i = 0; i < iterations; i++) {
        const startTime = Date.now();
        var test = await gqlQueries.updateUserLimitedFields(userList.getUsers[i].id);
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

async function testAddUserAllFields(iterations) {
    testArray = [];
    ramArray = [];
    cpuArray = [];
    for (var i = 0; i < iterations; i++) {
        const startTime = Date.now();
        var test = await gqlQueries.addUserAllFields();
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
async function testUpdateMovie(iterations, movieList) {
    testArray = [];
    ramArray = [];
    cpuArray = [];
    for (var i = 0; i < iterations; i++) {
        const startTime = Date.now();
        var test = await gqlQueries.updateMovie(movieList.getMovies[i].id);
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

async function test6Queries(iterations, userList, movieList) {
    testArray = [];
    ramArray = [];
    cpuArray = [];
    for (var i = 0; i < iterations; i++) {
        const startTime = Date.now();
        var test = await gqlQueries.createTwoMoviesTwoUsersTwoReviews(userList.getUsers[i].id, movieList.getMovies[i].id);
        const totalTime = Date.now() - startTime;
        await sleep(300);
        testArray.push(totalTime);
    }
    var json = {
        testArr: testArray,
    }
    return json;
}
async function testCreateMovieTwoReviews(iterations, userList, movieList) {
    testArray = [];
    ramArray = [];
    cpuArray = [];
    for (var i = 0; i < iterations; i++) {
        const startTime = Date.now();
        var test = await gqlQueries.createMovieAndTwoReviewsBatch(userList.getUsers[i].id, movieList.getMovies[i].id);
        const totalTime = Date.now() - startTime;
        testArray.push(totalTime);
        await sleep(300);
    }
    var json = {
        testArr: testArray,
    }
    return json;
}
async function testGetSpecificUserAllFields(iterations, userID) {
    testArray = [];
    ramArray = [];
    cpuArray = [];
    for (var i = 0; i < iterations; i++) {
        const startTime = Date.now();
        var test = await gqlQueries.getUserAllFields(userID);
        const totalTime = Date.now() - startTime;
        testArray.push(totalTime);
        ramArray.push(JSON.parse(test.headers.get('performance')).ram);
        cpuArray.push(JSON.parse(test.headers.get('performance')).cpu);
        await sleep(300);
    }
    var json = {
        testArr: testArray,
        cpuArr: cpuArray,
        ramArr: ramArray
    }
    return json;
}
async function testGetSpecificUserLimitedFields(iterations, userID) {
    testArray = [];
    ramArray = [];
    cpuArray = [];
    for (var i = 0; i < iterations; i++) {
        const startTime = Date.now();
        var test = await gqlQueries.getUserLimitedFields(userID);
        const totalTime = Date.now() - startTime;
        testArray.push(totalTime);
        ramArray.push(JSON.parse(test.headers.get('performance')).ram);
        cpuArray.push(JSON.parse(test.headers.get('performance')).cpu);
        await sleep(300);
    }
    var json = {
        testArr: testArray,
        cpuArr: cpuArray,
        ramArr: ramArray
    }
    return json;
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}



module.exports.testCreateMovieTwoReviews = testCreateMovieTwoReviews;
module.exports.testGetUser = testGetUser;
module.exports.testAddUser = testAddUser;
module.exports.testAddMovie = testAddMovie;
module.exports.testAddReview = testAddReview;
module.exports.testUpdateReview = testUpdateReview;
module.exports.testGetAllUsers = testGetAllUsers;
module.exports.testAddUserAllFields = testAddUserAllFields;
module.exports.testUpdateUserAllFields = testUpdateUserAllFields;
module.exports.testUpdateUserLimitedFields = testUpdateUserLimitedFields;
module.exports.testUpdateMovie = testUpdateMovie;
module.exports.testAddUserBigData = testAddUserBigData;
module.exports.test6Queries = test6Queries;
module.exports.testGetSpecificUserAllFields = testGetSpecificUserAllFields;
module.exports.testGetSpecificUserLimitedFields = testGetSpecificUserLimitedFields;
