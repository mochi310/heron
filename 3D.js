// 2021/01/11
// �e�R�}���h��depth�Ƃ����ϐ���ǉ����Adepth���Ⴂ���̂��珇�ɕ`�悳���悤�ɂ��܂����B
// ����ɂ��A�Ђ悱���^�C���̗��։���悤�ɂȂ�܂����B


// �A�X�^���X�N�ӂ��Ŏn�܂�R�����g�́AJSDoc�ƌĂ΂����̂ł��B
// JavaScript�͓��I�^�t���ł��邽�߁A�ϐ��̌^�����s���܂ł킩��܂���
// JSDoc�������Ă����ƁAVSCode���ϐ��̌^��������x���肵�Ă���āA
// �R�[�h�⊮�Ȃǂ������悤�ɂȂ�܂��B
//
// JSDoc�̓ǂݕ��⏑�����i�p��j�F
// https://jsdoc.app/
//
// VSCode��JavaScript�������ɂ́i�p��j:
// https://code.visualstudio.com/docs/languages/javascript
//
// �����x�ȋ@�B�|��ADeepL�ɂ���:
// https://www.deepl.com/translator


/**
 * 2�����x�N�g���̃N���X
 */
class Vec2 {
  /**
   * @param {number} x����
   * @param {number} y����
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  /**
   * @param {Vec2} b ���������x�N�g��
   */
  add(b) {
    let a = this;
    return new Vec2(a.x+b.x, a.y+b.y);
  }
  /**
   * @param {Vec2} b ���������x�N�g��
   */
  sub(b) {
    let a = this;
    return new Vec2(a.x-b.x, a.y-b.y);
  }
  /**
   * @param {number} s �x�N�g���ɂ�����������
   */
  mul(s) {
    return new Vec2(s*this.x, s*this.y);
  }
  /**
   * @param {number} s ���̎����Ńx�N�g��������
   */
  div(s) {
    return new Vec2(this.x/s, this.y/s);
  }
  /**
   * @param {Vec2} v ���̃x�N�g���ƃh�b�g�ς��Ƃ�
   */
  dot(b) {
    let a = this;
    return a.x*b.x + a.y*b.y;
  }
  /**
   * @returns �x�N�g���̑傫���i�����̃��[�N���b�h�����j
   */
  mag() {
    return sqrt(this.x ** 2 + this.y ** 2);
  }
  /**
   * @param {number} s �傫����s�Ƃ����x�N�g����Ԃ�
   */
  magSet(s) {
    return this.mul(s/this.mag());
  }
  /**
   * @param {number} s �傫����s�𑫂����x�N�g����Ԃ�
   */
  magAdded(s) {
    return this.mul(1+s/this.mag());
  }
  /**
   * @param {number} rad ��]���������p�x�B�P�ʂ̓��W�A���B
   */
  rotated(rad) {
    return new Vec2(
      this.x*cos(rad) - this.y*sin(rad),
      this.x*sin(rad) + this.y*cos(rad)
    );
  }
  /**
   * @returns ���K�����ꂽ�x�N�g��
   */
  normalized() {
    return this.mul(1/this.mag());
  }
  copy() {
    return new Vec2(this.x, this.y);
  }
  /**
   * @param {Vec2} b ���̃x�N�g���Ɛ��������������ۂ���Ԃ�
   */
  equals(b) {
    let a = this;
    return a.x === b.x && a.y === b.y;
  }
}

class QuadDrawer{
  /**
   * ��`��`�悷��R�}���h
   * @param {Array.<Vec2>} vertexes
   * @param {string} color
   * @param {number} depth
   */
  constructor(vertexes, color, depth) {
    this.vertexes = vertexes;
    this.color = color;
    this.depth = depth;
  }
  draw() {
    push();
    stroke('black');
    strokeWeight(2);
    fill(this.color);
    let vs = this.vertexes;
    if (vs.length !== 4) debugger;
    quad(vs[0].x, vs[0].y, vs[1].x, vs[1].y, vs[2].x, vs[2].y, vs[3].x, vs[3].y);
    pop();
  }
}

class ShadowDrawer{
  /**
   * �e��`�悷��R�}���h
   * @param {Vec2} pos
   * @param {number} radius
   * @param {number} depth
   */
  constructor(pos, radius, depth) {
    this.pos = pos;
    this.radius = radius;
    this.depth = depth;
  }
  draw() {
    let pos = this.pos;
    let radius = this.radius;
    push();
    strokeWeight(0);
    fill('black');
    ellipse(pos.x, pos.y, radius*4, radius*2);
    pop();
  }
}

