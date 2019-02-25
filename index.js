const TOTAL_MOVES = 15;

function state(table, x, y) {
    this.table = table;
    this.x = x;
    this.y = y;
    this.moveCount = 0;
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
    var playBoard = document.getElementById('playBoard');
    var table = state.table;
    for (var i = 0; i < table.length; i++) {
        for (var j = 0; j < table[i].length; j++) {
            playBoard.rows[i].cells[j].innerHTML = table[i][j];
        }
    }
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

// function processInput(state) {
//     rl.question(`Left ${TOTAL_MOVES-state.moveCount}. Your move: `, function(answer) {
//         if (answer == 'u') {
//             moveUp(state);
//             state.moveCount++;
//         } else if (answer == 'd') {
//             moveDown(state);
//             state.moveCount++;
//         } else if (answer == 'l') {
//             moveLeft(state);
//             state.moveCount++;
//         } else if (answer == 'r') {
//             moveRight(state);
//             state.moveCount++;
//         } else {
//             console.log(`Enter 'u', 'd', 'l' or 'r'`);
//         }
//         prettyPrint(state);

//         if (state.moveCount >= TOTAL_MOVES) {
//             console.log(`Game Over! Try Again!`)
//             rl.close();
//             return;
//         }
//         processInput(state);
//     });
// }

var state = generateState();

function handleKeyPress(e) {
    if (e == undefined) {
        e = window.event;
    }
    if (e.keyCode === 97) {
        moveLeft(state);
        state.moveCount++;
    } else if (e.keyCode === 100) {
        moveRight(state);
        state.moveCount++;
    } else if (e.keyCode === 119) {
        moveUp(state);
        state.moveCount++;
    } else if (e.keyCode === 115) {
        moveDown(state);
        state.moveCount++;
    }
    prettyPrint(state);
}

function handleBodyLoad() {

    for (var i = 0; i < 15; i++) {
        randomShift()(state);
    }
    prettyPrint(state);

    //processInput(state);
}