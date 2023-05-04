"use strict";

const canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// 変数定義-----------------------------------------------------------------
// ボール定義
let x = canvas.width / 2; //ボールの現在地座標
let y = canvas.height - 30; //ボールの現在地座標
let dx = 2; //進む方向
let dy = 2; //進む方向
const ballRadius = 10;
let ballSpeed = 100;
// パドル定義
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;//パドルの初期値
// キーボード入力定義
let pressedLeft = false;
let pressedRight = false;
// 各ブロック定義
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
// スコア
let score = 0;
// ライフ
let lives = 3;

// ブロック設定---------------------------------------------------------------------
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// ボールがブロックに当たったか判定、向きを逆にする
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (
          b.x < x &&
          x < b.x + brickWidth &&
          b.y < y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score++;
          //全てブロックを消したら繰り返しを停止する   
          if(score===brickRowCount*brickColumnCount){
            alert(`YOU WIN! CLEAR`);
            document.location.reload();
            // clearInterval(timeOut);
          }
        }
      }
    }
  }
}

// パドル移動------------------------------------------------------------------------
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener('mousemove',mouseMoveHandler,false);
// キーボード押された左右を判定する
function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    pressedRight = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    pressedLeft = true;
  }
}
// キーボード離れた左右を判定する
function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    pressedRight = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    pressedLeft = false;
  }
}
// マウスの移動を取得する
function mouseMoveHandler(e){
  const relativeX = e.clientX-canvas.offsetLeft;
  if(relativeX>0 && relativeX<canvas.width){
    paddleX = relativeX-(paddleWidth/2);
  }
}
// パドルを描画する
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// ボール描画---------------------------------------------
// ボールを描画する
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// スコア・ライフ描画---------------------------------------------
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Score:${score}`, 8, 20);
}
function drawLife(){
  ctx.font = "16px Arial";
  ctx.fillStyle="#0095DD";
  ctx.fillText(`Life:${lives}`,canvas.width-50,20);
}

// 1秒ごと全体描画--------------------------------------------
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawBricks();
  collisionDetection();
  drawScore();
  drawLife();

  // ボールが上の壁に当たったか判定する
  if (y < 0 + ballRadius) {
    dy = -dy;
  } else if (y > canvas.height - ballRadius) {
    // ボールが下の辺に衝突したときに、パドルの間にいるか判定する
    if (x >= paddleX && x <= paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;
      if(!lives){
        alert(`GAME OVER`);
        document.location.reload();
        // clearInterval(timeOut);
      }else{
        alert(`残りライフ：${lives}`);
        x = canvas.width / 2; //ボールの現在地座標
        y = canvas.height - 30; //ボールの現在地座標
        paddleX = (canvas.width - paddleWidth) / 2;
        dx = 5; //進むスピード
        dy = 5; //進むスピード
        pressedLeft = false;
        pressedRight =false;
      }
    }
  }
  // ボールが左右の壁に当たったか判定
  if (x < 0 + ballRadius || x > canvas.width - ballRadius) {
    dx = -dx;
  }

  // パドルの位置を取得する,キャンバス内で位置を返す
  if(pressedRight && paddleX < canvas.width-paddleWidth/2) {
    paddleX += 7;
  }
  else if(pressedLeft && paddleX > 0 -paddleWidth/2) {
    paddleX -= 7;
  }
  requestAnimationFrame(draw);
    // ボールを1秒ごとに位置を変える
    x += dx;
    y -= dy;
}

draw();
// const timeOut = setInterval(draw,ballSpeed);