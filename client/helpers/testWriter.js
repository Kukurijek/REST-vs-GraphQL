let fs = require('fs');



function saveFileToCsv(gqlRestimeArr, gqlCpuArr, gqlRamArr, restRestimeArr, restCpuArr, restRamArr, fileName) {

    let writeStream = fs.createWriteStream(fileName);
    for (var i = 0; i < gqlRestimeArr.length; i++) {
        writeStream.write(`${gqlRestimeArr[i]},${gqlCpuArr[i]},${gqlRamArr[i]},${restRestimeArr[i]},${restCpuArr[i]},${restRamArr[i]}\n`);
    }



}

module.exports.saveFileToCsv = saveFileToCsv;