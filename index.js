const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


function state(table, x, y) {
    this.table = table;
    this.x = x;
    this.y = y;
}

function generateState() {
    var table = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 'x']
    ];
    return new state(table, 3, 3);
}

function prettyPrint(state) {
    var table = state.table;
    var result = '';
    for (var i = 0; i < table.length; i++) {
        for (var j = 0; j < table[i].length; j++) {
            if (j > 0) {
                result += '  ';
            }
            if (table[i][j] === 'x' || table[i][j] < 10) {
                result += ` ${table[i][j]}`;
            } else {
                result += table[i][j];
            }
        }
        result += '\n\n';
    }
    console.log(result);
}

function moveUp(state) {
    if (state.x === 0) {
        return;
    }
    state.table[state.x][state.y] = state.table[state.x-1][state.y];
    state.table[state.x-1][state.y] = 'x';
    state.x = state.x-1;
}

function moveDown(state) {
    if (state.x === 3) {
        return;
    }
    state.table[state.x][state.y] = state.table[state.x+1][state.y];
    state.table[state.x+1][state.y] = 'x';
    state.x = state.x+1;
}

function moveLeft(state) {
    if (state.y === 0) {
        return;
    }
    state.table[state.x][state.y] = state.table[state.x][state.y-1];
    state.table[state.x][state.y-1] = 'x';
    state.y = state.y-1;
}

function moveRight(state) {
    if (state.y === 3) {
        return;
    }
    state.table[state.x][state.y] = state.table[state.x][state.y+1];
    state.table[state.x][state.y+1] = 'x';
    state.y = state.y+1;
}

function randomShift() {
    var arrOfFunctions = [moveUp, moveDown, moveLeft, moveRight];
    var randomIndex = Math.floor(Math.random() * arrOfFunctions.length);
    return arrOfFunctions[randomIndex];
}


function processInput(state) {
    rl.question('Your move: ', function(answer) {
        if (answer == 'u') {
            moveUp(state);
        } else if (answer == 'd') {
            moveDown(state);
        } else if (answer == 'l') {
            moveLeft(state);
        } else if (answer == 'r') {
            moveRight(state);
        } else {
            console.log(`Enter 'u', 'd', 'l' or 'r'`);
        }
        prettyPrint(state);
        processInput(state);
    })
}

function main() {
    var state = generateState();

    for (var i = 0; i < 15; i++) {
        randomShift()(state);
    }
    prettyPrint(state);

    processInput(state);
}

main();