import Button from "../Button.mjs";
import { BACKGROUND_COLOR, FRONT_COLOR } from "../util/Colors.mjs";
import getXY from "../util/getXY.mjs";

export default class EndScene {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.expire = 180;
    this.grace = 5;
    this.reputation = 5;
    this.dragging = null;
    this.t0;
    this.dt;
    this.areas = {};
    const touches = [];
    this.createAreas();
  }
  start() {
    requestAnimationFrame((t) => {
      this.step(t);
    });
  }
  stop(){
    
  }

  setup() {
    this.canvas.onmousedown = (e) => {
      this.mousedown(e);
    };
    this.canvas.onmouseup = (e) => {
      this.mouseup(e);
    };
    this.canvas.onclick = (e) => {
      this.click(e);
    };
    this.canvas.onmousemove = (e) => {
      this.mousemove(e);
    };
    this.canvas.onmouseout = (e) => {
      this.mouseout(e);
    };
    this.canvas.ontouchstart = (e) => {
      this.touchstart(e);
    };
    this.canvas.ontouchend = (e) => {
      this.touchend(e);
    };
    this.canvas.ontouchmove = (e) => {
      this.touchmove(e);
    };
  }

  step(t) {
    this.t0 = this.t0 ?? t;
    this.dt = (t - this.t0) / 1000;
    this.ctx.fillStyle = BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = FRONT_COLOR;
    this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = FRONT_COLOR;
    let fontSize = 0.075 * this.canvas.height;
    this.ctx.font = `${fontSize}px 'Orbitron'`;
    this.ctx.textAlign = "center";
    this.ctx.fillText(`Credits`, this.canvas.width/2, 0.4*this.canvas.height);

    fontSize = 0.02271428571428571 * this.canvas.height;
    this.ctx.font = `${fontSize}px 'Orbitron'`;
    this.ctx.fillText(`Igor Knop (Game Design/Programming)`, 0.5*this.canvas.width, 0.55*this.canvas.height);
    this.ctx.fillText(`Codebase of Forgothen Gods of GGJ21`, 0.5*this.canvas.width, 0.75*this.canvas.height);

    this.mainMenu.draw(this.ctx);

    requestAnimationFrame((t) => {
      this.step(t);
    });
    this.t0 = t;
  }

  createAreas() {
    this.mainMenu = new Button(
      0.5 * this.canvas.width,
      0.85 * this.canvas.height,
      0.25 * this.canvas.width,
      0.05357142857142857 * this.canvas.height,
      "Main Menu",
      false
    );
  }

  mousedown(e) {
    const [x,y] = getXY(e, this.canvas);

    if (this.mainMenu.hasPoint({ x, y })) {
      this.game.setScene("start");
    }
  }
  mouseup(e) {}
  click(e) {
    const [x,y] = getXY(e, this.canvas);

  }
  mousemove(e) {}
  mouseout(e) {}

  touchstart(e) {
    const newTouch = e.changedTouches[0];
    this.mousedown(newTouch);
  }
  touchend(e) {
    const newTouch = e.changedTouches[0];
    this.mouseup(newTouch);
  }
  touchmove(e) {
    e.preventDefault();
    const newTouch = e.changedTouches[0];
    this.mousemove(newTouch);
  }
}
