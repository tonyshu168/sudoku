/*
* 生成数独解决方案
*/
const Toolkit = require('./toolkit');

class Generator {
  generate() {
    this.matrix = Toolkit.matrix.createMatrix();

    for ( let i = 1; i <= 9; i++ ) {
      this.fillNumber(n);
    }
  }

  fillNmber(n) {
    this.fillRow(n, 0);
  }

  fillRow(n, rowIndex) {
    if ( rowIndex > 8 ) { return true; }

    const row = this.matrix[rowIndex];

    for ( let i = 0; i < 9; i++ ) {
      const colIndex = i;
      // 如果这个位置已经有值，跳过
      if ( row[colIndex] ) { continue; }

      // 检查这个位置是否可以填写 n
      if ( !Toolkit.matrix.checkFillable() ) { continue; }

      row[colIndex] = n;

      // 去下一行填写 n, 如果没填进去，就继续寻找当前行下一个位置
      if ( !this.fillRow(n, rowIndex + 1) ) {
        row[colIndex] = 0;
        continue;
      }

      return true;
    }

    // 如果上面都没有填写成功，则返回false
    return false;
  }
}