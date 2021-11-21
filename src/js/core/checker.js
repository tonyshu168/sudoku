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

console.log(checkArray([1, 2, 3, 4, 5, 6, 7, 8, 9]));
console.log(checkArray([1, 2, 3, 4, 0, 6, 7, 8, 9]));
console.log(checkArray([1, 2, 3, 4, 5, 6, 2, 8, 9]));