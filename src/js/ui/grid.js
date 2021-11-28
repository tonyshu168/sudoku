const Toolkit = require('../core/toolkit');
// const Generator = require('../core/generator');
const Sudoku = require('../core/soduku');
/*
* 生成发九宫格
*/
class Grid {
  constructor( container ) {
    this._container = container;
  }

  build() {
    // const generateor = new Generator();
    // generateor.generate();

    // const matrix = generateor.matrix;
    const sudoku = new Sudoku();
    sudoku.make();
    const matrix = sudoku.puzzleMatrix;

    const rowGroupClasses = ['row_g_top', 'row_g_middle', 'row_g_bottom'];
    const colGroupClasses = ['col_g_left', 'col_g_center', 'col_g_right'];

    const $cells = matrix.map(rowValues => rowValues.map((cellValue, idx) => {
      return $('<span>')
        .addClass(colGroupClasses[idx % 3])
        .addClass(cellValue ? 'fixed' : 'empty')
        .text(cellValue);
    }));

    const $divArray = $cells.map(($spanArray, idx) => {
      return $('<div>')
        .addClass('row')
        .addClass(rowGroupClasses[idx % 3])
        .append($spanArray);
    });

    this._container.append($divArray);

    return this;
  }

  layout() {
    const width = $('span:first', this._container).width();
    $('span', this._container)
      .height(width)
      .css({
        'line-height': `${width}px`,
        'font-size': width < 32 ? `${width /2 }px` : ''
      });

    return this;
  }

  bindPopup( popupNumbers ) {
    this._container.on('click', 'span', e => {
      const $cell = $(e.target);
      popupNumbers.popup($cell);
    });
  }
}

module.exports = Grid;
