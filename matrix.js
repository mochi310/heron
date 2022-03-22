function setup(){
  createCanvas(480, 480);
}

function draw() {
  background(153,221,255);
  fill(46,184,46);
  stroke(0);
  strokeWeight(6);

  let c = [
    0, 0, 3,
    0, 1, 1,
    1, 1, 1,
    1, 0, 1,
    1, 0, 0,
    0, 1, 0,
    1, 1, 0,
    1, 1, 1,
  ];

  let worldToScreen = (a, b, c) => {
    let x = 60 * a + -60 * b + 0 * c;
    let y = 30 * a + 30 * b + -60 * c;
    x += width / 2;
    y += height / 2;
    return [x, y];
  }

  let worldVecToScreen = v => worldToScreen(...v);

  let nthVertex = (i) => {
    let a = i * 3;
    return [c[a], c[a + 1], c[a + 2]];
  }

  //let A = [worldToScreen(nthVertex(0)), worldToScreen(nthVertex(1)), worldToScreen(nthVertex(2)), worldToScreen(nthVertex(3))];
  for(let x = 0; x < 4; x++){
    for(let y = 0; y < 4; y++){
      let mat1 = [(nthVertex(0)), (nthVertex(1)), (nthVertex(2)), (nthVertex(3))];
      mat1 = mat1.map(v => [v[0] + x, v[1] + y, v[2]]);
      let Mat1 = mat1.map(v => worldToScreen(v[0], v[1], v[2]));
      //a.map(v => worldToScreen(v))
      //a.map(worldVecToScreen);
      quad(...Mat1.flat());
      let mat2 = [nthVertex(1), nthVertex(5), nthVertex(6), nthVertex(7)];
      mat2 = mat2.map(v => [v[0] + x, v[1] + y, v[2]]);
      let Mat2 = mat2.map(v => worldToScreen(v[0], v[1], v[2]));
      //A = [worldToScreen(c[3], c[4], c[5]), worldToScreen(c[15], c[16], c[17]), worldToScreen(c[18], c[19], c[20]), worldToScreen(c[21], c[22], c[23])];
      quad(...Mat2.flat());
      let mat3 = [nthVertex(3), nthVertex(4), nthVertex(6), nthVertex(7)];
      mat3 = mat3.map(v => [v[0] + x, v[1] + y, v[2]]);
      let Mat3 = mat3.map(v => worldToScreen(v[0], v[1], v[2]));
      quad(...Mat3.flat());
    }
  }
}
