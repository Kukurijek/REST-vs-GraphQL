let fs = require('fs');



function saveFileToCsv(gqlArr, restArr, fileName) {

    let writeStream = fs.createWriteStream(fileName);
    for (var i = 0; i < gqlArr.length; i++) {
        writeStream.write(gqlArr[i] + ',' + restArr[i] + '\n');
    }



}

module.exports.saveFileToCsv = saveFileToCsv;