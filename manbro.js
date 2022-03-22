/**
 * 複素数のクラス
 */
class CN {
  /**
   * @param {number} re
   * @param {number} im
   */
  constructor(re,im) {
    this.re = re;
    this.im = im;
  }
  /**
   * @param {CN} c2 足したい複素数
   */
  add(c2) {
    let c1 = this;
    return new CN(c1.re+c2.re, c1.im+c2.im);
  }
  /**
   * @param {CN} c2 かけたい複素数
   */
  mul(c2) {
    let c1 = this;
    return new CN(c1.re*c2.re-c1.im*c2.im, c1.re*c2.im+c1.im*c2.re);
  }
  /**
   * @param {CN} c2 比較したい複素数
   */
  equals(c2) {
    let c1 = this;
    return c1.re===c2.re && c1.im===c2.im;
  }
  /**
   * @returns {number} 絶対値
   */
  abs() {
    let c = this;
    return sqrt(c.re**2 + c.im**2);
  }
}

function setup() {
  // キャンバスを作る
  createCanvas(640, 640);

  // 薄い灰色で塗りつぶす
  background(240);
  // 塗りつぶす色を、濃い灰色にする
  fill(32);
  // 枠線をなくす（1x1ドットを描くとき邪魔になるから）
  noStroke();

  // 与えられた複素数cが、マンデルブロ集合に属すとみなせるかを計算する関数
  let f = c => {
    let z = new CN(0,0);
    for(let i=0; i<=30; i++) {
      // 漸化式を計算していく
      z = z.mul(z).add(c);
      // 数列の項の絶対値がひとつでも2を超えたら、発散するとみなし、
      // cがマンデルブロ集合に属さないとみなす
      if (z.abs() > 2) return false;
    }
    // 数列の項の絶対値がひとつも2を超えなかったら、発散しないとみなし、
    // cがマンデルブロ集合に属すとみなす
    return true;
  };

  for(let x=0; x<640; x+=1) {
    for(let y=0; y<640; y+=1) {
      let a = x/320-1.5;
      let b = y/320-1;
      let c = new CN(a,b);
      // cがマンデルブロ集合に属すとみなせるなら……
      if (f(c)) {
        // キャンバスの座標(x,y)に、点を打つ
        rect(x,y,1,1);
      }
    }
  }
}

function draw() {
}
