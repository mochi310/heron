let gBoard = [
  [0,0,0,0,0,0,0,0,],
  [0,0,0,0,2,0,0,0,],
  [0,0,0,0,2,0,0,0,],
  [0,0,0,1,2,0,0,0,],
  [0,0,0,2,1,0,0,0,],
  [0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,],
];

// とりあえずひっくり返すまでを実装した
// ここまで自力でやってみる
// 分からなくなったら、もう答え見て、また自力でやる

let rayToCoords = (x,y, way1,way2) => {
  let areaContains = (x,y) => x>=0 && x<8 && y>=0 && y<8;
  let coords = [];
  //ボード上を外れるまで、八方向ずつ足し続ける
  while(areaContains(x,y)) {
    coords.push([x,y]);
    x += way1;
    y += way2;
    // console.log(coords);
  }
  return coords;
}
//
let coordsToDisks = (coords, board) => coords.map(c => board[c[1]][c[0]]);
//
let nFlippable = (disk, vec) => {
  //配列の長さが二以下だと、ひっくり返せない
  //または０番目に石が置かれてると、そもそも置けない
  if (vec.length <= 2 || vec[0] !== 0) return 0;
  for(let i=1; i<vec.length; i++) {
    //石が置かれてなかったら、ひっくり返せる石がないから終わり
    if (vec[i] === 0) {
      return 0;
      //自分の色の石が見つかったら、ひっくり返せないから
      //そこまでひっくり返せる数を返す
      //ループした数がそのまま、ひっくり返せる数になる
    } else if (vec[i] === disk) {
      return i-1;
    }
  }
}
//
let coordsFlippable = (disk, x, y, board) => [...new Array(8).keys()]
  //[[0,1],[1,1],[-1,1][0,-1]...]みたいに八方向を表現する
  .map(n => [round(cos(n*PI/4)), round(sin(n*PI/4))])
  //八方向ずつ、ボード上を外れるまで足し続る
  //そしてその八つの配列が格納されてるものがcoords
  .map(way => rayToCoords(x,y,way[0],way[1]))
  //sliceは、第一から第二引数で指定した範囲以外の要素を取り除く
  //つまり、始点と終点だけになる？
  //ex.[[1,2], [4,5]]
  .map(coords => coords.slice(
      1, 1+nFlippable(disk, coordsToDisks(coords, board))))
  .flat();
//
function setup() {
  createCanvas(480,480);
}

function draw() {
  background(102,153,0);
  stroke(34,51,0);
  strokeWeight(3);
  noFill();

  for(let y=0; y<8; y++) {
    for(let x=0; x<8; x++) {
      let d = gBoard[y][x];
      if (d === 0) noFill();
      if (d === 1) fill(0);
      if (d === 2) fill(255);
      let w = width/8;
      circle(w*x+w/2, w*y+w/2, w);
    }
  }

  let w = width / 8;
  let x = floor(mouseX / w);
  let y = floor(mouseY / w);
  let disk = 1;
  let board = gBoard;

  // console.log([...new Array(8).keys()]
  // .map(n => [round(cos(n*PI/4)), round(sin(n*PI/4))])
  // .map(way => rayToCoords(x,y,way[0],way[1]))
  // .map(coords => coords.slice(
  //     1, 1+nFlippable(disk, coordsToDisks(coords, board))))
  // );

  console.log([...Array(8).keys()]
  .map(n => [round(cos(n * PI/4)), round(sin(n * PI/4))])
  .map(way => rayToCoords(x, y, way[0], way[1])));
}

function mousePressed() {
  let w = width / 8;
  let x = floor(mouseX / w);
  let y = floor(mouseY / w);

  let coords = coordsFlippable(1, x, y, gBoard);
  //coordsにはひっくり返した座標が入っている
  //つまり、coordsFlippableは、ひっくり返す座標を格納した配列を返す
  // console.log(coords);
  if (coords.length === 0) return;

//c[1]って[マウスのⅹ座標,ｙ座標]？
//例えば、gBoard[[3,3], 1]とかになりそうだけど、どういうこと？
//黒色にひっくり返す処理
  for(let c of [...coords, [x,y]]){
    //c[1]c[0]には置く場所とひっくり返す場所の座標が入る
    //まず...coordsの[[x,y], [x,y],[x,y]...]を、c[1]c[0]に代入し、
    //最後に、第二引数の[x, y]を、c[1]c[0]を代入
    //[...配列a, 配列b]はたぶん、自動でflat関数みたいになるのかも

    //ここで、黒にひっくり返す
    gBoard[c[1]][c[0]] = 1;
  }
}
