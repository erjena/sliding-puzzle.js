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
    
}

function main() {
    var state = generateState();
    prettyPrint(state);
}

main();