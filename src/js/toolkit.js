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
  }

}

module.exports = matrixToolkit;
