const gqlQueries = require('./GraphQL/Queries/gqlQueries');

const {
    performance,
    PerformanceObserver
} = require("perf_hooks")

const perfObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
        console.log(entry)
    })
})

perfObserver.observe({
    entryTypes: ["measure"],
    buffer: true
})



async function test1() {
    let test1Arr = [];
    for (let i = 0; i < 1000; i++) {
        performance.mark(`Test-${i}-start`);
        await gqlQueries.getUsersFnameLNameReviewsMovieName().then((data) => {
            performance.mark(`Test-${i}-end`)

            test1Arr.push("Duration: " + performance.measure(`Test-${i}`, `Test-${i}-start`, `Test-${i}-end`).duration);
            console.log(JSON.stringify(data))
        });
    }
    return test1Arr;
}

console.log(test1())