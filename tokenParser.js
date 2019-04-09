const fs = require('fs');
let tokens = [];
var lineReader = require('readline').createInterface({
    input: fs.createReadStream(__dirname + '/Input/TOKENS.txt')
});

lineReader.on('line', function (line) {
    console.log(line.trim()[0]);
    if (line.trim().length && line.trim()[0] != "#") {
        let split = line.split(' -> ');
        console.log(split)
        tokens.push({
            type: split[0].trim(),
            id: parseInt(split[1].trim())
        });
    }
});

lineReader.on('close', () => {
    fs.writeFileSync(__dirname + '/source/tokens.json', JSON.stringify(tokens));

});