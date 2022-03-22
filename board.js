/**
 * 2次元ベクトルのクラス
 */
class Vec2 {
  /**
   * @param {number} x成分
   * @param {number} y成分
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
  rot(rad) {
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
  background(91,150,60);
  stroke(0,51,0);
  strokeWeight(6);
  fill(147,224,255);

  {
    let w = 50;
    let r = new Vec2(100, 50);
    let p = (mouseX - r.x) / w;
    let q = (mouseY - r.y) / w;
    let s = floor(p);
    let t = floor(q);
    for(let y = 0; y < 3; y++){
      for(let x = 0; x < 3; x++){
        if(s == x && t == y) fill(233, 0, 0); else noFill();
        rect(x * w + r.x, y * w + r.y, w, w);
      }
    }
  }

  {
    let root = new Vec2(240, 270);
    let xAxis = new Vec2(60, 30);
    let yAxis = new Vec2(-60, 30);

    let mouse = new Vec2(mouseX, mouseY).sub(root);

    let p = (mouse.x + 2 * mouse.y) / 120;
    let q = (-mouse.x + 2 * mouse.y) / 120;

    let s = floor(p);
    let t = floor(q);
    console.log(s, t);

    for(let y = 0; y < 3; y++){
      for(let x = 0; x < 3; x++){
        let d = root.add(xAxis.mul(x)).add(yAxis.mul(y));
        if(x == s && y == t) fill(0, 255, 0);
        else noFill();
        quad(
          d.x, d.y,
          d.add(xAxis).x, d.add(xAxis).y,
          d.add(xAxis).add(yAxis).x, d.add(xAxis).add(yAxis).y,
          d.add(yAxis).x, d.add(yAxis).y
        );
      }
    }
  }

}
