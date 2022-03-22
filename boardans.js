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
   * @param {number} rad ��]���������p�x�B�P�ʂ̓��W�A���B
   */
  rot(rad) {
    return new Vec2(
      this.x*cos(rad) - this.y*sin(rad),
      this.x*sin(rad) + this.y*cos(rad)
    );
  }
  /**
   * @returns ���K�����ꂽ�x�N�g��
   */
  norm() {
    return this.mul(1/this.mag());
  }
  copy() {
    return new Vec2(this.x, this.y);
  }
  /**
   * @param {Vec2} b ���̃x�N�g���Ɛ��������������ۂ���Ԃ�
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
    // a.y*p + b.y*q = m.y�@�̘A��������
    // �����
    // 60p - 60q = m.x
    // 30p + 30q = m.y
    // �����ϊ�����ƁA
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
