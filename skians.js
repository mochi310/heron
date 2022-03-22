/**
 * 2�����x�N�g���̃N���X�B
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
  rotate(rad) {
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
  background(204,204,255);
  noFill();
  stroke(153,51,0);
  strokeWeight(6);

  //----- �n�`��`�� Draw a terrain
  let f = x => 4/5*(x**4) + 3/2*(x**3);
  let fd = x => 16/5*(x**3) + 9/2*(x**2);
  // s(step)������������ƁA�n�`���r���Ȃ�܂��B
  let s = 1/24;
  for(let x=-2; x<0.6; x+=s) {
    // (x-s, f(x-s)) ���� (x,f(x)) �֐������������B
    let p = [x-s, f(x-s), x, f(x)];
    // �������O���t�̍��W�̓L�����o�X�ɑ΂��ď���������̂ŁA
    // �K���ɕ��s�ړ��E�g��k�����ăL�����o�X�Ɏ��߂�B
    p = p.map(a => a+1.75);
    p = p.map(a => 180*a);
    // ����ƕ`��ł���B Now I can draw it finally.
    strokeWeight(3);
    line(...p);

    // �΂ߏォ�猩�Ă���悤�Ȋ����ɂ���
    line(p[0], p[1]+90, p[2], p[3]+90);
    strokeWeight(1);
    line(p[0], p[1], p[0], p[1]+90);
  }

  //----- �v���C���[��`��B Draw a player.
  strokeWeight(24);
  let m = (mouseX/180)-1.75;//�O���t��1.75�{�ɕ��s�ړ��A180�{�Ɋg������Ă邩��
  //m�̒l�͂��悻�[�Q�`�Q
  let bodyVec = new Vec2(1, fd(m)).norm().mul(30).rotate(-PI/2);
  line(mouseX, mouseY, mouseX + bodyVec.x, mouseY + bodyVec.y);

  //----- �X�P�{�[��`��B Draw skateboards.
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