class ChickenDrawer{
  /**
   * �Ђ悱�H��`�悷��R�}���h
   * @param {Vec2} pos �����̈ʒu�x�N�g��
   * @param {number} angle Z���̊p�x
   * @param {number} animFrame �A�j���[�V�����̉��t���[���ڂ��Đ����邩
   * @param {number} depth
   */
  constructor(pos, angle, animFrame, depth) {
    this.pos = pos;
    this.angle = angle;
    this.animFrame = animFrame;
    this.depth = depth;
  }
  draw() {
    let pos = this.pos;
    let angle = this.angle;
    let animFrame = this.animFrame;

    /** �p�x��0�`2�΂ɐ��K������B0.0001�����Ă���̂͌덷�ɂ��o�O������邽�� */
    let normalized = a => ((a+0.0001+10000*PI) % (2*PI));
    let isFacingUs = a => (a = normalized(a), (a >= -PI/36 && a <= 37*PI/36));
    let isFacingUsNarrow = a => (a = normalized(a), (a >= PI/12 && a <= 11*PI/12));
    angle = normalized(angle);

    let shake = new Vec2(0, ((animFrame % 20) > 10) ? -2 : 0);
    let bodyCenter = pos.add(new Vec2(0,-16)).add(shake);
    let assCenter = isFacingUsNarrow(angle+PI) ? bodyCenter.add(new Vec2(12*cos(angle+PI), -4)) : null;
    let headCenter = bodyCenter.add(new Vec2(6*cos(angle),-16)).sub(shake);
    let beakCenter = isFacingUs(angle) ? headCenter.add(new Vec2(12*cos(angle),0)) : null;
    let eyes = [];
    if (isFacingUs(angle-PI/3)) eyes.push(headCenter.add(new Vec2(8*cos(angle-PI/3),-4)));
    if (isFacingUs(angle+PI/3)) eyes.push(headCenter.add(new Vec2(8*cos(angle+PI/3),-4)));

    push();
    stroke('black');
    strokeWeight(2);
    fill('yellow');
    let drawBody = _=>circle(bodyCenter.x, bodyCenter.y, 32);
    let drawHead = _=>circle(headCenter.x, headCenter.y, 24);
    if (isFacingUs(angle)) {
      drawBody();drawHead();
    } else {
      drawHead();drawBody();
    }
    fill('black');
    strokeWeight(0);
    for(let eye of eyes){
      circle(eye.x, eye.y, 3);
    }
    fill('orange')
    strokeWeight(1);
    if (beakCenter !== null) {
      circle(beakCenter.x, beakCenter.y, 8);
    }

    fill('black');
    textAlign(CENTER, CENTER);
    textSize(10);
    strokeWeight(1);
    if (assCenter !== null) {
      text('x', assCenter.x, assCenter.y);
    }
    pop();
  }
}

