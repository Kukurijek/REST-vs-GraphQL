var users = [];
var movies = [];
var testArray = [];
var cpuArray = [];
var ramArray = [];
const {
    faker,
    AddressModule
} = require('@faker-js/faker');
const {
    json
} = require('body-parser');



async function testGetUser(iterations, userList) {
    testArray = [];
    ramArray = [];
    cpuArray = [];
    for (var i = 0; i < iterations; i++) {
        const startTime = Date.now();
        var response = await fetch(`http://localhost:8080/users/${userList.getUsers[i].id}`)
        const totalTime = Date.now() - startTime;
        testArray.push(totalTime);
        ramArray.push(JSON.parse(response.headers.get('performance')).ram);
        cpuArray.push(JSON.parse(response.headers.get('performance')).cpu);

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
        var response = await fetch(`http://localhost:8080/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "firstName": faker.name.firstName(),
                "lastName": faker.name.lastName(),
                "email": faker.internet.email()
            })

        })
        const totalTime = Date.now() - startTime;
        ramArray.push(JSON.parse(response.headers.get('performance')).ram);
        cpuArray.push(JSON.parse(response.headers.get('performance')).cpu);
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
        var response = await fetch('http://localhost:8080/movies', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "name": faker.color.human(),
                    "rating": 2,
                    "producer": faker.name.fullName()
                })
            }

        )
        const totalTime = Date.now() - startTime;
        ramArray.push(JSON.parse(response.headers.get('performance')).ram);
        cpuArray.push(JSON.parse(response.headers.get('performance')).cpu);
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
        var response = await fetch('http://localhost:8080/reviews', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "title": faker.color.human(),
                "description": faker.lorem.paragraphs(1),
                "body": faker.lorem.paragraphs(4),
                "movieID": movieList.getMovies[i].id,
                "userID": userList.getUsers[i].id
            })
        })
        const totalTime = Date.now() - startTime;
        ramArray.push(JSON.parse(response.headers.get('performance')).ram);
        cpuArray.push(JSON.parse(response.headers.get('performance')).cpu);
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
        var response = await fetch(`http://localhost:8080/reviews?id=${reviewList.getReviews[i].id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: faker.color.human(),
                description: faker.lorem.paragraphs(1),
                body: faker.lorem.paragraphs(4),
            })
        })
        const totalTime = Date.now() - startTime;
        ramArray.push(JSON.parse(response.headers.get('performance')).ram);
        cpuArray.push(JSON.parse(response.headers.get('performance')).cpu);
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
module.exports.testUpdateReview = testUpdateReview;
module.exports.testAddReview = testAddReview;
module.exports.testAddMovie = testAddMovie;