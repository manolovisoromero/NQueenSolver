"use strict";
const assert = require('assert');
const solver = require('../nqueensolver');
describe('N*queen solver  tests', () => {
    it('should create 7*7 array', () => {
        let field = solver.create2DArray(7, 7);
        assert.equal(field.length, 7);
        field.forEach((row) => {
            assert.equal(row.length, 7);
        });
    });
    it('should fill 2d array', () => {
        let field = solver.create2DArray(7, 7);
        solver.fill2DArray(field);
        field.forEach(element => {
            element.forEach(element => {
                assert.equal(element, 0);
            });
        });
    });
    it('should exclude vertical positions', () => {
        let field = solver.create2DArray(7, 7);
        solver.fill2DArray(field);
        const testColumn = 2;
        solver.excludePositionsVertical(field, testColumn);
        field.forEach(element => {
            assert.equal(element[testColumn], 1);
        });
    });
    it('should exclude horizontal positions', () => {
        let field = solver.create2DArray(7, 7);
        solver.fill2DArray(field);
        const testRow = 4;
        solver.excludePositionsHorizontal(field, testRow);
        for (let i = 0; i < 7; i++) {
            assert.equal(field[testRow][i], 1);
        }
    });
    it('should exclude positions right down of queen', () => {
        let field = solver.create2DArray(7, 7);
        solver.fill2DArray(field);
        let queenRow = 2;
        let queenColumn = 2;
        solver.excludePositionsDiagonalRightDown(field, queenRow, queenColumn);
        solver.print2DArray(field);
        assert.equal(field[3][3], 1);
        assert.equal(field[4][4], 1);
        assert.equal(field[5][5], 1);
        assert.equal(field[6][6], 1);
    });
    it('should exclude positions left down of queen', () => {
        let field = solver.create2DArray(7, 7);
        solver.fill2DArray(field);
        let queenRow = 2;
        let queenColumn = 2;
        solver.excludePositionsDiagonalLeftDown(field, queenRow, queenColumn);
        solver.print2DArray(field);
        assert.equal(field[3][1], 1);
        assert.equal(field[4][0], 1);
    });
    it('should exclude positions right up of queen', () => {
        let field = solver.create2DArray(7, 7);
        solver.fill2DArray(field);
        let queenRow = 4;
        let queenColumn = 3;
        solver.excludePositionsDiagonalRightUp(field, queenRow, queenColumn);
        assert.equal(field[3][4], 1);
        assert.equal(field[2][5], 1);
        assert.equal(field[1][6], 1);
    });
    it('should exclude positions left up of queen', () => {
        let field = solver.create2DArray(7, 7);
        solver.fill2DArray(field);
        let queenRow = 2;
        let queenColumn = 3;
        solver.excludePositionsDiagonalLeftUp(field, queenRow, queenColumn);
        assert.equal(field[1][2], 1);
        assert.equal(field[0][1], 1);
    });
    it('should copy all contents to another array (copy without reference to old object)', () => {
        let field = solver.create2DArray(7, 7);
        let copiedField = solver.create2DArray(7, 7);
        solver.fill2DArray(field);
        solver.copyArray(copiedField, field);
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 7; j++) {
                assert.equal(field[i][j], copiedField[i][j]);
            }
        }
    });
    it('should increment array of numbers as if it were 1 number ( [0,9] -> [1,0] -> [1,1] )', () => {
        let testSequence = [0, 0, 0, 0, 0, 0, 0];
        solver.incrementNumberArray(testSequence);
        assert.equal(testSequence[6], 1);
        solver.incrementNumberArray(testSequence);
        assert.equal(testSequence[6], 2);
    });
    it('should place queen in right place', () => {
        let field = solver.create2DArray(7, 7);
        let excludedField = solver.create2DArray(7, 7);
        solver.fill2DArray(field);
        solver.fill2DArray(excludedField);
        let queenRow = 2;
        let queenColumn = 2;
        solver.placeQueen(field, queenRow, queenColumn, excludedField);
        assert.equal(field[queenRow][queenColumn], 2);
        assert.equal(excludedField[queenRow][queenColumn], 2);
    });
    it('should return true when  possible and false when not', () => {
        let field = solver.create2DArray(7, 7);
        solver.fill2DArray(field);
        let queenRow = 2;
        let queenColumn = 2;
        solver.excludePositions(field, queenRow, queenColumn);
        assert.equal(solver.canPlaceQueen(field, queenRow, queenColumn), false);
        assert.equal(solver.canPlaceQueen(field, 3, 4), true);
    });
    it('should only add a success and succesful sequence when 7 queens have been placed', () => {
        let field = solver.create2DArray(7, 7);
        let succesfulSequences = [];
        solver.fill2DArray(field);
        solver.checkIfNQueensFound(7, field, succesfulSequences);
        assert.equal(succesfulSequences.length, 1);
        solver.checkIfNQueensFound(6, field, succesfulSequences);
        assert.equal(succesfulSequences.length, 1);
    });
});
