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
    push();
    noFill();
    let w = 60;
    let px = 150; //padding
    let py = 30; //padding
    let s = floor((mouseX-px)/w);
    let t = floor((mouseY-py)/w);
    for(let y=0; y<3; y++) {
      for(let x=0; x<3; x++) {
        if (x === s && y === t) fill(147,224,255); else noFill();
        rect(w*x+px, w*y+py, w, w);
      }
    }
    pop();
  }

  {
    push();
    let r = new Vec2(240, 270); //root
    let a = new Vec2(60, 30); //axis
    let b = new Vec2(-60, 30); //axis

    let m = new Vec2(mouseX, mouseY).sub(r);

    let p = (m.x + 2*m.y) / 120;
    let q = (2*m.y - m.x) / 120;
    // a.x*p + b.x*q = m.x
    // a.y*p + b.y*q = m.y　の連立方程式
    // 今回は
    // 60p - 60q = m.x
    // 30p + 30q = m.y
    // これを変換すると、
    // let p = (m.x + 2*m.y) / 120;
    // let q = (2*m.y - m.x) / 120;

    let s = floor(p);
    let t = floor(q);

    for(let y=0; y<3; y++) {
      for(let x=0; x<3; x++) {
        if (x === s && y === t) fill(147,224,255); else noFill();
        let d = r.add(a.mul(x)).add(b.mul(y));
        quad(
          d.x, d.y,
          d.add(a).x, d.add(a).y,
          d.add(a).add(b).x, d.add(a).add(b).y,
          d.add(b).x, d.add(b).y
        );
      }
    }
    pop();
  }
}
