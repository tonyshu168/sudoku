function createRow( val = 0 ) {
  const array = new Array(9);
  array.fill(val);
  return array;
}

function createMatrix( v = 0 ) {
  return Array.from({ length: 9 }, () => createRow(v));
}

export default createMatrix;
