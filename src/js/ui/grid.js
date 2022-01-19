const Toolkit = require('../core/toolkit');
// const Generator = require('../core/generator');
const Sudoku = require('../core/soduku');
const Checker = require('../core/checker');
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
    // 测试代码
    // const matrix = sudoku.soluationMatirx;
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

  /*
  * 检查用户解谜结果，成功则进行提示，失败显示错误位置的标记
  */
  check() {
    // 从界面获取检查的数据
    const $rows = this._container.children();
    const data = $rows
          .map((rowIndex, div) => {
            return $(div).children()
                    .map((colIndex, span) => parseInt($(span).text()) || 0)
          })
          .toArray()
          .map($data => $data.toArray());

          console.log(data);
    const checker = new Checker( data );
    if ( checker.check() ) {
      return true;
    }

    // 检查不成功，进行标记
    const marks = checker.matrixMarks;
    this._container.children()
      .each((rowIndex, div) => {
        $(div).children().each((colIndex, span) => {
          const $span = $(span);
          if ( $span.is('.fixed') || marks[rowIndex][colIndex] ) {
            $span.removeClass('error');
          }
          else {
            $span.addClass('error');
          }
        })
      })
  }

  /*
  * 重置当前谜盘到初始状态
  */
  reset() {
    this._container.find('span:not(.fixed)')
      .removeClass('error mark1 mark2')
      .addClass('empty')
      .text(0);
  }

  /*
  * 清除错误标记
  */
  clear() {
    this._container.find('span.error')
      .removeClass('error');
  }

  rebuild() {
    this._container.empty();
    this.build();
    this.layout();
  }

  bindPopup( popupNumbers ) {
    this._container.on('click', 'span', e => {
      const $cell = $(e.target);
      if ( $cell.is('.fixed') ) { return; }
      popupNumbers.popup($cell);
    });
  }
}

module.exports = Grid;
