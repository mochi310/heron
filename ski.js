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
  background(144, 155, 144);
  stroke(140, 205, 130);


  let f = x => 4/5 * (x**4) + 3/2 * (x**3);
  let fd = x => 16/5 * (x**3) + 9/2 * (x**2);
  let s = 1 / 24;

  for(let x = -2; x < 0.6; x += s){
    let p = [x + s, f(x + s), x, f(x)];
    p = p.map(a => a + 1.75);
    p = p.map(a => a * 180);
    strokeWeight(6);
    line(...p);
    line(p[0], p[1] + 90, p[2], p[3] + 90);
    strokeWeight(1);
    line(p[0], p[1], p[0], p[1] + 90);
  }

  //----- プレイヤーを描画。 Draw a player.
  strokeWeight(39);
  let m = mouseX/180 - 1.75;
  let bodyVec = new Vec2(1, fd(m)).norm().mul(50).rotate(-PI/2);
  line(mouseX, mouseY, mouseX + bodyVec.x, mouseY + bodyVec.y);

  //----- スケボーを描画。 Draw skateboards.
  strokeWeight(10);
  let drawBoard = yOffset => {
    let b = new Vec2(1, fd(m)).norm().mul(40);
    line(mouseX, mouseY + yOffset, mouseX + b.x, mouseY + b.y + yOffset);
    let bb = b.rotate(PI);
    line(mouseX, mouseY + yOffset, mouseX + bb.x, mouseY + bb.y + yOffset);
  }
  drawBoard(0);
  drawBoard(12);
}
