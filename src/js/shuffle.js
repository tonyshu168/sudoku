/*
* Fisher-yates洗牌算法
*/
function shuffle( arr ) {
  const endIndex = arr.length - 2;

  for ( let i = 0; i <= endIndex; i++ ) {
    const j = i + Math.floor(Math.random() * (arr.length - i));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return Array;
}