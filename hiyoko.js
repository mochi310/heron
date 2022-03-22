function setup() {
  createCanvas(480, 480);
  strokeWeight(3);
}

function draw() {
  let sec = millis() / 1000;
  //‹ó
  background(51, 153, 255);

  //‰_
  fill(204, 255, 255);
  noStroke();
  ellipse((120 * sec) % (width + 240) - 120, 60, 120, 60);

  //°
  let w = width;
  let h = height;
  fill(102, 153, 0);
  quad(w / 2, h * 1 / 3, w, h * 2/3, w / 2, h, 0, h * 2 / 3);
  fill(51, 102, 0);
  triangle(w, h * 2/3, w, h, w / 2, h);
  triangle(w / 2, h, 0, h, 0, h * 2/3);

  drawChick(w / 2, h * 2/3, PI / 6, sec);
}

function drawChick(x, y, angle, sec) {
  let normAngle = angle => angle % (2 * PI);
  let isFront = angle => angle > 0 && angle < PI;

  let bodyRadius = 60;
  let bodyAngle = normAngle(sec * PI);
  let bodyShake = bodyRadius / 12 * cos(bodyAngle);
  let bodyX = width / 2;
  let bodyY = height / 3 * 2 + bodyShake;
  let bodyDrawer = _ => {
    fill(255, 204, 102);
    circle(x, y, 2 * bodyRadius);
  }
  //console.log((120*sec)%(width+120)-60);


  let headRadius = 45;
  let headX = x + headRadius / 2 * cos(bodyAngle);
  let headY = y - bodyRadius;
  let headDrawer = _ => {
    fill(255, 204, 102);
    circle(headX, headY, 2 * headRadius);
  }

  if (isFront(bodyAngle)) {
    bodyDrawer(); headDrawer();
  } else {
    headDrawer(); bodyDrawer();
  }

  let beakRadius = 15;
  let beakX = headX + headRadius * cos(bodyAngle);
  let beakY = headY;
  if (isFront(bodyAngle)) {
    fill(255, 153, 51);
    circle(beakX, beakY, 2 * beakRadius);
  }

  for (let angleOffset of [-4 / PI, 4 / PI]) {
    let eyeAngle = normAngle(bodyAngle + angleOffset);
    let eyeX = headX + headRadius * cos(eyeAngle);
    let eyeY = headY;
    let eyeRadius = 12;
    if (isFront(eyeAngle)) {
      fill(102, 0, 0);
      circle(eyeX, eyeY, eyeRadius);
    }
  }

}
