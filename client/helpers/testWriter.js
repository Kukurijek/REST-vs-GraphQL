let fs = require('fs');

function saveFileToCsv(gqlRestimeArr, gqlCpuArr, gqlRamArr, restRestimeArr, restCpuArr, restRamArr, fileName) {

    let writeStream = fs.createWriteStream(fileName);
    for (var i = 0; i < gqlRestimeArr.length; i++) {
        writeStream.write(`${gqlRestimeArr[i]},${gqlCpuArr[i]},${gqlRamArr[i]},${restRestimeArr[i]},${restCpuArr[i]},${restRamArr[i]}\n`);
    }
}

function saveFileToCsvBatching(gqlRestimeArr, restRestimeArr, restCpuArr, restRamArr, fileName) {
    let writeStream = fs.createWriteStream(fileName);
    for (var i = 0; i < gqlRestimeArr.length; i++) {
        writeStream.write(`${gqlRestimeArr[i]},${restRestimeArr[i]},${restCpuArr[i]},${restRamArr[i]}\n`);
    }
}

function saveGqlPerformance(arr, fileName) {
    let writeStream = fs.createWriteStream(fileName)
    writeStream.write('gql_ram_usage, gql_cpu_usage\n');
    for (var i = 1; i < arr.length; i++) {

        writeStream.write(`${JSON.parse(arr[i].headers.get('performance')).ram},${JSON.parse(arr[i].headers.get('performance')).cpu}\n`)
    }
}

module.exports.saveFileToCsv = saveFileToCsv;
module.exports.saveFileToCsvBatching = saveFileToCsvBatching;
module.exports.saveGqlPerformance = saveGqlPerformance;
