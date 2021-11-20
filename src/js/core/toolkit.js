/*
* 矩阵和数组相关工具
*/
const matrixToolkit = {
  createRow( val = 0 ) {
    const array = new Array(9);
    array.fill(val);
    return array;
  },
  
  createMatrix( v = 0 ) {
    return Array.from({ length: 9 }, () => this.createRow(v));
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
  checkFillable() {
    return true;
  }
}

/*
* 宫坐标工具
*/
const boxToolkit = {

};

// 工具集

module.exports = class Toolkit {
  // 矩阵和数据相关的工具
  static get matrix() {
    return matrixToolkit;
  }

  // 宫坐标系相关工具
  static box() {
    return boxToolkit;
  }
};
