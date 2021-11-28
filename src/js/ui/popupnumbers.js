/*
* 处理弹出的操作面板
*/
// cell -- (click) -- popup 
// popup -- (click) -- n -- (fill) -- cell
module.exports = class PopupNumbers {
  constructor( $panel ) {
    this._$panel = $panel.hide().removeClass('hidden');

    this._$panel.on('click', 'span', e => {
      const $cell = this._$targetCall;

      const $span = $(e.target || e.srcElement);
      
      // mark1, mark2回填样式
      if ( $span.hasClass('mark1') ) {
        $cell.hasClass('mark1') ? $cell.removeClass('mark1') : $cell.removeClass('mark2').addClass('mark1');
      }
      else if ( $span.hasClass('mark2') ) {
        $cell.hasClass('mark2') ? $cell.removeClass('mark2') : $cell.removeClass('mark1').addClass('mark2');
      }
      // empty,取消数字填写，取消mark
      else if ( $span.hasClass('empty') ) {
        $cell.text(0).addClass('empty');
      }
      // 1-9,回填数字
      else {
        $cell.text($span.text()).removeClass('empty');
      }

      this.hide();
    });
  }

  popup( $cell ) {
    this._$targetCall = $cell;
    const { left, top } = $cell.position();
    this._$panel
      .css({
        left: `${left}px`,
        top: `${top}px`
      })
      .show();
  }

  hide() {
    this._$panel.hide();
  }
}