var users = [];
var movies = [];
var testArray = [];



async function testGetUser(iterations, userList) {
    testArray = [];
    testArray.push('Res_Time_REST')
    for (var i = 0; i < iterations; i++) {
        const startTime = Date.now();
        var response = await fetch(`http://localhost:8080/users/${userList.getUsers[i].id}`)
        const totalTime = Date.now() - startTime;
        testArray.push(totalTime);
    }
    return testArray;

}




module.exports.testGetUser = testGetUser;