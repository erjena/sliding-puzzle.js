const TOTAL_MOVES = 15;

function generateState() {
    var table = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 'x']
    ];

    return {
        table: table,
        x: 3,
        y: 3,
        moveCount: 0,
        isActive: true,
        isWon: false
    };
}

function prettyPrint(state) {
    var playBoard = document.getElementById('playBoard');
    var table = state.table;
    for (var i = 0; i < table.length; i++) {
        for (var j = 0; j < table[i].length; j++) {
            playBoard.rows[i].cells[j].innerHTML = table[i][j];
        }
    }
    var statusBoard = document.getElementById('statusBoard');
    if (state.isActive) {
        statusBoard.innerHTML = "Your number of moves: " + state.moveCount;
    } else if (state.isWon) {
        statusBoard.innerHTML = "You won!";
    } else {
        statusBoard.innerHTML = "Game Over! Try Again!";
    }
}

function moveUp(state) {
    if (state.x === 0) {
        return false;
    }
    state.table[state.x][state.y] = state.table[state.x-1][state.y];
    state.table[state.x-1][state.y] = 'x';
    state.x = state.x-1;
    return true;
}

function moveDown(state) {
    if (state.x === 3) {
        return false;
    }
    state.table[state.x][state.y] = state.table[state.x+1][state.y];
    state.table[state.x+1][state.y] = 'x';
    state.x = state.x+1;
    return true;
}

function moveLeft(state) {
    if (state.y === 0) {
        return false;
    }
    state.table[state.x][state.y] = state.table[state.x][state.y-1];
    state.table[state.x][state.y-1] = 'x';
    state.y = state.y-1;
    return true;
}

function moveRight(state) {
    if (state.y === 3) {
        return false;
    }
    state.table[state.x][state.y] = state.table[state.x][state.y+1];
    state.table[state.x][state.y+1] = 'x';
    state.y = state.y+1;
    return true;
}

function randomShift() {
    var arrOfFunctions = [moveUp, moveDown, moveLeft, moveRight];
    var randomIndex = Math.floor(Math.random() * arrOfFunctions.length);
    return arrOfFunctions[randomIndex];
}

var state = generateState();

function handleKeyPress(e) {
    if (e == undefined) {
        e = window.event;
    }
    if (state.isActive === false) {
        return;
    }

    if (e.keyCode === 97) {
        if (moveLeft(state) === true) {
            state.moveCount++;
        }
    } else if (e.keyCode === 100) {
        if (moveRight(state) === true) {
            state.moveCount++;
        }    
    } else if (e.keyCode === 119) {
        if (moveUp(state) === true) {
            state.moveCount++;
        }
    } else if (e.keyCode === 115) {
        if (moveDown(state) === true) {
            state.moveCount++;
        }
    }

    if (isWinner()) {
        state.isWon = true;
        state.isActive = false;
    } else if (state.moveCount >= TOTAL_MOVES) {
        state.isActive = false;
    }
    prettyPrint(state);
}

function isWinner() {
    var table = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 'x']
    ];
    return JSON.stringify(table) == JSON.stringify(state.table);
}

function startGame() {
    for (var i = 0; i < 1; i++) {
        randomShift()(state);
    }
    prettyPrint(state);
}