class Util {
  /**
   * ����`�悷��
   * @param {Vec2} begin �n�_�̈ʒu�x�N�g��
   * @param {Vec2} way ���̕����x�N�g��
   */
  static drawArrow(begin, way, brimSize=20) {
    let end = begin.add(way);
    if (brimSize !== 0) {
      let b1 = way.normalized().mul(-brimSize).rotated(PI/6);
      let b2 = b1.rotated(-2*PI/6);
      [b1,b2].forEach(brim => line(end.x, end.y, end.add(brim).x, end.add(brim).y));
    }
    line(begin.x, begin.y, end.x, end.y);
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {Vec2} root
   * @param {Vec2} xAxis
   * @param {Vec2} yAxis
   * @returns {Array.<Vec2>} �^�C����4���_���A���_���玞�v���ɕԂ��B
   */
  static tileVertexes(x, y, z, root, xAxis, yAxis) {
    let vx = x-z, vy = y-z;
    let p = root.add(xAxis.mul(vx)).add(yAxis.mul(vy));
    return [p, p.add(xAxis), p.add(xAxis).add(yAxis), p.add(yAxis)];
  }
  /**
   * @param {Level} level
   * @param {Vec2} root ���_���ǂ��ɂ��邩�i�X�N���[�����W�n�j
   * @param {Vec2} xAxis
   * @param {Vec2} yAxis
   * @param {number} viewSize �`�悷��͈́B ��:3�Ȃ�3x3�^�C���`��
   * @param {Object} options
   * @returns {Array} ���������Ƃɐ������ꂽ�`��R�}���h
   */
  static makeTilemapDrawers(level, root, xAxis, yAxis, viewSize, options) {
    let zAxis = new Vec2(0,0).sub(xAxis).sub(yAxis);
    let drawers = [];
    for(let ty=0; ty<viewSize; ty++) {
      for(let tx=0; tx<viewSize; tx++) {
        // ���̕`��R�}���h�𐶐�
        let height = options.drawHeights ? heightAt(tx, ty) : 0;
        // tvs = ��ʂ̃^�C����4���_�B top (surface) vertexes
        let tvs = Util.tileVertexes(tx, ty, height, root, xAxis, yAxis);
        let depth = tx+ty;
        drawers.push(new QuadDrawer([tvs[0], tvs[1], tvs[2], tvs[3]], "ForestGreen", depth));

        if (height > 0) {
          // �����̂���^�C���Ȃ�A�ǂ̕`��R�}���h�𐶐�
          let wallVec = zAxis.mul(height);
          // bvs = �^�C���̒�ʂ�4���_�B bottom (surface) vertexes
          let bvs = tvs.map(v => v.sub(wallVec));
          // ��ʂƒ�ʂ��q���āA�ǖʂ����iX�����j
          drawers.push(new QuadDrawer([tvs[1], bvs[1], bvs[2], tvs[2]], 'DarkGreen', depth));
          // ��ʂƒ�ʂ��q���āA�ǖʂ����iY�����j
          drawers.push(new QuadDrawer([tvs[2], bvs[2], bvs[3], tvs[3]], 'DarkGreen', depth));
        }
      }
    }
    return drawers;
  }

  /**
   * @param {Level} level
   * @param {Vec2} root
   * @param {Vec2} xAxis
   * @param {Vec2} yAxis
   * @param {number} length
   */
  static drawTileHeights(level, root, xAxis, yAxis, length) {
    push();
    stroke('black');
    strokeWeight(2);
    fill('white');
    textAlign(LEFT, TOP);
    textSize(24);
    for (let ty = 0; ty < length; ty++) {
      for (let tx = 0; tx < length; tx++) {
        let tvs = Util.tileVertexes(tx, ty, 0, root, xAxis, yAxis);
        let height = level.heightAt(tx, ty);
        text('' + height, tvs[0].x, tvs[0].y);
      }
    }
    pop();
  }
}

class Player {
  constructor() {
    this.pos = new Vec2(1.5, 3.5);
    this.angle = -PI/2;
    this.height = 1;
    this.vz = 0;
    this.animFrame = 0;
  }
}

class Level {
  constructor() {
    /** @type {Array.<number> */
    this.heights = [];
    this.tileXLen = 0;
    this.tileYLen = 0;
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  asIndex(x, y) {
    let xi = floor(x), yi = floor(y);
    if (xi < 0 || xi >= this.tileXLen) return -1;
    if (yi < 0 || yi >= this.tileYLen) return -1;
    return yi*this.tileXLen + xi;
  }
  /**
   * @param {number} x
   * @param {number} y
   */
  heightAt(x, y) {
    let i = this.asIndex(x,y);
    return i === -1 ? 0 : this.heights[i];
  }
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  isPassable(x, y, z) {
    return this.heightAt(x,y) !== 0 && z >= this.heightAt(x,y);
  }
}

class Game {
  constructor() {
    //----- �v���C���[�𐶐�
    let player = new Player();
    player.pos = new Vec2(1.5, 3.5);
    player.angle = -PI/2;
    player.height = 1;
    this.player = player;

    //----- �Q�[���̕���𐶐�
    let level = new Level();
    level.heights = [
      4.5, 4.0, 3.5, 5.0,
      1.5, 2.0, 3.0, 0.5,
      2.0, 2.0, 2.5, 2.0,
      1.0, 1.0, 1.5, 1.0,
    ];
    level.tileXLen = 4;
    level.tileYLen = 4;
    this.level = level;
  }
  /**
   * ���t���[���s������
   */
  proc(){
    //-----
    let player = this.player;
    let level = this.level;
    let pos = player.pos;

    //----- �L�[����
    if (keyIsPressed) {
      // z���̈ړ��i�W�����v�j
      if (keyIsDown(32) && player.vz === 0) {
        player.vz = 0.1;
      }

      // xy���̈ړ�
      let ix = 0, iy = 0;
      if (keyIsDown(68)) ix = 1; // D�L�[
      if (keyIsDown(65)) ix = -1; // A�L�[
      if (keyIsDown(83)) iy = 1; // S�L�[
      if (keyIsDown(87)) iy = -1; // W�L�[
      let inputVec = new Vec2(ix, iy);
      if (! inputVec.equals(new Vec2(0,0))) {
        // ���s�A�j���[�V������i�߂�
        player.animFrame++;
        // �ǂ̊p�x�ɕ����Ă��邩���A�L�[���͂��狁�߂�
        // PI/4 �������̂́A���p�}�Œ����I�Ɉړ����₷�����邽��
        let angle = atan2(inputVec.y, inputVec.x) - PI/4;
        player.angle = angle;
        // 1�t���[�����������Ƃ̍��W�����߁A�����ɕǂȂǂ��Ȃ���΁A���ۂɂ����ֈړ�����
        let futurePos = player.pos.add(new Vec2(cos(angle), sin(angle)).mul(1/30));
        if (level.isPassable(futurePos.x, futurePos.y, player.height)) {
          player.pos = futurePos;
        }
      }
    }

    //----- �v���C���[�̏d�͂Ɛڒn
    let futureHeight = player.height + player.vz;
    if (level.isPassable(pos.x, pos.y, futureHeight)) {
      player.height = futureHeight;
      player.vz -= 0.0029;
    }else{
      player.vz = 0;
    }
  }

