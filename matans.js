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
  /*worldToScreen�̈������͎O�ʂɎw�肷��K�v������A�^���z��ł͂Ȃ�
  ���̂��߁A.map(v => worldToScreen(v))�Ƃ͂ł��Ȃ�
  worldToScreen(...v)�Ƃ��邱�ƂŁA���̋��n�������Ă���H*/

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
  map�֐��i�z��̋@�\�j��p����ƁA�z��̂��ׂĂ̗v�f�ɑ΂������v�Z���s���܂��B

  ��:
    let f = x => 7*x;
    [2,3,5].map(f) �̌v�Z���ʂ́A [f(2),f(3),f(5)] = [14,21,35]

  �����ł́A���ꂼ��̖ʂɂ���4�̒��_���ׂĂ��X�N���[�����W�֕ϊ����邽�߂Ɏg���Ă��܂��B

  The map function (a feature of JavaScript Array) can be used to perform the same calculation on all elements of an array.
  Here we are using it to convert all four vertices in each face to screen coordinates.

  https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map



  flat�֐��i�z��̋@�\�j��p����ƁA����q�ɂȂ��Ă���z��𕽂�ɂł��܂��B

  ��:
    [[2,3], [5,7,11], [13]].flat() �̌v�Z���ʂ́A[2,3,5,7,11,13]

  �����ł́A�X�N���[�����W�̔z���p5.js��quad�֐��֓n�����߂ɁAflat�֐����g���Ĕz������H���Ă��܂��B
  ���ꂾ���ł͕s�\���Ȃ̂ŁA����ɃX�v���b�h�\�����g���Ă��܂��B

  The flat function (a feature of JavaScript Array) can be used to flatten a nested array.
  Here, in order to pass the array of screen coordinates to the quad function in p5.js, we are using the flat function to process the array.
  Yet that's not enough, so we use the Spread Syntax.

  https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
  https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  */
}
