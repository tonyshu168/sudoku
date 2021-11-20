const toolkit = require('./toolkit');

// const matrix = toolkit.createMatrix();
// console.log(matrix);

// const arr  = Array.from({length: 9}, (v, i) => i);
// console.log(arr);
// console.log(toolkit.shuffle(arr));

class Grid {
  constructor( container ) {
    this._container = container;
  }

  build() {
    const matrix = toolkit.createMatrix();
    const rowGroupClasses = ['row_g_top', 'row_g_middle', 'row_g_bottom'];
    const colGroupClasses = ['col_g_left', 'col_g_center', 'col_g_right'];

    const $cells = matrix.map(rowValues => rowValues.map((cellValue, idx) => {
      return $('<span>')
        .addClass(colGroupClasses[idx % 3])
        .text(cellValue);
    }));

    const $divArray = $cells.map(($spanArray, idx) => {
      return $('<div>')
        .addClass('row')
        .addClass(rowGroupClasses[idx % 3])
        .append($spanArray);
    });

    this._container.append($divArray);
  }
}

new Grid($('#container')).build();
