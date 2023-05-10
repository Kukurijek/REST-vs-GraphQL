const gqlQueries = require('./GraphQL/Queries/gqlQueries');
var users = [];
var movies = [];
var testArray = [];





async function testGetUser(iterations, userList) {
    testArray = [];
    testArray.push('Res_Time_GQL')

    for (var i = 0; i < iterations; i++) {
        console.log(userList.getUsers[i].id)
        const startTime = Date.now();
        var test = await gqlQueries.getUserById(userList.getUsers[i].id);
        const totalTime = Date.now() - startTime;
        testArray.push(totalTime);
    }
    return testArray;

}




module.exports.testGetUser = testGetUser;