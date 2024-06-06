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

async function testGetSpecificUser(iterations, userID) {
    testArray = [];
    ramArray = [];
    cpuArray = [];
    for (var i = 0; i < iterations; i++) {
        const startTime = Date.now();
        var response = await fetch(`http://localhost:8080/users/${userID}`)
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
async function testUpdateUserLimitedFields(iterations, userList) {
    testArray = [];
    ramArray = [];
    cpuArray = [];
    for (var i = 0; i < iterations; i++) {
        const startTime = Date.now();
        var response = await fetch(`http://localhost:8080/users?id=${userList.getUsers[i].id}`, {
            method: "PUT",
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
async function testUpdateUserAllFields(iterations, userList) {
    testArray = [];
    ramArray = [];
    cpuArray = [];
    for (var i = 0; i < iterations; i++) {
        const startTime = Date.now();
        var response = await fetch(`http://localhost:8080/users?id=${userList.getUsers[i].id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "firstName": faker.name.firstName(),
                "lastName": faker.name.lastName(),
                "email": faker.internet.email(),
                "dateOfBirth": Math.floor(Math.random() * (10000 - 1 + 1) + 1).toString(),
                "location": faker.address.city(),
                "favoriteGenre": faker.color.human(),
                "userDescription": faker.lorem.paragraphs(),
                "phoneNumber": Math.floor(Math.random() * (20000 - 1 + 1) + 1)
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

async function testGetAllUsers(iterations) {
    testArray = [];
    ramArray = [];
    cpuArray = [];
    for (var i = 0; i < iterations; i++) {
        const startTime = Date.now();
        var response = await fetch(`http://localhost:8080/users`)
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

async function testAddUserAllFields(iterations) {
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
                "email": faker.internet.email(),
                "dateOfBirth": Math.floor(Math.random() * (10000 - 1 + 1) + 1).toString(),
                "location": faker.address.city(),
                "favoriteGenre": faker.color.human(),
                "userDescription": faker.lorem.paragraphs(),
                "phoneNumber": Math.floor(Math.random() * (20000 - 1 + 1) + 1)
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
async function testAddUserBigData(iterations) {
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
                "firstName": faker.lorem.paragraphs(10),
                "lastName": faker.lorem.paragraphs(10),
                "email": faker.lorem.paragraphs(10),
                "dateOfBirth": Math.floor(Math.random() * (10000 - 1 + 1) + 1).toString(),
                "location": faker.lorem.paragraphs(10),
                "favoriteGenre": faker.lorem.paragraphs(10),
                "userDescription": faker.lorem.paragraphs(30),
                "phoneNumber": Math.floor(Math.random() * (20000 - 1 + 1) + 1)
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
async function testUpdateMovie(iterations, movieList) {
    testArray = [];
    ramArray = [];
    cpuArray = [];
    for (var i = 0; i < iterations; i++) {

        const startTime = Date.now();
        var response = await fetch(`http://localhost:8080/movies?id=${movieList.getMovies[i].id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: faker.color.human(),
                producer: faker.name.fullName(),
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

async function test6Queries(iterations, userList, movieList) {
    testArray = [];
    ramArray = [];
    cpuArray = [];
    for (var i = iterations; i < iterations * 2 + 1; i++) {
        var totalTime = 0;
        var totalCPU = 0;
        var startTime = Date.now();
        let response;
        //1
        response = await fetch('http://localhost:8080/movies', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "name": faker.color.human(),
                    "producer": faker.name.fullName(),
                    "rating": Math.floor(Math.random() * 6)
                })
            }

        )
        ramArray.push(JSON.parse(response.headers.get('performance')).ram);
        //2
        response = await fetch(`http://localhost:8080/movies?id=${movieList.getMovies[i].id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": faker.color.human(),
                "producer": faker.name.fullName()
            })
        })
        ramArray.push(JSON.parse(response.headers.get('performance')).ram);
        //3
        response = await fetch('http://localhost:8080/reviews', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "movieID": movieList.getMovies[i].id,
                "userID": userList.getUsers[i].id,
                "body": faker.lorem.paragraphs(3),
                "description": faker.lorem.paragraphs(1),
                "title": faker.color.human(),
            })
        })
        console.log(response)
        ramArray.push(JSON.parse(response.headers.get('performance')).ram);
        //4
        response = await fetch(`http://localhost:8080/users?id=${userList.getUsers[i].id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "firstName": faker.name.firstName(),
                "lastName": faker.name.lastName(),
                "email": faker.internet.email()
            })
        })
        ramArray.push(JSON.parse(response.headers.get('performance')).ram);
        //5
        response = await fetch(`http://localhost:8080/users`, {
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
        ramArray.push(JSON.parse(response.headers.get('performance')).ram);
        //6
        response = await fetch(`http://localhost:8080/users`, {
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
        var timeTaken = Date.now() - startTime;
        totalTime += timeTaken;
        ramArray.push(JSON.parse(response.headers.get('performance')).ram);
        totalCPU = JSON.parse(response.headers.get('performance')).cpu;
        cpuArray.push(totalCPU);
        testArray.push(totalTime);
        await sleep(300);
    }



    var json = {
        testArr: testArray,
        cpuArr: cpuArray,
        ramArr: ramArray
    }
    return json;
}


async function testCreateMovieTwoReviews(iterations, userList, movieList) {
    testArray = [];
    ramArray = [];
    cpuArray = [];
    for (var i = iterations; i < iterations * 2 + 1; i++) {
        var totalTime = 0;
        var totalCPU = 0;
        var startTime = Date.now();
        for (var x = 0; x < 3; x++) {

            let response;
            if (x === 0) {
                response = await fetch('http://localhost:8080/movies', {
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

            } else {
                response = await fetch('http://localhost:8080/reviews', {
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
            }
            ramArray.push(JSON.parse(response.headers.get('performance')).ram);
            totalCPU = JSON.parse(response.headers.get('performance')).cpu;



        }

        var timeTaken = Date.now() - startTime;
        cpuArray.push(totalCPU);
        testArray.push(timeTaken);
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


module.exports.testGetUser = testGetUser;
module.exports.testAddUser = testAddUser;
module.exports.testUpdateReview = testUpdateReview;
module.exports.testAddReview = testAddReview;
module.exports.testAddMovie = testAddMovie;
module.exports.testGetAllUsers = testGetAllUsers;
module.exports.testAddUserAllFields = testAddUserAllFields;
module.exports.testUpdateUserAllFields = testUpdateUserAllFields;
module.exports.testUpdateUserLimitedFields = testUpdateUserLimitedFields;
module.exports.testUpdateMovie = testUpdateMovie;
module.exports.testAddUserBigData = testAddUserBigData;
module.exports.testCreateMovieTwoReviews = testCreateMovieTwoReviews;
module.exports.test6Queries = test6Queries;
module.exports.testGetSpecificUser = testGetSpecificUser;
