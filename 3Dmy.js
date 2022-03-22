function setup() {
  createCanvas(480, 600);

  let height = [
    [5.0, 4.0, 6.0, 5.0],
    [3.0, 4.0, 3.0, 5.0],
    [3.0, 4.0, 3.0, 2.0],
    [1.0, 1.0, 1.0, 1.0]
  ];

  fill("green");
  for (let y = 0; y < 4; y++) {
    for(let x = 0; x < 4; x++){
      strokeWeight(1);
      let level = height[y][x];//”z—ñ‚ðŽæ‚èo‚·
      let rootX = 200, rootY = 275;
      let botRootX = rootX + 48*x -48*y;
      let botRootY = rootY + 24*x + 24*y;
      let zxAxis = 48 - 48;//ZŽ²‚Ì‚˜¬•ª
      let zyAxis = -24 - 24;//ZŽ²‚Ì‚™¬•ª

      let bx1 = botRootX + 48;
      let by1 = botRootY + 24;
      let bx2 = botRootX;
      let by2 = botRootY + 48;
      let bx3 = botRootX - 48;
      let by3 = botRootY + 24;
      quad(botRootX, botRootY, bx1, by1, bx2, by2, bx3, by3);

      let topRootX = botRootX + zxAxis * level;
      let topRootY = botRootY + zyAxis * level;

      quad(bx1, by1, bx2, by2, topRootX + 48 - 48, topRootY + 24+ 24, topRootX + 48, topRootY + 24);
      quad(bx2, by2, bx3, by3, topRootX - 48, topRootY + 24, topRootX + 48 - 48, topRootY + 24 +  24);
      let tx1 = topRootX + 48;
      let ty1 = topRootY + 24;
      let tx2 = topRootX;
      let ty2 = topRootY + 48;
      let tx3 = topRootX - 48;
      let ty3 = topRootY + 24;
      quad(topRootX, topRootY, tx1, ty1, tx2, ty2, tx3, ty3);
      //point(200 + 48*x -48*y, 200 + 24*x + 24*y);
      //quad(x,y,+48, y+24, x+48-48, y + 24 + 24, x-48, y+24);
    }
  }

}
function draw() {
  let ix = 0, iy = 0;
  if(keyIsDown(68)) ix = 1;
  if(keyIsDown(83)) iy = 1;
  if(keyIsDown(65)) ix = -1;
  if(keyIsDown(87)) iy = -1;
  let x ,y;
  x += ix;
  y += iy;
  console.log(x, y);
  circle(ix, iy, 10);

}
