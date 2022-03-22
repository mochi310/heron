void setup() {
  size(800, 800);
  translate(400, 400);
  scale(1, -1);
  A = x1-x0;//見る方向のベクトル(x成分)※現在この部分が負の値になると上手くいきません。
  B = y1-y0;//見る方向のベクトル(y成分)
  C = z1-z0;//見る方向のベクトル(z成分)
}
float x0 = 120, y0 = 250, z0 = 250;//目の位置。
float x1 = 0, y1 = 0, z1 = 0;//見る位置の座標。今のところ原点で固定したほうがいい。
float e = 0;
float A, B, C;
void draw() {
  background(200, 200, 50);
  translate(400, 400);
  scale(1, -1);

  fill(255);
  A = x1-x0;
  B = y1-y0;
  C = z1-z0;
  e = (A)*x0 + (B)*y0 + (C)*z0;

  noStroke();
  fill(255, 0, 0);
  //quad(keisan_x(600, 0, 600), keisan_y(600, 0, 600), keisan_x(-600, 0, 600), keisan_y(-600, 0, 600), keisan_x(-600, 0, -600), keisan_y(-600, 0, -600), keisan_x(600, 0, -600), keisan_y(600, 0, -600));
  fill(0, 255, 255, 75);
  //平面の描画。
  quad(keisan_x(600, 600, 0), keisan_y(600, 600, 0), keisan_x(-600, 600, 0), keisan_y(-600, 600, 0), keisan_x(-600, -600, 0), keisan_y(-600, -600, 0), keisan_x(600, -600, 0), keisan_y(600, -600, 0));
  fill(255, 255, 0, 75);
  fill(255, 0, 255, 75);
  //quad(keisan_x(0, 600, 600), keisan_y(0, 600, 600), keisan_x(0, -600, 600), keisan_y(0, -600, 600), keisan_x(0, -600, -600), keisan_y(0, -600, -600), keisan_x(0, 600, -600), keisan_y(0, 600, -600));
  strokeWeight(5);
  stroke(0, 0, 255);
  //軸の描画
  l(0, 0, 0, 0, 0, 600);
  stroke(0, 255, 0);
  l(0, 0, 0, 0, 600, 0);
  stroke(255, 0, 0);
  l(0, 0, 0, 600, 0, 0);
  stroke(0, 0, 125);
  l(0, 0, 0, 0, 0, -600);
  stroke(0, 125, 0);
  l(0, 0, 0, 0, -600, 0);
  stroke(125, 0, 0);
  l(0, 0, 0, -600, 0, 0);
  noStroke();
  fill(255, 0, 0);
  //点の描画
  p(155, 25, 120);
  //p(50, 50, 0);
  p(220, 150, -250);
  p(-240, 85, 320);
  p(180, -50, 220);
  p(420, 230, 330);
  fill(255);
  p(600, 0, 0);
  p(0, 600, 0);
  p(0, 0, 600);
  p(-600, 0, 0);
  p(0, -600, 0);
  p(0, 0, -600);
  p(0, 0, 0);
  stroke(255, 255, 0);
  strokeWeight(8);

  //立方体の描画
  //l(300, 0, 0, 300, 300, 0);
  //l(300, 300, 0, 0, 300, 0);
  //l(0, 300, 0, 0, 0, 0);
  //l(0, 0, 0, 300, 0, 0);
  //l(300, 0, 0, 300, 0, 300);
  //l(300, 300, 0, 300, 300, 300);
  //l(0, 300, 0, 0, 300, 300);
  //l(0, 0, 0, 0, 0, 300);
  //l(300, 0, 300, 300, 300, 300);
  //l(300, 300, 300, 0, 300, 300);
  //l(0, 300, 300, 0, 0, 300);
  //l(0, 0, 300, 300, 0, 300);

  //正八面体の面の描画
  fill(0, 0, 255, 120);
  noStroke();
  triangle(keisan_x(100, 100, 400), keisan_y(100, 100, 400), keisan_x(100, 400, 400), keisan_y(100, 400, 400), keisan_x(250, 250, -sqrt(2)*150+400), keisan_y(250, 250, -sqrt(2)*150+400));
  triangle(keisan_x(400, 400, 400), keisan_y(400, 400, 400), keisan_x(100, 400, 400), keisan_y(100, 400, 400), keisan_x(250, 250, -sqrt(2)*150+400), keisan_y(250, 250, -sqrt(2)*150+400));
  triangle(keisan_x(100, 100, 400), keisan_y(100, 100, 400), keisan_x(400, 100, 400), keisan_y(400, 100, 400), keisan_x(250, 250, -sqrt(2)*150+400), keisan_y(250, 250, -sqrt(2)*150+400));
  triangle(keisan_x(400, 400, 400), keisan_y(400, 400, 400), keisan_x(400, 100, 400), keisan_y(400, 100, 400), keisan_x(250, 250, -sqrt(2)*150+400), keisan_y(250, 250, -sqrt(2)*150+400));
  triangle(keisan_x(100, 100, 400), keisan_y(100, 100, 400), keisan_x(100, 400, 400), keisan_y(100, 400, 400), keisan_x(250, 250, -sqrt(2)*150+400), keisan_y(250, 250, sqrt(2)*150+400));
  triangle(keisan_x(400, 400, 400), keisan_y(400, 400, 400), keisan_x(100, 400, 400), keisan_y(100, 400, 400), keisan_x(250, 250, -sqrt(2)*150+400), keisan_y(250, 250, sqrt(2)*150+400));
  triangle(keisan_x(100, 100, 400), keisan_y(100, 100, 400), keisan_x(400, 100, 400), keisan_y(400, 100, 400), keisan_x(250, 250, -sqrt(2)*150+400), keisan_y(250, 250, sqrt(2)*150+400));
  triangle(keisan_x(400, 400, 400), keisan_y(400, 400, 400), keisan_x(400, 100, 400), keisan_y(400, 100, 400), keisan_x(250, 250, -sqrt(2)*150+400), keisan_y(250, 250, sqrt(2)*150+400));
  stroke(0);
  strokeWeight(8);
  //正八面体の辺の描画
  l(100, 100, 400, 400, 100, 400);
  l(100, 100, 400, 100, 400, 400);
  l(100, 400, 400, 400, 400, 400);
  l(400, 100, 400, 400, 400, 400);
  l(400, 100, 400, 250, 250, sqrt(2)*150+400);
  l(100, 100, 400, 250, 250, sqrt(2)*150+400);
  l(100, 400, 400, 250, 250, sqrt(2)*150+400);
  l(400, 400, 400, 250, 250, sqrt(2)*150+400);
  l(400, 100, 400, 250, 250, -sqrt(2)*150+400);
  l(100, 100, 400, 250, 250, -sqrt(2)*150+400);
  l(100, 400, 400, 250, 250, -sqrt(2)*150+400);
  l(400, 400, 400, 250, 250, -sqrt(2)*150+400);

  loadPixels();
  //球の描画等。※ものすごく重いのであまりしない方がいい。
  for (int i = -400; i <= 400; i++) {
    for (int j = -400; j <= 400; j++) {
      for (int k = -400; k <= 400; k++) {
        //if (120.5 <= int(sqrt(sq(i)+sq(j)+sq(k)))&&int(sqrt(sq(i)+sq(j)+sq(k))) <= 121.5) {
        //  int X = int(keisan_x(i, j, k));
        //  int Y = -int(keisan_y(i, j, k));
        //  pixels[(X+400)*height + (Y+400)] = color(255, 0, 0);
        //}
        //if ((abs(i) == 50 || abs(j) == 50 || abs(k) == 50)&&abs(i) <= 50&&abs(j) <= 50&&abs(k) <= 50 ) {
        //  int X = int(keisan_x(i, j, k));
        //  int Y = -int(keisan_y(i, j, k));
        //  //if (i == 50 && j == 50)println(X, Y, keisan_x(50, 50, 0)+400, keisan_y(50, 50, 0)+400);
        //  pixels[(Y+400)*width+(X + 400)] = color(255, map(sq(x0-i)+sq(y0-j)+sq(z0-k), 0, sqrt(sq(x1-x0) + sq(y1-y0)+ sq(z1-z0)), 255, 0), map(sq(x0-i)+sq(y0-j)+sq(z0-k), 0, sqrt(sq(x1-x0) + sq(y1-y0)+ sq(z1-z0)), 255, 0));
        //}
      }
    }
  }
  updatePixels();
  //目の位置の移動
  if (q)z0 += 3;
  if (a)x0 -= 3;
  if (w)y0 += 3;
  if (s)y0 -= 3;
  if (E)z0 -= 3;
  if (d)x0 += 3;
  if (z) {
    x0 += 1;
    y0 += 1;
    z0 += 1;
  }
  if (c) {
    x0 -= 1;
    y0 -= 1;
    z0 -= 1;
  }
  if (x0 <= 0)x0 = 0;
  if (y0 <= 0)y0 = 0;
  if (z0 <= 0)z0 = 0;
  scale(1, -1);
  translate(-400, -400);
  //fill(255, 0, 0);
  //ellipse( keisan_x(50, 50, 0)+400, -keisan_y(50, 50, 0)+400, 5, 5);
  fill(0);
  textSize(30);
  text("x0:"+x0+" y0:"+y0 + " z0:"+z0, 0, 30);
  //text("mouseX:"+mouseX+" mouseY:"+mouseY, 0, 80);
}
//ある点の空間座標を入れると平面座標に変換して点を描画する関数。
void p(float x, float y, float z) {
  ellipse(keisan_x(x, y, z), keisan_y(x, y, z), 15, 15);
}
//ある始点と終点の空間座標を入れると平面座標に変換して辺を描画してくれる関数。
void l(float x, float y, float z, float x2, float y2, float z2) {
  line(keisan_x(x, y, z), keisan_y(x, y, z), keisan_x(x2, y2, z2), keisan_y(x2, y2, z2));
}
//ある点の空間座標を入れると平面座標に変換してx座標を返す。
float keisan_x(float x, float y, float z) {
  float result = 0;
  PVector v, w, V, W, v_, w_;
  float D, E, F;
  v = new PVector(x0 + e/A, y0-e/B, z0);
  w = new PVector(x0, y0, z0-sq(e)/(A*B));
  float n = -B;
  float m = A;
  //if (A == 0) {
  //  n = 0;
  //}
  //if (B == 0) {
  //  m = 0;
  //}
  V = new PVector(n, m, 0);
  F = 1;
  D = -(A*C)/(sq(B)+sq(A));
  E = -(B*C)/(sq(B)+sq(A));
  W = new PVector(D, E, F);
  V.normalize(V);
  W.normalize(W);
  if ((x0 < 0|| y0 < 0) )V.mult(-1);//&& !(x0 < 0&& y0 < 0)
  if (x0 < 0&& y0 < 0)W.mult(-1);
  V.setMag(sqrt(sq(x1-x0) + sq(y1-y0)+ sq(z1-z0))/sqrt(125000));
  W.setMag(sqrt(sq(x1-x0) + sq(y1-y0)+ sq(z1-z0))/sqrt(125000));
  float k = (A*x + B*y + C*z-e)/(-sq(A)-sq(B)-sq(C));
  float s = 0, t = 0;
  t = (z + (1+k)*C)/(W.z);
  s = (x + (1+k)*A -t*W.x)/(V.x);
  if (V.x == 0) {
    s = (y + (1+k)*B -t*W.y)/(V.y);
  }
  return s;
}
//ある点の空間座標を入れると平面座標に変換してy座標を返す。
float keisan_y(float x, float y, float z) {
  float result = 0;
  PVector v, w, V, W, v_, w_;
  float D, E, F;
  v = new PVector(x0 + e/A, y0-e/B, z0);
  w = new PVector(x0, y0, z0-sq(e)/(A*B));
  float n =-B;
  float m = A;
  //if (A == 0) {
  //  n = 0;
  //}
  //if (B == 0) {
  //  m = 0;
  //}
  V = new PVector(n, m, 0);
  F = 1;
  D = -(A*C)/(sq(B)+sq(A));
  E = -(B*C)/(sq(B)+sq(A));
  //E = (V.x*C-V.y*C*F)/(V.x*A+V.y*B);
  //D = (V.x*E-C)/V.y;
  //if (V.y != 0) {
  //  D = (V.x*E-C)/V.y;
  //} else {
  //  D = (-B*E-C*F)/A;
  //}
  W = new PVector(D, E, F);
  V.normalize(V);
  W.normalize(W);
  if ((x0 < 0|| y0 < 0)) {
    V.mult(-1);// && !(x0 < 0&& y0 < 0)
    //println("A");
  }
  if (x0 < 0&& y0 < 0) {
    W.mult(-1);
    //println("B");
  }
  V.setMag(sqrt(sq(x1-x0) + sq(y1-y0)+ sq(z1-z0))/sqrt(125000));
  W.setMag(sqrt(sq(x1-x0) + sq(y1-y0)+ sq(z1-z0))/sqrt(125000));
  float k = (A*x + B*y + C*z-e)/(-sq(A)-sq(B)-sq(C));
  float s = 0, t = 0;
  t = (z + (1+k)*C)/(W.z);
  s = (x + (1+k)*A -t*W.x)/(V.x);
  if (V.x == 0) {
    s = (y + (1+k)*B -t*W.y)/(V.y);
  }
  //println(s, t, V.x, V.y, V.z);
  return t;
}
boolean q, a, w, s, E, d, z, c;
//キー入力(適当なのでいい感じにカスタマイズしてください。)
void keyPressed() {
  if (key == 'q')q = true;
  if (key == 'a')a = true;
  if (key == 'w')w = true;
  if (key == 's')s = true;
  if (key == 'e')E = true;
  if (key == 'd')d = true;
  if (key == 'z')z = true;
  if (key == 'c')c = true;
}
void keyReleased() {
  if (key == 'q')q = false;
  if (key == 'a')a = false;
  if (key == 'w')w = false;
  if (key == 's')s = false;
  if (key == 'e')E = false;
  if (key == 'd')d = false;
  if (key == 'z')z = false;
  if (key == 'c')c = false;
}
