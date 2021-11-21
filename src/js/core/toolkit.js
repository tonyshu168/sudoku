const MAX_LENGTH = 9;

/*
* 矩阵和数组相关工具
*/
const matrixToolkit = {
  createRow( val = 0 ) {
    const array = new Array(MAX_LENGTH);
    array.fill(val);
    return array;
  },
  
  createMatrix( v = 0 ) {
    return Array.from({ length: MAX_LENGTH }, () => this.createRow(v));
  },

  shuffle( arr ) {
    const endIndex = arr.length - 2;
  
    for ( let i = 0; i <= endIndex; i++ ) {
      const j = i + Math.floor(Math.random() * (arr.length - i));
  
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  
    return Array;
  },

  // 检查指定位置是否可填写数字 n
  checkFillable(matrix, n, rowIndex, colIndex) {
    const row = matrix[rowIndex];
    const column = this.createRow().map((v, i) => matrix[i][colIndex]);
    const { boxIndex } = boxToolkit.convertToBoxIndex(rowIndex, colIndex);
    const box = boxToolkit.getBoxCells(matrix, boxIndex);

    for ( let i = 0; i < MAX_LENGTH; i++ ) {
      if ( row[i] === n || column[i] === n || box[i] === n ) { return false; }
    }
    
    return true;
  }
}

/*
* 宫坐标工具
*/
const boxToolkit = {
  getBoxCells( matrix, boxIndex ) {
    const startRowIndex = Math.floor(boxIndex / 3) * 3,
          startColIndex = boxIndex % 3 * 3;
          result = [];

    for ( let cellIndex = 0; cellIndex < MAX_LENGTH; cellIndex++ ) {
      const rowIndex = startRowIndex + Math.floor(cellIndex / 3),
            colIndex = startColIndex + cellIndex % 3;
      
      result.push(matrix[rowIndex][colIndex]);
    }

    return result;
  },

  convertToBoxIndex( rowIndex, colIndex ) {
    return {
      boxIndex: Math.floor(rowIndex /3 ) * 3 + Math.floor(colIndex / 3),
      cellIndex: rowIndex % 3 * 3 + colIndex % 3
    }
  },
  
  convertFromBoxIndex( boxIndex, cellIndex ) {
    return {
      rowIndex: Math.floor(boxIndex /3) * 3 + Math.floor(cellIndex / 3),
      colIndex: boxIndex % 3 * 3 + cellIndex % 3
    }
  }
};

// 工具集

module.exports = class Toolkit {
  // 矩阵和数据相关的工具
  static get matrix() {
    return matrixToolkit;
  }

  // 宫坐标系相关工具
  static get box() {
    return boxToolkit;
  }
};
