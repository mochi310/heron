/**
 * �������W�n�ɂ�����2�����x�N�g���̃N���X
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
   * @returns �x�N�g���̑傫��
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

class Util {
  /**
   * ����`�悷��
   * @param {Vec2} begin �n�_�̈ʒu�x�N�g��
   * @param {Vec2} way ���̕����x�N�g��
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
   * @param {Vec2} pos �ʒu�x�N�g��
   * @param {Vec2} velSec ���x/�b
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
      let labels = ['�\�����Ȃ�', '�\������'];
      this.epMode = ++this.epMode % labels.length;
      button.html('�x�N�g��e,p�F'+labels[this.epMode]);
    });

    Game.makeButton(button => {
      let labels = ['�Ȃ�', 'p-e ���̂܂�', 'p-e ���K��'];
      this.vecMode = ++this.vecMode % labels.length;
      button.html('�e�̑��x�x�N�g���F'+labels[this.vecMode]);
    });

    Game.makeButton(button => {
      let labels = ['�������Ȃ�', 'atan(y/x)', 'atan2(y,x)', '��]�s��'];
      this.triMode = ++this.triMode % labels.length;
      button.html('3way�e�̍����F'+labels[this.triMode]);
    });

    Game.makeButton(button => {
      let labels = ['���Ȃ�', '����'];
      this.bulMode = ++this.bulMode % labels.length;
      button.html('�e��\���F'+labels[this.bulMode]);
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
  // ��ʂ��^�b�`������A�v���C���[�����̏ꏊ�֓�����
  game.playerPos = new Vec2(event.clientX, event.clientY);
}

function draw() {
  //----- ���t���[���s������
  // ���_����G�̍��W�֌������x�N�g���i�ʒu�x�N�g���j
  let enemyPos = game.enemyPos;
  // ���_����v���C���[�̍��W�֌������x�N�g���i�ʒu�x�N�g���j
  let playerPos = game.playerPos;

  // �e�����I�ɐ���
  /** @type {Vec2} */
  let bulletVel = null;
  switch(game.vecMode) {
    // �e�𐶐����Ȃ����[�h
    case 0: bulletVel = new Vec2(0,0); break;
    // �e�̑��x�x�N�g���ɁAp-e�����̂܂܎g�����[�h
    case 1: bulletVel = playerPos.sub(enemyPos); break;
    // �e�̑��x�x�N�g���ɁAp-e�𐳋K�����Ďg�����[�h
    case 2: bulletVel = playerPos.sub(enemyPos).normalized().mul(100); break;
  }

  if (frameCount % 30 === 29 && !bulletVel.equals(new Vec2(0,0))) {
    // �܂������v���C���[�ɔ��ł���e�𐶐�
    game.bullets.push(new Bullet(enemyPos, bulletVel));
    // 3way�e�𐶐����郂�[�h��
    if (game.triMode === 1) {
      // atan�֐��Ő������郂�[�h
      // ��Array��map�֐��ɂ���: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map
      let rad1 = atan(bulletVel.y/bulletVel.x) + PI/12;
      let rad2 = rad1 - 2*PI/12;
      let ways = [rad1,rad2].map(rad => new Vec2(cos(rad), sin(rad)).mul(bulletVel.mag()));
      for(let way of ways) {
        game.bullets.push(new Bullet(enemyPos, way));
      }
    }else if (game.triMode === 2) {
      // atan2�֐��Ő������郂�[�h
      let rad1 = atan2(bulletVel.y,bulletVel.x) + PI/12;
      let rad2 = rad1 - 2*PI/12;
      let ways = [rad1,rad2].map(rad => new Vec2(cos(rad), sin(rad)).mul(bulletVel.mag()));
      for(let way of ways) {
        game.bullets.push(new Bullet(enemyPos, way));
      }
    }else if (game.triMode === 3) {
      // ���@�藝�i���瓱�����]�s��j���g�����[�h
      // atan2�ƌ��ʂ͂قڕς��Ȃ�
      let way1 = bulletVel.rotated(-PI/12);
      let way2 = bulletVel.rotated(PI/12);
      for(let way of [way1,way2]) {
        game.bullets.push(new Bullet(enemyPos, way));
      }
    }
    //�e������������̂����
    if (game.bullets.length > 100) game.bullets.shift();
  }

  let deltaSec = deltaTime / 1000; //�O��̃t���[�����牽�b�o�߂�����
  for(let bullet of game.bullets) {
    bullet.pos = bullet.pos.add(bullet.velSec.mul(deltaSec));
  }

  //----- �`��
  // �w�i�F�œh��Ԃ�
  background(80);

  // �G�ƃv���C���[�̕`��
  push();
  strokeWeight(2);
  stroke('black');
  fill('orange');
  circle(enemyPos.x, enemyPos.y, 30);
  fill('cyan');
  circle(playerPos.x, playerPos.y, 30);
  pop();

  // ���̕`��
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

  // �e�̕`��
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
