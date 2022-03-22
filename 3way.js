/**
 * 直交座標系における2次元ベクトルのクラス
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
   * @returns ベクトルの大きさ
   */
  mag() {
    return sqrt(this.x ** 2 + this.y ** 2);
  }
  /**
   * @param {number} s 大きさをsとしたベクトルを返す
   */
  magSet(s) {
    return this.mul(s/this.mag());
  }
  /**
   * @param {number} s 大きさにsを足したベクトルを返す
   */
  magAdded(s) {
    return this.mul(1+s/this.mag());
  }
  /**
   * @param {number} rad 回転させたい角度。単位はラジアン。
   */
  rotated(rad) {
    return new Vec2(
      this.x*cos(rad) - this.y*sin(rad),
      this.x*sin(rad) + this.y*cos(rad)
    );
  }
  /**
   * @returns 正規化されたベクトル
   */
  normalized() {
    return this.mul(1/this.mag());
  }
  copy() {
    return new Vec2(this.x, this.y);
  }
  /**
   * @param {Vec2} b このベクトルと成分が等しいか否かを返す
   */
  equals(b) {
    let a = this;
    return a.x === b.x && a.y === b.y;
  }
}

class Util {
  /**
   * 矢印を描画する
   * @param {Vec2} begin 始点の位置ベクトル
   * @param {Vec2} way 矢印の方向ベクトル
   */
  static drawArrow(begin, way) {
    let end = begin.add(way);
    let b1 = way.normalized().mul(-30).rotated(PI/6);
    let b2 = b1.rotated(-2*PI/6);
    [b1,b2].forEach(brim => line(end.x, end.y, end.add(brim).x, end.add(brim).y));
    line(begin.x, begin.y, end.x, end.y);
  }
}

class Bullet {
  /**
   * @param {Vec2} pos 位置ベクトル
   * @param {Vec2} velSec 速度/秒
   */
  constructor(pos, velSec) {
    this.pos = pos;
    this.velSec = velSec;
  }
}

class Game {
  constructor() {
    this.enemyPos = new Vec2(200, 200);
    this.playerPos = new Vec2(300, 400);

    /** @type {Array} */
    this.bullets = [];

    this.epMode = -1;
    this.vecMode = -1;
    this.triMode = -1;
    this.bulMode = -1;
  }
  static makeButton(onPressed) {
    let button = createButton('');
    button.style('font-size', '1.5em');
    button.style('width', width+'px');
    button.style('margin-top', '0.15em');
    button.style('display', 'block');

    button.mousePressed(_=>onPressed(button));
    onPressed(button);
  }
  addButtons() {
    Game.makeButton(button => {
      let labels = ['表示しない', '表示する'];
      this.epMode = ++this.epMode % labels.length;
      button.html('ベクトルe,p：'+labels[this.epMode]);
    });

    Game.makeButton(button => {
      let labels = ['なし', 'p-e そのまま', 'p-e 正規化'];
      this.vecMode = ++this.vecMode % labels.length;
      button.html('弾の速度ベクトル：'+labels[this.vecMode]);
    });

    Game.makeButton(button => {
      let labels = ['生成しない', 'atan(y/x)', 'atan2(y,x)', '回転行列'];
      this.triMode = ++this.triMode % labels.length;
      button.html('3way弾の作り方：'+labels[this.triMode]);
    });

    Game.makeButton(button => {
      let labels = ['しない', 'する'];
      this.bulMode = ++this.bulMode % labels.length;
      button.html('弾を表示：'+labels[this.bulMode]);
      this.bullets = [];
    });
  }
}
let game = new Game;

function setup() {
  createCanvas(400, 400);
  background(80);

  game.addButtons();
}

function touchMoved(event) {
  if (event.clientY > height) return;
  // 画面をタッチしたら、プレイヤーをその場所へ動かす
  game.playerPos = new Vec2(event.clientX, event.clientY);
}

function draw() {
  //----- 毎フレーム行う処理
  // 原点から敵の座標へ向かうベクトル（位置ベクトル）
  let enemyPos = game.enemyPos;
  // 原点からプレイヤーの座標へ向かうベクトル（位置ベクトル）
  let playerPos = game.playerPos;

  // 弾を定期的に生成
  /** @type {Vec2} */
  let bulletVel = null;
  switch(game.vecMode) {
    // 弾を生成しないモード
    case 0: bulletVel = new Vec2(0,0); break;
    // 弾の速度ベクトルに、p-eをそのまま使うモード
    case 1: bulletVel = playerPos.sub(enemyPos); break;
    // 弾の速度ベクトルに、p-eを正規化して使うモード
    case 2: bulletVel = playerPos.sub(enemyPos).normalized().mul(100); break;
  }

  if (frameCount % 30 === 29 && !bulletVel.equals(new Vec2(0,0))) {
    // まっすぐプレイヤーに飛んでくる弾を生成
    game.bullets.push(new Bullet(enemyPos, bulletVel));
    // 3way弾を生成するモードか
    if (game.triMode === 1) {
      // atan関数で生成するモード
      // ※Arrayのmap関数について: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map
      let rad1 = atan(bulletVel.y/bulletVel.x) + PI/12;
      let rad2 = rad1 - 2*PI/12;
      let ways = [rad1,rad2].map(rad => new Vec2(cos(rad), sin(rad)).mul(bulletVel.mag()));
      for(let way of ways) {
        game.bullets.push(new Bullet(enemyPos, way));
      }
    }else if (game.triMode === 2) {
      // atan2関数で生成するモード
      let rad1 = atan2(bulletVel.y,bulletVel.x) + PI/12;
      let rad2 = rad1 - 2*PI/12;
      let ways = [rad1,rad2].map(rad => new Vec2(cos(rad), sin(rad)).mul(bulletVel.mag()));
      for(let way of ways) {
        game.bullets.push(new Bullet(enemyPos, way));
      }
    }else if (game.triMode === 3) {
      // 加法定理（から導ける回転行列）を使うモード
      // atan2と結果はほぼ変わらない
      let way1 = bulletVel.rotated(-PI/12);
      let way2 = bulletVel.rotated(PI/12);
      for(let way of [way1,way2]) {
        game.bullets.push(new Bullet(enemyPos, way));
      }
    }
    //弾が増えすぎるのを回避
    if (game.bullets.length > 100) game.bullets.shift();
  }

  let deltaSec = deltaTime / 1000; //前回のフレームから何秒経過したか
  for(let bullet of game.bullets) {
    bullet.pos = bullet.pos.add(bullet.velSec.mul(deltaSec));
  }

  //----- 描画
  // 背景色で塗りつぶす
  background(80);

  // 敵とプレイヤーの描画
  push();
  strokeWeight(2);
  stroke('black');
  fill('orange');
  circle(enemyPos.x, enemyPos.y, 30);
  fill('cyan');
  circle(playerPos.x, playerPos.y, 30);
  pop();

  // 矢印の描画
  push();
  strokeWeight(2);
  if (game.epMode === 1) {
    stroke('white');
    Util.drawArrow(new Vec2(0,0), enemyPos);
    Util.drawArrow(new Vec2(0,0), playerPos);
  }
  stroke('yellow');
  Util.drawArrow(enemyPos, bulletVel);
  pop();

  // 弾の描画
  if (game.bulMode === 1) {
    push();
    strokeWeight(12);
    stroke('white');
    for(let bullet of game.bullets) {
      point(bullet.pos.x, bullet.pos.y);
    }
    pop();
  }
}
