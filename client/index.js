const gqlQueries = require('./GraphQL/Queries/gqlQueries');

const fetcher = require("./helpers/fetcher")
const {
    cpuUsage
} = require('node:process');


const {
    performance,
    PerformanceObserver
} = require("perf_hooks");
const {
    start
} = require('node:repl');

let x = 0.0;
let count = 0;
let userList;
let movieList;
async function populateLists() {
    var users = await gqlQueries.getUsersFnameLNameReviewsMovieName();
    var movies = await gqlQueries.getMovies();
    await fetcher.writetoFile(users, movies);

    userList = await fetcher.getUserList();
    movieList = await fetcher.getMovieList();




}
const perfObserver = new PerformanceObserver((items) => {

    items.getEntries().forEach((entry) => {
        x += parseFloat(entry.duration)
        count++;

    })

    //console.log(i / items)
})

perfObserver.observe({
    entryTypes: ["measure"],
    buffer: true
})



async function testGetUser(iterations) {
    i = 0;
    count = 0;

    for (let i = 0; i < iterations; i++) {
        performance.mark(`Test-${i}-start`);
        var test = await gqlQueries.getUserById(userList[i][1].id);
        performance.mark(`Test-${i}-end`)
        performance.measure(`Test-${i}`, `Test-${i}-start`, `Test-${i}-end`);
        const measure = performance.getEntriesByName(`Test-${i}`)[0];
        console.log(measure.duration)

    }

}
async function testGetAllUsers(iterations) {
    i = 0;
    count = 0;

    for (let i = 0; i < iterations; i++) {

        const startUsage = cpuUsage();
        console.log("Start usage :")
        console.log(startUsage)
        performance.mark(`Test-${i}-start`);
        await gqlQueries.getUsersFnameLNameReviewsMovieName().then((data) => {
            performance.mark(`Test-${i}-end`)
            performance.measure(`Test-${i}`, `Test-${i}-start`, `Test-${i}-end`);
            console.log("Difference :")
            console.log(cpuUsage(startUsage))
        });

    }
}

async function testAddUser(iterations) {
    x = 0;
    count = 0;

    for (let i = 0; i < iterations; i++) {
        performance.mark(`Test-${i}-start`);
        await gqlQueries.addUser().then((data) => {
            performance.mark(`Test-${i}-end`)
            performance.measure(`Test-${i}`, `Test-${i}-start`, `Test-${i}-end`);

        });
    }
}
async function testAddMovies(iterations) {
    x = 0;
    count = 0;
    for (let i = 0; i < iterations; i++) {
        performance.mark(`Test-${i}-start`);
        await gqlQueries.addMovie().then((data) => {
            performance.mark(`Test-${i}-end`)
            performance.measure(`Test-${i}`, `Test-${i}-start`, `Test-${i}-end`);

        });
    }
}

async function testAddReview(iterations) {
    x = 0;
    count = 0;
    for (let i = 0; i < iterations; i++) {
        performance.mark(`Test-${i}-start`);

        await gqlQueries.addReview(userList[i][1].id, movieList[i][1].id).then((data) => {
            performance.mark(`Test-${i}-end`)
            performance.measure(`Test-${i}`, `Test-${i}-start`, `Test-${i}-end`);

        });
    }
}

async function init() {
    await populateLists().then(async () => {
        await sleep(3000);
        runTests();
    })

}
init();

async function runTests() {
    /*test1().then(() => {
    console.log(i / count)
})*/
    /*testAddReview(50).then(() => {
        console.log(x / count);
    })*/

    await testGetUser(500).then(() => {
        console.log(x / count);
    })
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}