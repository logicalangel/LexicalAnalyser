const fs = require('fs');
const terminals = [4, 9, 14, 16, 18, 24, 28, 32, 36, 40, 43, 46, 51, 56, 57, 58, 60, 62, 61, 63, 64];
const table = JSON.parse(fs.readFileSync(__dirname + '/source/table.json'));
const tokens = JSON.parse(fs.readFileSync(__dirname + '/source/tokens.json'));
let source = '';
let result = [];
let currentState = 0;
let startIndex = 0;

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(__dirname + '/Input/INPUT_CODE.txt')
});

lineReader.on('line', function (line) {
    if (line.trim().length) {
        source += line.trim().toLowerCase() + ' ';
    }
});

lineReader.on('close', () => {
    let splited = source.split('');
    for (let i = 0; i < splited.length; i++) {
        if (splited[i] == ' ')
            continue;
        //middle of word
        if (currentState == 0)
            startIndex = i;

        let row = table[currentState];
        let state = row.find(element => {
            //console.log(element.char + '==' + splited[i]);
            return element.char == splited[i]
        });

        if (currentState == -1 || state == undefined) {
            console.error('Err happend at (' + startIndex + ') CS:' + currentState + ', S:' + state);
            result += 'Err happend at (' + startIndex + ') ';
            fs.writeFileSync(__dirname + '/source/output.json', result);
            process.exit(1);
        }
        console.log(splited[i] + ' , CS: ' + currentState + ' -> ' + JSON.stringify(state));
        currentState = parseInt(state.to);
        if (terminals.indexOf(currentState) != -1 && splited[i + 1] == ' ') {
            // if is terminal & end of word
            let token = tokens.find(token => {
                return token.id == currentState
            });
            result += source.substring(startIndex, i + 1) + ' as a T_' + token.type + ' in ' + startIndex + '-' + (i + 1) + '\n';
            console.log(source.substring(startIndex, i + 1) + ' as a T_' + token.type + ' in ' + startIndex + '-' + (i + 1));
            startIndex = i;
            currentState = 0;

        }
        splited[i] != ' ' && console.log('-----------');
    }
    fs.writeFileSync(__dirname + '/source/output.json', result);
})