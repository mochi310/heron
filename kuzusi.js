function setup() {
  createCanvas(400, 400);
  // �u���b�N�𐶐�����blocks�ϐ��ɋl�߂�
  for (let i = 0; i < 12; i++) {
    let p = new Vec2(90*(i%4)+50, 50*floor(i/4)+50);
    blocks.push(new Block(p, 20));
  }
}

class Vec2 {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
  }
  // ���̃x�N�g���ƁA�����̃x�N�g��b�̘a���v�Z����
  add(b) {
    let a = this;
    return new Vec2(a.x + b.x, a.y + b.y);
  }
  // ���̃x�N�g��������s�{�����x�N�g�����v�Z����
  mul(s) {
    let a = this;
    return new Vec2(s * a.x, s * a.y);
  }
  // ���̃x�N�g���̑傫�������߂�
  mag() {
    let a = this;
    return sqrt(a.x ** 2 + a.y ** 2);
  }
  // ���̃x�N�g���ƈ����̃x�N�g��b�̍������߂�
  sub(b) {
    let a = this;
    return new Vec2(a.x - b.x, a.y - b.y);
  }
  // ���̃x�N�g���𐳋K�������x�N�g�������߂�
  norm() {
    let a = this;
    return a.mul(1 / a.mag());
  }
  // ���̃x�N�g���ƈ����̃x�N�g��b�́A�h�b�g�ρi���ρj�����߂�
  dot(b) {
    let a = this;
    return a.x * b.x + a.y * b.y;
  }
  // ���̃x�N�g���̔��˃x�N�g�������߂�B
  // w�́A�@���x�N�g���Ƃ���i�傫���͖��Ȃ��j
  reflect(w) {
    let v = this;
    let cosTheta = v.mul(-1).dot(w) / (v.mul(-1).mag() * w.mag());
    let n = w.norm().mul(v.mag() * cosTheta);
    let r = v.add(n.mul(2));
    return r;
  }
}

class Ball {
  constructor(_p, _v, _r) {
    this.p = _p; //�{�[���̒��S�̈ʒu�x�N�g��
    this.v = _v; //�{�[���̑��x�x�N�g��
    this.r = _r; //�{�[���̔��a
  }
}

class Block {
  constructor(_p, _r) {
    this.p = _p; //�u���b�N�̒��S�̈ʒu�x�N�g��
    this.r = _r; //�u���b�N�̔��a
  }
}

class Paddle {
  constructor(_p, _r) {
    this.p = _p; //�p�h���̒��S�̈ʒu�x�N�g��
    this.r = _r; //���a
  }
}

// �{�[�������
let ball = new Ball(
  new Vec2(200, 300),
  new Vec2(240, -60),
  15
);

// �u���b�N�����
let blocks = [];

// �p�h�������
let paddle = new Paddle(new Vec2(200, 320), 30);

function draw() {
  // �{�[�����ړ�������
  ball.p = ball.p.add(ball.v.mul(1 / 60));

  // �{�[�������[���E�[�ɗ����甽��
  if ((ball.p.x < 15) || (ball.p.x > 385)) {
    ball.v.x = -ball.v.x;
  }
  // �{�[������[�ɗ����甽��
  if ((ball.p.y < 15) || (ball.p.y > 385)) {
    ball.v.y = -ball.v.y;
  }
  // �{�[���ƃu���b�N�̏Փ˔���
  for (let block of blocks) {
    let d = block.p.sub(ball.p).mag(); //����
    if (d < (ball.r + block.r)) {
      // �Ԃ����Ă�����A�{�[���̑��x�𔽎˂�����
      let w = ball.p.sub(block.p);
      let r = ball.v.reflect(w);
      ball.v = r;
      // �u���b�N������
      blocks.splice(blocks.indexOf(block), 1);
    }
  }

  // �p�h���̑���
  paddle.p.x = mouseX;
  // �{�[���ƃp�h���̏Փ˔���
  let d = paddle.p.sub(ball.p).mag(); //����
  if (d < (ball.r + paddle.r)) {
    // �Ԃ����Ă�����A�{�[���̑��x�𔽎˂�����
    let w = ball.p.sub(paddle.p);
    let r = ball.v.reflect(w);
    ball.v = r;
    // �߂肱�ݖh�~
    ball.p = paddle.p.add(w.norm().mul(ball.r + paddle.r));
  }

  // ��ʂ�h��Ԃ��i�����j
  background(220);
  // �{�[����`��
  circle(ball.p.x, ball.p.y, 2*ball.r);
  // �u���b�N��`��
  for (let b of blocks) {
    circle(b.p.x, b.p.y, 2*b.r);
  }
  // �p�h����`��
  circle(paddle.p.x, paddle.p.y, 2*paddle.r);
}
