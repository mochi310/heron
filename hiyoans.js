function setup() {
  createCanvas(480,480);
  strokeWeight(3);
}


function draw() {
  // millis関数は、プログラムが開始されてからの経過時間を返す。単位はミリ秒。
  let sec = millis()/1000;

  //----- 空を描く。
  background(51,153,255);

  //----- 雲を描く。
  fill(204,255,255);
  noStroke();
  ellipse((120*sec)%(width+120)-60, 60, 120, 60);

  //----- 床を描く。
  let w = width;
  let h = height;
  stroke(0);
  fill(102,153,0);
  quad(w/2,h*1/3, w,h*2/3, w/2,h, 0,h*2/3);
  fill(51,102,0);
  triangle(w,h*2/3, w,h, w/2,h);
  triangle(w/2,h, 0,h, 0,h*2/3);

  //----- ひよこを描く。 Draw a chick

  // 4秒で画面を一周させる。
  let angle = sec*PI/2;

  // ひよこの座標の計算。width,heightは画面の幅と高さ。
  let x = width/2 + width/4*cos(angle);
  //240(width / 2)初期位置に、-120～120(width/4*cos(angle))を足す
  //cosの中身は０～６にしたい

  let y = height*1/2 + height/6*sin(angle);

  drawChick(x, y, angle+PI/2, sec);
}


function drawChick(x, y, angle, sec) {
  //----- よく使う関数。 handy functions
  // 角度を 0～2*PI に正規化する。
  // normalize an angle from 0 to 2*PI.
  let normAngle = angle => angle % (2*PI);
  // 身体のパーツが前面にあるかを求める
  // Check if the body part is in the front.
  let isFront = angle => angle>0 && angle<PI;

  //----- 胴体と頭を描画。 Draw a body and head.
  let bodyRadius = 60;
  let bodyAngle = normAngle(angle);
  let bodyShake = bodyRadius/12*abs(cos(normAngle(sec*PI*8/3)));
  let bodyX = x;
  let bodyY = y + bodyShake;
  let bodyDrawer = _ => {
    fill(255,204,102);
    circle(bodyX, bodyY, 2*bodyRadius);
  }

  let headRadius = 45;
  let headX = bodyX + headRadius/2*cos(bodyAngle);
  let headY = bodyY - bodyRadius - bodyShake;
  let headDrawer = _ => {
    fill(255,204,102);
    circle(headX, headY, 2*headRadius);
  }

  if (isFront(bodyAngle)) {
    bodyDrawer();headDrawer();
  }else{
    headDrawer();bodyDrawer();
  }

  //----- 嘴を描画。 Draw a beak.
  let beakRadius = 15;
  let beakX = headX + headRadius*cos(bodyAngle);
  let beakY = headY;
  if (isFront(bodyAngle)) {
    fill(255,153,51);
    circle(beakX, beakY, 2*beakRadius);
  }

  //----- 目を描画。 Draw eyes.
  for(let angleOffset of [-4/PI, 4/PI]) {
    let eyeAngle = normAngle(bodyAngle + angleOffset);
    let eyeX = headX + headRadius*cos(eyeAngle);
    let eyeY = headY;
    let eyeRadius = 12;
    if (isFront(eyeAngle)) {
      fill(102,0,0);
      circle(eyeX, eyeY, eyeRadius);
    }
  }
}
