/**
 * 2次元ベクトルのクラス。
 * A 2D Vector Class.
 */
class Vec2 {
  /**
   * @param {number}
   * @param {number}
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  /**
   * @param {Vec2} b 足したいベクトル
   */
  add(b) {
    let a = this;
    return new Vec2(a.x+b.x, a.y+b.y);
  }
  /**
   * @param {Vec2} b 引きたいベクトル
   */
  sub(b) {
    let a = this;
    return new Vec2(a.x-b.x, a.y-b.y);
  }
  /**
   * @param {number} s ベクトルにかけたい実数
   */
  mul(s) {
    return new Vec2(s*this.x, s*this.y);
  }
  /**
   * @param {number} s この実数でベクトルを割る
   */
  div(s) {
    return new Vec2(this.x/s, this.y/s);
  }
  /**
   * @param {Vec2} v このベクトルとドット積をとる
   */
  dot(b) {
    let a = this;
    return a.x*b.x + a.y*b.y;
  }
  /**
   * @returns ベクトルの大きさ（成分のユークリッド距離）
   */
  mag() {
    return sqrt(this.x ** 2 + this.y ** 2);
  }
  /**
   * @param {number} rad 回転させたい角度。単位はラジアン。
   */
  rotate(rad) {
    return new Vec2(
      this.x*cos(rad) - this.y*sin(rad),
      this.x*sin(rad) + this.y*cos(rad)
    );
  }
  /**
   * @returns 正規化されたベクトル
   */
  norm() {
    return this.mul(1/this.mag());
  }
  copy() {
    return new Vec2(this.x, this.y);
  }
  /**
   * @param {Vec2} b このベクトルと成分が等しいか否かを返す
   */
  eq(b) {
    let a = this;
    return a.x === b.x && a.y === b.y;
  }
}

function setup() {
  createCanvas(480,480);
}

function draw() {
  background(204,204,255);
  noFill();
  stroke(153,51,0);
  strokeWeight(6);

  //----- 地形を描画 Draw a terrain
  let f = x => 4/5*(x**4) + 3/2*(x**3);
  let fd = x => 16/5*(x**3) + 9/2*(x**2);
  // s(step)を小さくすると、地形が荒くなります。
  let s = 1/24;
  for(let x=-2; x<0.6; x+=s) {
    // (x-s, f(x-s)) から (x,f(x)) へ線を引きたい。
    let p = [x-s, f(x-s), x, f(x)];
    // ただしグラフの座標はキャンバスに対して小さすぎるので、
    // 適当に並行移動・拡大縮小してキャンバスに収める。
    p = p.map(a => a+1.75);
    p = p.map(a => 180*a);
    // やっと描画できる。 Now I can draw it finally.
    strokeWeight(3);
    line(...p);

    // 斜め上から見ているような感じにする
    line(p[0], p[1]+90, p[2], p[3]+90);
    strokeWeight(1);
    line(p[0], p[1], p[0], p[1]+90);
  }

  //----- プレイヤーを描画。 Draw a player.
  strokeWeight(24);
  let m = (mouseX/180)-1.75;//グラフは1.75倍に平行移動、180倍に拡張されてるから
  //mの値はおよそー２～２
  let bodyVec = new Vec2(1, fd(m)).norm().mul(30).rotate(-PI/2);
  line(mouseX, mouseY, mouseX + bodyVec.x, mouseY + bodyVec.y);

  //----- スケボーを描画。 Draw skateboards.
  strokeWeight(6);
  let drawBoard = yOffset => {
    let boardBack = new Vec2(1,fd(m)).norm().mul(30);
    line(mouseX, mouseY+yOffset, mouseX+boardBack.x, mouseY+boardBack.y+yOffset);
    let boardFront = boardBack.rotate(PI);
    line(mouseX, mouseY+yOffset, mouseX+boardFront.x, mouseY+boardFront.y+yOffset);
  }
  drawBoard(0);
  drawBoard(12);
}
