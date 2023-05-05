const gqlQueries = require('./GraphQL/Queries/gqlQueries');
const {
    faker
} = require('@faker-js/faker');
const fetcher = require("./helpers/fetcher")


const {
    performance,
    PerformanceObserver
} = require("perf_hooks")
let x = 0.0;
let count = 0;
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



async function testGetAllUsers(iterations) {
    i = 0;
    count = 0;
    let test1Arr = [];
    for (let i = 0; i < iterations; i++) {
        performance.mark(`Test-${i}-start`);
        await gqlQueries.getUsersFnameLNameReviewsMovieName().then((data) => {
            performance.mark(`Test-${i}-end`)

            test1Arr.push("Duration: " + performance.measure(`Test-${i}`, `Test-${i}-start`, `Test-${i}-end`));

        });
    }
    return test1Arr;
}

async function testAddUsers(iterations) {
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

    let userList = await fetcher.getUserList();
    let movieList = await fetcher.getMovieList();

    for (let i = 0; i < iterations; i++) {
        performance.mark(`Test-${i}-start`);

        await gqlQueries.addReview(userList[i][1].id, movieList[i][1].id).then((data) => {
            performance.mark(`Test-${i}-end`)
            performance.measure(`Test-${i}`, `Test-${i}-start`, `Test-${i}-end`);

        });
    }
}

/*test1().then(() => {
    console.log(i / count)
})*/
testAddReview(50).then(() => {
    console.log(x / count);
})