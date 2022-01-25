const rows: number = 7;
const columns: number = 7;

export function create2DArray(rows: number, columns: number): Array<Array<number>> {
    let tempArray: Array<Array<number>> = []
    for (let i: number = 0; i < rows; i++) {
        tempArray[i] = new Array(columns);
    }
    return tempArray;
};

export function fill2DArray(field: Array<Array<number>>) {
    for (let i: number = 0; i < rows; i++) {
        for (let j: number = 0; j < columns; j++) {
            field[i][j] = 0;
        }
    }
};

export function print2DArray(field: Array<Array<number>>) {
    for (let i = 0; i < field.length; i++) {
        console.log(...field[i]);
    }
}

export function excludePositions(excludedField: Array<Array<number>>, queenRow: number, queenColumn: number) {
    excludePositionsDiagonalLeftDown(excludedField, queenRow, queenColumn)
    excludePositionsDiagonalLeftUp(excludedField, queenRow, queenColumn)
    excludePositionsHorizontal(excludedField, queenRow)
    excludePositionsVertical(excludedField, queenColumn)
    excludePositionsDiagonalRightDown(excludedField, queenRow, queenColumn)
    excludePositionsDiagonalRightUp(excludedField, queenRow, queenColumn)
}

export function excludePositionsVertical(field: Array<Array<number>>, queenColumn: number) {
    for (let i: number = 0; i < rows; i++) {
        field[i][queenColumn] = 1;
    }
}

export function excludePositionsHorizontal(field: Array<Array<number>>, queenRow: number) {
    for (let i: number = 0; i < columns; i++) {
        field[queenRow][i] = 1;
    }
}

export function excludePositionsDiagonalRightDown(field: Array<Array<number>>, queenRow: number, queenColumn: number) {
    let row: number = queenRow;
    let column: number = queenColumn;
    let endReached: boolean = false;
    while (!endReached) {
        if (row >= rows || column >= columns) {
            endReached = true;
            break;
        }
        field[row][column] = 1;
        row++;
        column++;
    }
}

export function excludePositionsDiagonalLeftUp(field: Array<Array<number>>, queenRow: number, queenColumn: number) {
    let row: number = queenRow;
    let column: number = queenColumn;
    let endReached: boolean = false;
    while (!endReached) {
        if (row < 0 || column < 0) {
            endReached = true;
            break;
        }
        field[row][column] = 1;
        row--;
        column--;
    }
}

export function excludePositionsDiagonalLeftDown(field: Array<Array<number>>, queenRow: number, queenColumn: number) {
    let row: number = queenRow;
    let column: number = queenColumn;
    let endReached: boolean = false;
    while (!endReached) {
        if (row >= rows || column < 0) {
            endReached = true;
            break;
        }
        field[row][column] = 1;
        row++;
        column--;
    }
}

export function excludePositionsDiagonalRightUp(field: Array<Array<number>>, queenRow: number, queenColumn: number) {
    let row: number = queenRow;
    let column: number = queenColumn;
    let endReached: boolean = false;
    while (!endReached) {
        if (row < 0 || column >= columns) {
            endReached = true;
            break;
        }
        field[row][column] = 1;
        row--;
        column++;
    }
}

export function canPlaceQueen(field: Array<Array<number>>, queenRow: number, queenColumn: number): boolean {
    if (field[queenRow][queenColumn] != 0) {
        return false;
    }
    return true;
}

export function placeQueen(field: Array<Array<number>>, queenRow: number, queenColumn: number, excludedField: Array<Array<number>>,) {
    excludePositions(excludedField, queenRow, queenColumn);
    field[queenRow][queenColumn] = 2;
    excludedField[queenRow][queenColumn] = 2;
}

export function queenPlaceFinder(field: Array<Array<number>>, excludedField: Array<Array<number>>) {
    let tries: number = 0;
    let currentSequence: Array<number> = [0, 0, 0, 0, 0, 0, 0];
    let succesfulSequences: Array<Array<Array<number>>> = [];
    const possibilities: number = Math.pow(7,7)
    while (tries < possibilities) {
        let queensPlaced: number = 0;
        let impossible: boolean = false;
        while (!impossible && queensPlaced < 7) {
            currentSequence.forEach(function (number, i) {
                if (canPlaceQueen(excludedField, number, i)) {
                    placeQueen(field, number, i, excludedField);
                    queensPlaced++;
                }else{
                    impossible = true;
                }
            })
        }
        checkIfNQueensFound(queensPlaced, excludedField, succesfulSequences)
        impossible = true;
        tries++;
        incrementNumberArray(currentSequence);
        fill2DArray(field)
        fill2DArray(excludedField)
    }
    printRandomSuccesfulSequence(succesfulSequences, possibilities)
}

export function printRandomSuccesfulSequence(succesfulSequences: Array<Array<Array<number>>>, possibilities: number){
    const randomSequenceIndex: number = Math.floor(Math.random() * (succesfulSequences.length - 0 + 1)) + 0;
    console.log(`\nTotal possible solutions out of %s possibilities: %s`,  possibilities, succesfulSequences.length);
    console.log(`\nShowing possible solution #%s:`,randomSequenceIndex);
    print2DArray(succesfulSequences[randomSequenceIndex])
}

export function checkIfNQueensFound(queensPlaced: number, excludedField: Array<Array<number>>, succesfulSequences: Array<Array<Array<number>>>){
    if(queensPlaced == 7){
        let copiedField: Array<Array<number>>  = create2DArray(rows,columns);
        copyArray(copiedField, excludedField)
        succesfulSequences.push(copiedField)
    }
}

export function copyArray(copyField: Array<Array<number>>, toCopyField: Array<Array<number>>){
    for(let i: number = 0; i < toCopyField.length; i++){
        for(let j: number = 0; j < toCopyField[i].length; j++){
            copyField[i][j] = toCopyField[i][j];
    }
}
}

export function incrementNumberArray(numbers: Array<number>){
    numbers[numbers.length-1]++;
    for(var i: number = numbers.length; i >= 0; i--){
        if(numbers[i] == 7){
            numbers[i] = 0;
            if((i - 1) >= 0 ){
                numbers[i-1]++;
            }
        }
    }
}

function initialize(){
    let field: Array<Array<number>> = create2DArray(rows, columns);
    let excludedField: Array<Array<number>> = create2DArray(rows, columns);
    
    fill2DArray(field);
    fill2DArray(excludedField);
    queenPlaceFinder(field,excludedField);
}

initialize();

