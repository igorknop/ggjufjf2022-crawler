import Game from "./Game.mjs";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ASPECT = 1.80149015434;
const cw = document.body.clientWidth;
const ch = document.body.clientHeight;
if (ch > cw) {
  canvas.height = ch;
  canvas.width = ch / ASPECT;
  if (canvas.width > cw) {
    canvas.width = cw;
    canvas.height = cw * ASPECT;
  }
} else {
  canvas.width = cw;
  canvas.height = cw * ASPECT;
  if (canvas.height > ch) {
    canvas.height = ch;
    canvas.width = ch / ASPECT;
  }
}
canvas.width = canvas.width*3;
canvas.height = canvas.height*3;
canvas.style.width = canvas.width/3 + "px";
canvas.style.height = canvas.height/3 + "px";

const game = new Game(canvas);
game.setup();
game.start();
