/*
_______
|0|1|2|
|3|4|5|
|6|7|8|
-------
*/

// const P = [
//   // 0 1 2 3 4 5 6 7 8
//     [0,0,0,2,6,0,7,0,1], // 0
//     [6,8,0,0,7,0,0,9,0], // 1
//     [1,9,0,0,0,4,5,0,0], // 2
//     [8,2,0,1,0,0,0,4,0], // 3
//     [0,0,4,6,0,2,9,0,0], // 4
//     [0,5,0,0,0,3,0,2,8], // 5
//     [0,0,9,3,0,0,0,7,4], // 6
//     [0,4,0,0,5,0,0,3,6], // 7
//     [7,0,3,0,1,8,0,0,0], // 8
// ];

// const P = [
//     // 0 1 2 3 4 5 6 7 8
//       [1,0,0,4,8,9,0,0,6], // 0
//       [7,3,0,0,0,0,0,4,0], // 1
//       [0,0,0,0,0,1,2,9,5], // 2
//       [0,0,7,1,2,0,6,0,0], // 3
//       [5,0,0,7,0,3,0,0,8], // 4
//       [0,0,6,0,9,5,7,0,0], // 5
//       [9,1,4,6,0,0,0,0,0], // 6
//       [0,2,0,0,0,0,0,3,7], // 7
//       [8,0,0,5,1,2,0,0,4], // 8
//   ];

// const P = [ [ 3, 1, 6, 5, 7, 8, 4, 9, 2 ],
// [ 5, 2, 9, 1, 3, 4, 7, 6, 8 ],
// [ 4, 8, 7, 6, 2, 9, 5, 3, 1 ],
// [ 2, 6, 3, 0, 1, 5, 9, 8, 7 ],
// [ 9, 7, 4, 8, 6, 0, 1, 2, 5 ],
// [ 8, 5, 1, 7, 9, 2, 6, 4, 3 ],
// [ 1, 3, 8, 0, 4, 7, 2, 0, 6 ],
// [ 6, 9, 2, 3, 5, 1, 8, 7, 4 ],
// [ 7, 4, 5, 0, 8, 6, 3, 1, 0 ] ];

const P = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];

const solve = (p) => {

    const getSquareY = (rowIndex) => Math.floor(rowIndex / 3);
    const getSquareX = (colIndex) => Math.floor(colIndex / 3);

    // Get a square by row and index 
    const getSquare = (rowIndex, colIndex) => {
        const squareY = getSquareY(rowIndex); // row
        const squareX =  getSquareX(colIndex); // col
        const square = [[],[],[]];

        //iterate through rows
        for (let i = 0; i < 3; i++) {
            // iterate through columns
            for (let j = 0; j < 3; j++) {
                square[i].push(p[(squareY * 3) + i][(squareX * 3) + j]);
            }
        }

        return square;
    };

    const getLineYbyCol = (col, beginningColumn) => {
        const line = [];
        for (let i = 0; i < 9; i++) {
            line.push(p[i][col + beginningColumn]);
        }

        return line;
    };

    const getLineXbyRow = (row) => {
        const line = [];
        for (let i = 0; i < 9; i++) {
            line.push(p[row][i]);
        }

        return line;
    };

    const replaceRowWithX = (originalArray, valueToReplace) => originalArray.map(item => (item === valueToReplace ? 'x' : item));
    const replaceColumnWithX = (originalArray, colIndex) => originalArray.map(row => {
        const newRow = [...row]; // Create a copy of the row
        newRow[colIndex] = newRow[colIndex] === 0 ? 'x' : newRow[colIndex]; // Replace the specified column with 'x' if it is a 0
        return newRow;
    });
    const replaceValueIn2DArray = (originalArray, targetValue, replacementValue) => {
        for (let i = 0; i < originalArray.length; i++) {
            for (let j = 0; j < originalArray[i].length; j++) {
                if (originalArray[i][j] === targetValue) {
                    originalArray[i][j] = replacementValue;
                }
            }
        }
    }

    const replaceSquareIntoPuzzle = (arr, rowIndex, colIndex) => {
        const squareY = getSquareY(rowIndex) * 3;
        const squareX = getSquareX(colIndex) * 3;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                p[squareY + i][squareX + j] = arr[i][j];
            }
        }
    };

    function countOccurrences(arr, targetValue) {
        let count = 0;
        
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === targetValue) {
            count++;
          }
        }
      
        return count;
      }

    let it = 0;

    let beginningRow = 0;
    let beginningColumn = 0;

    while (it < 5000) {
        let changed = false;
        let square = getSquare(beginningRow, beginningColumn);
        for (let guess = 1; guess < 10; guess++) {
            if (square.flat().indexOf(guess) === -1) {
                for (let i = 0; i < 3; i++) {
                    const thisRow = getLineXbyRow(i + beginningRow);
                    if (thisRow.indexOf(guess) !== -1) {
                        square[i] = replaceRowWithX(square[i], 0);
                        continue;
                    }
                    for (let j = 0; j < 3; j++) {
                        const thisCol = getLineYbyCol(j, beginningColumn);
                        if (thisCol.indexOf(guess) !== -1) {
                            square = replaceColumnWithX(square, j);
                            continue;
                        }
                    }
                }
            }

            if (countOccurrences(square.flat(), 0) === 1 && square.flat().indexOf(guess) === -1) {
                replaceValueIn2DArray(square, 0, guess);
                changed = true;
            }

            replaceValueIn2DArray(square, 'x', 0);
            replaceSquareIntoPuzzle(square, beginningRow, beginningColumn);
        }
        
        if (it%10 === 0) {
            beginningColumn += 3;

            if (beginningColumn > 6) {
                beginningColumn = 0;
                beginningRow += 3;

                if (beginningRow > 6) {
                    beginningRow = 0;
                }
            }
        }

        if (p.flat().indexOf(0) === -1) break;

        it++;
    }

    console.log('Iterations: ', it);

    for (let i = 0; i < p.length; i++) {
        console.log(p[i].join(' '));
      }
}

solve(P);