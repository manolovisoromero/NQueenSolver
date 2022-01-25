"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incrementNumberArray = exports.copyArray = exports.checkIfNQueensFound = exports.printRandomSuccesfulSequence = exports.queenPlaceFinder = exports.placeQueen = exports.canPlaceQueen = exports.excludePositionsDiagonalRightUp = exports.excludePositionsDiagonalLeftDown = exports.excludePositionsDiagonalLeftUp = exports.excludePositionsDiagonalRightDown = exports.excludePositionsHorizontal = exports.excludePositionsVertical = exports.excludePositions = exports.print2DArray = exports.fill2DArray = exports.create2DArray = void 0;
const rows = 7;
const columns = 7;
function create2DArray(rows, columns) {
    let tempArray = [];
    for (let i = 0; i < rows; i++) {
        tempArray[i] = new Array(columns);
    }
    return tempArray;
}
exports.create2DArray = create2DArray;
;
function fill2DArray(field) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            field[i][j] = 0;
        }
    }
}
exports.fill2DArray = fill2DArray;
;
function print2DArray(field) {
    for (let i = 0; i < field.length; i++) {
        console.log(...field[i]);
    }
}
exports.print2DArray = print2DArray;
function excludePositions(excludedField, queenRow, queenColumn) {
    excludePositionsDiagonalLeftDown(excludedField, queenRow, queenColumn);
    excludePositionsDiagonalLeftUp(excludedField, queenRow, queenColumn);
    excludePositionsHorizontal(excludedField, queenRow);
    excludePositionsVertical(excludedField, queenColumn);
    excludePositionsDiagonalRightDown(excludedField, queenRow, queenColumn);
    excludePositionsDiagonalRightUp(excludedField, queenRow, queenColumn);
}
exports.excludePositions = excludePositions;
function excludePositionsVertical(field, queenColumn) {
    for (let i = 0; i < rows; i++) {
        field[i][queenColumn] = 1;
    }
}
exports.excludePositionsVertical = excludePositionsVertical;
function excludePositionsHorizontal(field, queenRow) {
    for (let i = 0; i < columns; i++) {
        field[queenRow][i] = 1;
    }
}
exports.excludePositionsHorizontal = excludePositionsHorizontal;
function excludePositionsDiagonalRightDown(field, queenRow, queenColumn) {
    let row = queenRow;
    let column = queenColumn;
    let endReached = false;
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
exports.excludePositionsDiagonalRightDown = excludePositionsDiagonalRightDown;
function excludePositionsDiagonalLeftUp(field, queenRow, queenColumn) {
    let row = queenRow;
    let column = queenColumn;
    let endReached = false;
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
exports.excludePositionsDiagonalLeftUp = excludePositionsDiagonalLeftUp;
function excludePositionsDiagonalLeftDown(field, queenRow, queenColumn) {
    let row = queenRow;
    let column = queenColumn;
    let endReached = false;
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
exports.excludePositionsDiagonalLeftDown = excludePositionsDiagonalLeftDown;
function excludePositionsDiagonalRightUp(field, queenRow, queenColumn) {
    let row = queenRow;
    let column = queenColumn;
    let endReached = false;
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
exports.excludePositionsDiagonalRightUp = excludePositionsDiagonalRightUp;
function canPlaceQueen(field, queenRow, queenColumn) {
    if (field[queenRow][queenColumn] != 0) {
        return false;
    }
    return true;
}
exports.canPlaceQueen = canPlaceQueen;
function placeQueen(field, queenRow, queenColumn, excludedField) {
    excludePositions(excludedField, queenRow, queenColumn);
    field[queenRow][queenColumn] = 2;
    excludedField[queenRow][queenColumn] = 2;
}
exports.placeQueen = placeQueen;
function queenPlaceFinder(field, excludedField) {
    let tries = 0;
    let currentSequence = [0, 0, 0, 0, 0, 0, 0];
    let succesfulSequences = [];
    const possibilities = Math.pow(7, 7);
    while (tries < possibilities) {
        let queensPlaced = 0;
        let impossible = false;
        while (!impossible && queensPlaced < 7) {
            currentSequence.forEach(function (number, i) {
                if (canPlaceQueen(excludedField, number, i)) {
                    placeQueen(field, number, i, excludedField);
                    queensPlaced++;
                }
                else {
                    impossible = true;
                }
            });
        }
        checkIfNQueensFound(queensPlaced, excludedField, succesfulSequences);
        impossible = true;
        tries++;
        incrementNumberArray(currentSequence);
        fill2DArray(field);
        fill2DArray(excludedField);
    }
    printRandomSuccesfulSequence(succesfulSequences, possibilities);
}
exports.queenPlaceFinder = queenPlaceFinder;
function printRandomSuccesfulSequence(succesfulSequences, possibilities) {
    const randomSequenceIndex = Math.floor(Math.random() * (succesfulSequences.length - 0 + 1)) + 0;
    console.log(`\nTotal possible solutions out of %s possibilities: %s`, possibilities, succesfulSequences.length);
    console.log(`\nShowing possible solution #%s:`, randomSequenceIndex);
    print2DArray(succesfulSequences[randomSequenceIndex]);
}
exports.printRandomSuccesfulSequence = printRandomSuccesfulSequence;
function checkIfNQueensFound(queensPlaced, excludedField, succesfulSequences) {
    if (queensPlaced == 7) {
        let copiedField = create2DArray(rows, columns);
        copyArray(copiedField, excludedField);
        succesfulSequences.push(copiedField);
    }
}
exports.checkIfNQueensFound = checkIfNQueensFound;
function copyArray(copyField, toCopyField) {
    for (let i = 0; i < toCopyField.length; i++) {
        for (let j = 0; j < toCopyField[i].length; j++) {
            copyField[i][j] = toCopyField[i][j];
        }
    }
}
exports.copyArray = copyArray;
function incrementNumberArray(numbers) {
    numbers[numbers.length - 1]++;
    for (var i = numbers.length; i >= 0; i--) {
        if (numbers[i] == 7) {
            numbers[i] = 0;
            if ((i - 1) >= 0) {
                numbers[i - 1]++;
            }
        }
    }
}
exports.incrementNumberArray = incrementNumberArray;
function initialize() {
    let field = create2DArray(rows, columns);
    let excludedField = create2DArray(rows, columns);
    fill2DArray(field);
    fill2DArray(excludedField);
    queenPlaceFinder(field, excludedField);
}
initialize();
