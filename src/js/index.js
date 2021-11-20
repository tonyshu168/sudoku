const toolkit = require('./toolkit');

const matrix = toolkit.createMatrix();
console.log(matrix);

const arr  = Array.from({length: 9}, (v, i) => i);
console.log(arr);
console.log(toolkit.shuffle(arr));