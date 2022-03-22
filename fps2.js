class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(b){
    let a = this;
    return new Vec2(a.x + b.x, a.y + b.y);
  }
}

class Ray2 {
  constructor(pos, way) {
    this.pos = pos;
    this.way = way;
  }
}

function setup() {
  createCanvas(480, 680);
}

function draw() {
  background(222);

  let walls = [];
  let tile = (
    '.O......' +
    'O.......' +
    '..O.....' +
    '..O.....' +
    '........' +
    '........' +
    '........' +
    '......O.' +
    'OO...OO.' +
    'OO...O..'
  );
  for(let y = 0; y < 20; y++){
    for (let x = 0; x < 8; x++) {
      if (tile[y*8 + x] === "O") {
        walls.push(new Ray2(new Vec2(x * 30, y *30), new Vec2(30, 0)));
        walls.push(new Ray2(new Vec2(x * 30, y *30), new Vec2(0, 30)));
        if (tile[y*8 + x + 1] === ".") {
          // point(x * 30 + 30, y *30)
          walls.push(new Ray2(new Vec2(x * 30 + 30, y *30), new Vec2(0, 30)));
        }
        if (tile[y*8 + x + 8] === ".") {
          // point(x * 30 , y *30 + 30)
          walls.push(new Ray2(new Vec2(x * 30, y *30 + 30), new Vec2(30, 0)));
        }
      }
    }
  }

  for(let wall of walls) {
    line(wall.pos.x, wall.pos.y, wall.pos.x + wall.way.x, wall.pos.y + wall.way.y);
  }

  let leftAngle = -PI;
  let rightAngle = 0;
  for(let r = leftAngle; r < rightAngle; r += PI/90){
    // console.log(r);
    let a = new Vec2(cos(r), sin(r));
    // line(mouseX,mouseY, mouseX + a.x * 100, mouseY + a.y * 100);
  }
}
