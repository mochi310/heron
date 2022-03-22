function setup() {
  createCanvas(480,480);
}

function draw() {
  background(153,221,255);
  fill(46,184,46);
  stroke(0);
  strokeWeight(6);

  let C = [
    0,0,0,
    1,0,0,
    1,1,0,
    0,1,0,
    0,0,1,
    1,0,1,
    1,1,1,
    0,1,1,
  ];

  let worldToScreen = (a,b,c) => {
    let x = 60*a - 60*b;
    let y = 30*a + 30*b - 60*c;
    x += width/2;
    y += height/2;
    return [x,y];
  };

  let worldVecToScreen = v => worldToScreen(...v);
  /*worldToScreenの引き数は三つ個別に指定する必要がある、型が配列ではない
  そのため、.map(v => worldToScreen(v))とはできない
  worldToScreen(...v)とすることで、その橋渡しをしている？*/

  let nthVertex = n => {
    let i = 3*n;
    return [C[i+0], C[i+1], C[i+2]];
  };


  let topWorldFace = [nthVertex(4), nthVertex(5), nthVertex(6), nthVertex(7)];
  let rightWorldFace = [nthVertex(1), nthVertex(2), nthVertex(6), nthVertex(5)];
  let leftWorldFace = [nthVertex(2), nthVertex(3), nthVertex(7), nthVertex(6)];
  topScreenFace = topWorldFace.map(worldVecToScreen);
  rightScreenFace = rightWorldFace.map(worldVecToScreen);
  leftScreenFace = leftWorldFace.map(worldVecToScreen);

  quad(...topScreenFace.flat());
  quad(...rightScreenFace.flat());
  quad(...leftScreenFace.flat());

  /*
  map関数（配列の機能）を用いると、配列のすべての要素に対し同じ計算を行えます。

  例:
    let f = x => 7*x;
    [2,3,5].map(f) の計算結果は、 [f(2),f(3),f(5)] = [14,21,35]

  ここでは、それぞれの面にある4つの頂点すべてをスクリーン座標へ変換するために使っています。

  The map function (a feature of JavaScript Array) can be used to perform the same calculation on all elements of an array.
  Here we are using it to convert all four vertices in each face to screen coordinates.

  https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map



  flat関数（配列の機能）を用いると、入れ子になっている配列を平らにできます。

  例:
    [[2,3], [5,7,11], [13]].flat() の計算結果は、[2,3,5,7,11,13]

  ここでは、スクリーン座標の配列をp5.jsのquad関数へ渡すために、flat関数を使って配列を加工しています。
  それだけでは不十分なので、さらにスプレッド構文を使っています。

  The flat function (a feature of JavaScript Array) can be used to flatten a nested array.
  Here, in order to pass the array of screen coordinates to the quad function in p5.js, we are using the flat function to process the array.
  Yet that's not enough, so we use the Spread Syntax.

  https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
  https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  */
}
