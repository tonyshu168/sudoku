const Toolkit = require('./toolkit');

/*
* 检查数独解决方案
*/
function checkArray( arr ) {
  const length = arr.length,
        marks = new Array(length);
  
  marks.fill( true );

  for ( let i = 0; i < length - 1; i++ ) {
    if ( !marks[i] ) { continue; }

    const value = arr[i];

    // 是否有效， 0：无效， 1-9: 有效
    if ( !value ) {
      marks[i] = false;
      continue;
    }

    // 是否有重复: i + 1 ~ 9, 是否和 i 位置数据重复
    for (let j = i + 1; j < length; j++ ) {
      if ( value === arr[j] ) {
        marks[i] = marks[j] = false;
      }
    }
  }

  return marks;
}

// console.log(checkArray([1, 2, 3, 4, 5, 6, 7, 8, 9]));
// console.log(checkArray([1, 2, 3, 4, 0, 6, 7, 8, 9]));
// console.log(checkArray([1, 2, 3, 4, 5, 6, 2, 8, 9]));

/*
* @params matrix: 用户完成的数独数据，9 x 9
* 处理: 对matrix行，列，宫进行检查，并填写marks
* 输出: 检查是否成功，marks
*/
class Checker {
  constructor( matrix ) {
    this._matrix = matrix;
    this._matrixMarks = Toolkit.matrix.createMatrix(true);
    this._success = false;
  }

  get matrixMarks() {
    return this._matrixMarks;
  }

  get isSuccess() {
    return this._success;
  }

  check() {
    this.checkRows();
    this.checkCols();
    this.checkBoxes();

    // 检查是否成功
    this._success = this._matrixMarks.every(row => {
      row.every(mark => mark);
    });

    return this._success;
  }

  checkRows() {
    for ( let rowIndex = 0, len = this._matrix.length; rowIndex < len; rowIndex++ ) {
      const row = this._matrix[rowIndex];
      const marks = checkArray( row );

      for ( let colIndex = 0, length = marks.length; colIndex < length; colIndex++ ) {
        if ( !marks[colIndex] ) {
          this._matrixMarks[rowIndex][colIndex];
        }
      }
    }
  }

  checkCols() {
    for ( let colIndex = 0, len = this._matrix.length; colIndex < len; colIndex++ ) {
      const cols = [];

      for ( let rowIndex = 0, length = this._matrix.length; rowIndex < length; rowIndex++ ) {
        cols[rowIndex] = this._matrix[rowIndex][colIndex];
      }

      const marks = checkArray(cols);

      for ( let rowIndex = 0, length = marks.length; rowIndex < length; rowIndex++ ) {
        if ( !marks[rowIndex] ) {
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }

  checkBoxes() {
    for ( let boxIndex = 0, len = this._matrix.length; boxIndex < len; boxIndex++ ) {
      const boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex);
      const marks = checkArray( boxes );

      for ( let cellIndex = 0, length = marks.length; cellIndex < length; cellIndex++ ) {
        if ( !marks[cellIndex] ) {
          const { rowIndex, colIndex} = 
            Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex);
          this._matrixMarks[rowIndex][colIndex] = false;
        }
      }
    }
  }
}

const Generator = require('./generator');
const gen = new Generator();
gen.generate();
const matrix = gen.matrix;

const checker = new Checker(matrix);
console.log('check result: ', checker.check());
console.log(checker.matrixMarks);

matrix[1][1] = 0;
// matrix[2][3] = matrix[3][5] = 5;
const checker2 = new Checker(matrix);
console.log('check2 result: ', checker2.check());
console.log(checker2.matrixMarks);