  /**
   * ���t���[���s���`��
   */
  draw(){
    //----- �v���C���[��^�C���̍��W�̌v�Z
    let topRoot = new Vec2(400,50);
    let topXAxis = new Vec2(48,0);
    let topYAxis = new Vec2(0,48);
    let isoRoot = new Vec2(200,275);
    let isoXAxis = new Vec2(48,24);
    let isoYAxis = new Vec2(-48,24);
    let isoZAxis = new Vec2(0,0).sub(isoXAxis).sub(isoYAxis);

    let player = this.player;
    let playerLoc = player.pos.copy();
    let playerIsoPos = (
      isoRoot.add(isoXAxis.mul(playerLoc.x)).add(isoYAxis.mul(playerLoc.y)).add(isoZAxis.mul(player.height)));

    let playerIsoAngle = player.angle + PI/4;
    let playerTopPos = topXAxis.mul(playerLoc.x).add(topYAxis.mul(playerLoc.y)).add(topRoot);
    let playerTopAngle = player.angle;

    let level = this.level;

    //----- p5.js�Ńv���C���[��^�C���Ȃǂ�`��
    // �^�C���̕`��R�}���h�̐���
    let isoDrawers = Util.makeTilemapDrawers(
      level, isoRoot, isoXAxis, isoYAxis, 4,
      {drawHeight: true}
    );
    let topDrawers = Util.makeTilemapDrawers(
      level, topRoot, topXAxis, topYAxis, 4,
      {drawHeight: false}
    );

    // �v���C���[�̕`��R�}���h�𐶐�
    let floorHeight = level.heightAt(player.pos.x, player.pos.y);
    let shadowPos = playerIsoPos.sub(isoZAxis.mul(player.height - floorHeight));

    let playerIsoDrawer = new ChickenDrawer(
      playerIsoPos,
      playerIsoAngle,
      player.animFrame,
      floor(player.pos.x) + floor(player.pos.y)
    );
    let shadowDrawer = new ShadowDrawer(shadowPos, 8, playerIsoDrawer.depth);
    let playerTopDrawer = new ChickenDrawer(
      playerTopPos.add(new Vec2(0,12)),
      playerTopAngle,
      player.animFrame,
      0
    );

    // ��ʂ�h��Ԃ��i�N���A����j
    background(64);

    // �R�}���h��p���āA���p�}��`�悷��B
    // �`�揇�́Adepth���Ⴂ�R�}���h�����A�����R�}���h����O�ƂȂ�B
    // ���X�v���b�h�\��(...)�ɂ���: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    let isoDrawOrder = [...isoDrawers, shadowDrawer, playerIsoDrawer];
    isoDrawOrder.sort( (a,b) => a.depth - b.depth);
    for(let d of isoDrawOrder) {
      d.draw();
    }
    // �R�}���h��p���āA��ʐ}��`�悷��
    let topDrawOrder = [...topDrawers, playerTopDrawer];
    for(let d of topDrawOrder) {
      d.draw();
    }

    // ��ʐ}�ɂ����A�^�C���̍����𐔒l�ŕ\��
    Util.drawTileHeights(level, topRoot, topXAxis, topYAxis, 4);

    push();
    textAlign(LEFT, TOP);
    textSize(24);
    noStroke();
    fill('white');
    text('W,S,A,D�L�[�ňړ��ASpace�L�[�ŃW�����v', 0, 0);
    pop();
  }
}
let game;

function setup() {
  createCanvas(640,480);
  game = new Game();
}

function draw() {
  game.proc();
  game.draw();
}
