/*
���悩��̕ύX�_
coordsFlippable�֐��̈����𑝂₵�܂����B
������ł�(disk,x,y)�Ƃ���3�̈����ł������A�ÖٓI��gBoard��
�Q�Ƃ��Ă��܂��Ă���ǂ��Ȃ������̂ŁAboard�Ƃ��������𑝂₵�܂����B

Changes from the video
The arguments of the coordsFlippable function have been increased.
In the video, there were three arguments, (disk,x,y),
but it implicitly depends on gBoard, which was not good.
so I added the argument "board".
*/

let gBoard = [
  [0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,],
  [0,0,0,1,2,0,0,0,],
  [0,0,0,2,1,0,0,0,],
  [0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,],
];

let rayToCoords = (x,y, way1,way2) => {
  let areaContains = (x,y) => x>=0 && x<8 && y>=0 && y<8;
  let coords = [];
  //�{�[�h����O���܂ŁA������������������
  while(areaContains(x,y)) {
    coords.push([x,y]);
    x += way1;
    y += way2;
    // console.log(coords);
  }
  return coords;
}

//gBoard�̏���z��ɂ��ĕԂ��Aex.[0,0,0,1,1,2,0,1]
//���������A�΂��u���Ă��邩�A�F�͉����̏�������
let coordsToDisks = (coords, board) => coords.map(c => board[c[1]][c[0]]);

//�Ђ�����Ԃ��鐔��Ԃ�
let nFlippable = (disk, vec) => {
  //�z��̒�������ȉ����ƁA�Ђ�����Ԃ��Ȃ�
  //�܂��͂O�Ԗڂɐ΂��u����Ă�ƁA���������u���Ȃ�
  if (vec.length <= 2 || vec[0] !== 0) return 0;
  for(let i=1; i<vec.length; i++) {
    //�΂��u����ĂȂ�������A�Ђ�����Ԃ���΂��Ȃ�����I���
    if (vec[i] === 0) {
      return 0;
      //�����̐F�̐΂�����������A�Ђ�����Ԃ��Ȃ�����
      //�����܂łЂ�����Ԃ��鐔��Ԃ�
      //���[�v�����������̂܂܁A�Ђ�����Ԃ��鐔�ɂȂ�
    } else if (vec[i] === disk) {
      return i-1;
    }
  }
}

//disk�͔��������Ƃ������ƁA1 or 2
//�W�������A�Ђ�����Ԃ�����W�ix, y�j��Ԃ�
//��̔z����i�[�����z��
//[[x, y], [x, y], [x, y]...]
//...new Array(8).keys()�ŁA[0,1,2,3...]�𐶐�
let coordsFlippable = (disk, x, y, board) => [...new Array(8).keys()]
  //[[0,1],[1,1],[-1,1][0,-1]...]�݂����ɔ�������\������
  .map(n => [round(cos(n*PI/4)), round(sin(n*PI/4))])
  //���������A�{�[�h����O���܂ő�������
  //�����Ă��̔��̔z�񂪊i�[����Ă���̂�coords
  .map(way => rayToCoords(x,y,way[0],way[1]))
  //slice�́A��ꂩ��������Ŏw�肵���͈͈ȊO�̗v�f����菜��
  //�܂�A�n�_�ƏI�_�����ɂȂ�H
  //ex.[[1,2], [4,5]]
  .map(coords => coords.slice(
      1, 1+nFlippable(disk, coordsToDisks(coords, board))))
  .flat();

function setup() {
  createCanvas(480,480);
}

function draw() {
  background(102,153,0);
  stroke(34,51,0);
  strokeWeight(3);
  noFill();

  for(let y=0; y<8; y++) {
    for(let x=0; x<8; x++) {
      let d = gBoard[y][x];
      if (d === 0) noFill();
      if (d === 1) fill(0);
      if (d === 2) fill(255);
      let w = width/8;
      circle(w*x+w/2, w*y+w/2, w);
    }
  }
}

function mousePressed() {
  let w = width/8;
  let x = floor(mouseX/w);
  let y = floor(mouseY/w);

  let coords = coordsFlippable(1, x,y, gBoard);
  //coords�ɂ͂Ђ�����Ԃ������W�������Ă���
  //�܂�AcoordsFlippable�́A�Ђ�����Ԃ����W���i�[�����z���Ԃ�
  console.log(coords);
  if (coords.length === 0) return;

//c[1]����[�}�E�X���I���W,�����W]�H
//�Ⴆ�΁AgBoard[[3,3], 1]�Ƃ��ɂȂ肻�������ǁA�ǂ��������ƁH
//���F�ɂЂ�����Ԃ�����
  for(let c of [...coords, [x,y]]){
    //c[1]c[0]�ɂ͒u���ꏊ�ƂЂ�����Ԃ��ꏊ�̍��W������
    //�܂�...coords��[[x,y], [x,y],[x,y]...]���Ac[1]c[0]�ɑ�����A
    //�Ō�ɁA��������[x, y]���Ac[1]c[0]����
    //[...�z��a, �z��b]�͂��Ԃ�A������flat�֐��݂����ɂȂ�̂���

    //�����ŁA���ɂЂ�����Ԃ�
    gBoard[c[1]][c[0]] = 1;
  }

  let xyProduct = [];
  for(let y=0; y<8; y++) for(let x=0; x<8; x++) xyProduct.push([x,y]);

  let bestXyfFirst = xyProduct
  //length������A�����炭�Ђ�����Ԃ��鐔
  //map������A[x, y, length]�̎O�̗v�f�̔z��𖈉�Ԃ�
    .map(xy => [...xy, coordsFlippable(2, ...xy, gBoard).length])
    //length���O�ȊO�̂��̂ɍi��H
    .filter(xyf => xyf[2] !== 0)
    //�����\�[�g
    .sort( (xyfA,xyfB) => xyfB[2] - xyfA[2]);
    // xyProduct.map(xy => console.log([...xy, coordsFlippable(2, ...xy, gBoard).length]));
    // xyProduct.map(xy => console.log([...xy, coordsFlippable(2, ...xy, gBoard).length].filter(xyf => xyf[2] !== 0)));
  if (bestXyfFirst.length === 0) return;

  //�Ђ�����Ԃ��n�_
  let xyf = bestXyfFirst[0];
  for(let c of [...coordsFlippable(2, xyf[0], xyf[1], gBoard), [xyf[0], xyf[1]]]) {
    // console.log(c);
    //�����Ŏ��ۂɂЂ�����Ԃ�
    //�Ȃ�c[1]c[0]�ɂ́A�Ђ�����Ԃ����W������͂�
    //���ɂ���
    gBoard[c[1]][c[0]] = 2;
  }
}
