const fs = require('fs');
let table = [];
var lineReader = require('readline').createInterface({
    input: fs.createReadStream(__dirname + '/Input/DFA_TABLE.txt')
});

lineReader.on('line', function (line) {
    if (line.trim().length && line.trim()[0] != "#" && line.trim()[0] != "%") {
        let row = [];
        line.substring(line.indexOf('(')).split('|').forEach((cell) => {
            let split = cell.replace('(', '').replace(')', '').split(',');
            row.push({
                char: split[0].trim(),
                to: split[1].trim()
            });
        });
        table.push(row);
    }
});

lineReader.on('close', () => {
    fs.writeFileSync(__dirname + '/source/table.json', JSON.stringify(table));

});