// ※
// このような米印から始まるコメントは、自分のJavaScript+p5.jsの
// 入門講座を見たかた向けの補足です。


// ゲームの状態をあらわすクラス
class Game {
  constructor() {
    // プレイヤーの座標
    this.px = 1;
    this.py = 0;
    // 荷物の座標
    this.bx = 3;
    this.by = 1;
    // マークの座標
    this.mx = 5;
    this.my = 1;
  }
  copy() {
    let c = new Game();
    c.px = this.px;
    c.py = this.py;
    c.bx = this.bx;
    c.by = this.by;
    c.mx = this.mx;
    c.my = this.my;
    return c;
  }
  // いまのゲームの状態から、プレイヤーが(vx,vy)移動した状態を計算する
  movePlayer(vx, vy) {
    let c = this.copy();
    c.px += vx;
    c.py += vy;
    if (c.px === c.bx && c.py === c.by) {
      //荷物が押される
      c.bx += vx;
      c.by += vy;
    }
    return c;
  }
  // 関数の配列をもとに、ゲームの状態を計算する
  // 例: funcs = [e,s,s] ならば、s(s(e(i))) が計算される。
  calculate(funcs) {
    let c = this.copy();
    for(let f of funcs) {
      c = f(c);
    }
    return c;
  }
  // いまのゲームの状態を、画面に描画する
  draw() {
    // 画面をまっさらに
    background(240);
    // グリッドを描画
    for(let y=0; y<201; y+=50) {
      for(let x=0; x<400; x+=50) {
        line(0, y, 400, y);
        line(x, 0, x, 200);
      }
    }
    // ゲームの状態を描画
    textAlign(LEFT, TOP);
    textSize(48);
    text('人', 50*this.px, 50*this.py);
    text('荷', 50*this.bx, 50*this.by);
    text('☆', 50*this.mx, 50*this.my);
    strokeWeight(40)
    point(50, 50)
  }
}

let game = new Game();
let inputs = [];


// ※
// 「引数 => 式」は、アロー関数式(arrow function expression)をあらわす。
// アロー関数式を用いると、関数を短く書ける。
// 例えば「let f = n => n*2;」 は、「function f(n) {return n*2;}」とほぼ同じ意味。
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Arrow_functions

// 変数i。初期状態をあらわす。
let i = new Game();
// 関数e。右への移動をあらわす。
let e = t => t.movePlayer(1, 0);
// 関数s。下への移動をあらわす。
let s = t => t.movePlayer(0, 1);


function setup() {
  createCanvas(400,400);

  // createButton関数で作ったボタンに、CSSで大きさやレイアウトを設定する
  // ……という関数
  let beautify = button => {
    button.style('font-size', '2em');
    button.style('width', width/3 + 'px');
    button.style('margin-top', '0.15em');
  }

  // ※
  // アロー関数式では、引数がいらない場合は、アンダーバー _ を用いる。
  // また、「引数 => {式1;式2;式3;}」といった具合に、ブロックを用いると式を複数書ける。

  // 画面下部のボタンを作る
  let buttonSouth = createButton('↓');
  buttonSouth.mousePressed(_=>{
    // 下ボタンが押されたら、関数sを配列に追加して
    inputs.push(s);
    // ゲームの状態を再計算する
    game = new Game().calculate(inputs);
  });
  beautify(buttonSouth);

  let buttonEast = createButton('→');
  buttonEast.mousePressed(_=>{
    // 右ボタンが押されたら、関数eを配列に追加して
    inputs.push(e);
    // ゲームの状態を再計算する
    game = new Game().calculate(inputs);
  });
  beautify(buttonEast);

  let buttonRedo = createButton('戻す');
  buttonRedo.mousePressed(_=>{
    // 戻るボタンが押されたら、最後の入力（関数）を削除して
    inputs.pop();
    // ゲームの状態を再計算する
    game = new Game().calculate(inputs);
  });
  beautify(buttonRedo);
}

function draw() {
  // ゲームの状態を描画
  game.draw();

  // ※
  // Stringクラスを用いて、式を組み立てて表示しています。
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String
  textSize(24);
  let y = 200;
  text('式での表現', 0, y+=30);
  {
    let s = 'i';
    for(let f of inputs) {
      s = f.name + '(' + s + ')';
    }
    text('= '+s, 0, y+=30);
  }
  {
    let s = '';
    for(let f of inputs) {
      s = '∘' + f.name + s;
    }
    if (s.length > 1) {
      // 余計な記号を削除
      s = s.slice(1, s.length);
    }
    text('= ('+s+')(i)', 0, y+=30);
  }
  text('配列の中身', 0, y+=40);
  {
    let s = '';
    for(let f of inputs) {
      s += f.name + ',';
    }
    if (s.length > 1) {
      // 余計な記号を削除
      s = s.slice(0, s.length-1);
    }
    text('= ['+s+']', 0, y+=30);
  }
}
