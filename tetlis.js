class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw(){
    //push();
    let s = 25;
    fill(0, 120, 0);
    rect(this.x*s, this.y*s, s, s);
    //pop();
  }
}


class Field {
  constructor() {
    this.tiles = [
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1,1],
    ];
  }

  tileAt(x, y){
    return this.tiles[y][x];
    //
  }

  draw(){
    for(let x = 0; x < 12; x++){
      for(let y = 0; y < 21; y++){
        if (this.tiles[y][x]) {
          new Block(x, y).draw();
        }
      }
    }
  }
}
class Mino {
  constructor(x, y, rot, shape) {
    this.x = x;
    this.y = y;
    this.rot = rot;
    this.shape = shape;
  }
  calcBlocks(){
    let blocks = [];
    switch (this.shape) {
      case 0:
        blocks = [new Block(0, 0), new Block(0, 1), new Block(1, 0), new Block(1, 1)];
        break;
      case 1:
        blocks = [new Block(0, 0), new Block(0, 1), new Block(0, 2), new Block(0, 3)];
        break;
      case 2:
        blocks = [new Block(0, 0), new Block(0, 1), new Block(2, 1), new Block(1, 1)];
        break;
      case 3:
        blocks = [new Block(0, 0), new Block(0, 1), new Block(0, 2), new Block(1, 2)];
        break;
      case 4:
        blocks = [new Block(0, 0), new Block(0, 1), new Block(0, 2), new Block(-1, 2)];
        break;
      case 5:
        blocks = [new Block(0, 0), new Block(0, -1), new Block(1, 0), new Block(-1, 0)];
        break;
      case 6:
        blocks = [new Block(0, 0), new Block(0, 1), new Block(1, 0), new Block(1, 1)];
        break;
      default:

    }

    //âÒì]
    for(let r = 0; r < rot; r++){
      blocks = blocks.map()
    }

    blocks.forEach(b =>{
      b.x += this.x,
      b.y += this.y
    });
    return blocks;
  }

  putBlock(mino){
    let field = new Field();
    let blocks = mino.calcBlocks();
    for (let b of blocks) {
      field.tiles[b.y, b.x] = 1;
    }
  }

  draw(){
    let blocks = this.calcBlocks();
    for (let b of blocks) {
      b.draw();
    }
  }
  copy(){
    return new Mino(this.x, this.y, this.rot, this.shape);
  }
}

class Game {
  constructor() {
    this.mino = new Mino(7, 12, 2, floor(random(7)));
    this.field = new Field();
    this.fc = 0;
  }

  static isMinoMovable(mino){
    let field = new Field();
    //fieldìÒå¬çÏÇ¡ÇøÇ·Ç¡ÇƒÇÈ
    let futureMino = mino.copy();
    let blocks = futureMino.calcBlocks();
    for (let b of blocks) {
      return field.tileAt(b.x, b.y);
    }
    return ;
  }

  proc(){
    if (this.fc % 20 === 19) {
      let futureMino = this.mino.copy();
      futureMino.y++;
      if (!Game.isMinoMovable(futureMino)) {
        this.mino.y += 1;
      } else {
        let blocks = this.mino.calcBlocks();
        for (let b of blocks) {
          this.field.tiles[b.x, b.y] = 1;
          //
        }
        this.mino = new Mino(2, 12, 2, 2);
      }
      //isMinoMovable(futureMino);
    }
    background(64);
    //ï`âÊÇ≥ÇÍÇΩÇ‡ÇÃÇÕécÇÈÇ©ÇÁÅAbackgroundÇ≈ìhÇËÇ¬Ç‘Ç∑
    this.mino.draw();
    this.field.draw();
    this.fc++;
  }
  /*proc(){
    let mino = new Mino(2, 2, 2, 0);
    let blo = mino.calcBlocks();
    this.fc++;
    console.log(this.fc);
    if (this.fc % 20 === 19) {
      console.log(fc);
      for (let b of blo) {
        console.log("a");
        b.y++;
        b.draw();
      }
    }
  }*/
}

let game;

function keyPressed() {
  if (keyCode === 65) {
    game.mino.x -=1;
  }
  if (keyCode === 68) {
    game.mino.x +=1;
  }
}

function setup() {
  createCanvas(400, 600);
  background(64);
  game = new Game();
}

function draw() {

  game.proc();
  /*let mino = new Mino(2, 2, 2, 0);
  let blo = mino.calcBlocks();
  if (fc % 200 === 199) {
    fc++;
    console.log(fc);
    b.y++;
  }
  for (let b of blo) {
    b.draw();
  }*/
}
