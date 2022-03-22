class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(a){
    let b = this;
    return new Vec2(a.x + b.x, a.y + b.y);
  }
}

class QuadDrawer {
  constructor(vertexes) {
    this.vertexes = vertexes;
  }
  rooting(root){
    let xAxis = new Vec2(48, 24);
    let yAxis = new Vec2(-48, 24);
    let tvs = [root, root.add(xAxis), root.add(xAxis).add(yAxis), root.add(yAxis)];
    return tvs;
  }
  draw(){
    fill("green");
    stroke("black");
    //let v = this.rooting(new Vec2(100, 100));
    //quad(v[0].x, v[0].y, v[1].x, v[1].y, v[2].x, v[2].y, v[3].x, v[3].y);
  }
}

class Game {
  constructor() {

  }
  proc(){

  }

  draw(){
    fill("green");
    stroke("black");
    let v = new QuadDrawer().rooting(new Vec2(100, 100));
    quad(v[0].x, v[0].y, v[1].x, v[1].y, v[2].x, v[2].y, v[3].x, v[3].y);
  }
}

let game;
game = new Game();

function setup() {
}

function draw() {
  game.proc();
  game.draw();
}
