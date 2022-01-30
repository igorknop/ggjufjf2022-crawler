import Button from "../Button.mjs";
import { BACKGROUND_COLOR, FRONT_COLOR } from "../util/Colors.mjs";
import getXY from "../util/getXY.mjs";
import writeText from "../util/wrapText.mjs";

export default class RulesScene {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.expire = 1;
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
    this.expire = 1;
    requestAnimationFrame((t) => {
      this.step(t);
    });
  }
  stop(){
    
  }

  setup() {
    this.expire = 1;
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
    this.expire += this.expire > 0 ? -1 * this.dt : 0;
    this.ctx.fillStyle = BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = FRONT_COLOR;
    this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    this.mainMenu.draw(this.ctx);


    if (this.expire < 0) {
      this.mainMenu.draw(this.ctx);}
    this.ctx.fillStyle = FRONT_COLOR;
    let fontSize = 0.055 * this.canvas.height;
    this.ctx.font = `${fontSize}px 'Orbitron'`;
    this.ctx.textAlign = "center";
    this.ctx.fillText(`How to Play`, this.canvas.width/2, 0.15*this.canvas.height);

    fontSize = 0.01901428571428571 * this.canvas.height;
    this.ctx.font = `${fontSize}px 'Orbitron'`;
    this.ctx.textAlign ='left';
    let text = `You were thrown in the dungeon and must escape before time goes by.`;
    writeText(this.ctx, text, 0.1*this.canvas.width, 0.33*this.canvas.height, 0.8*this.canvas.width, fontSize*2);   
    text = `Drag the cards to the enemies to fight them. Who receives many tokens equal to their hit points, die.`;
    writeText(this.ctx, text, 0.1*this.canvas.width, 0.43*this.canvas.height, 0.8*this.canvas.width, fontSize*2);   

    text = `Dead monsters go to the loot pile as an item. You can choose a single card to add to your deck, and the others will turn into gold coins.`;
    writeText(this.ctx, text, 0.1*this.canvas.width, 0.57*this.canvas.height, 0.8*this.canvas.width, fontSize*2);   

    text = `Use other cards as resources to boost strong effects.`;
    writeText(this.ctx, text, 0.1*this.canvas.width, 0.74*this.canvas.height, 0.8*this.canvas.width, fontSize*2);   


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
    if (this.expire > 0) {
      return;
    }
    const [x,y] = getXY(e, this.canvas);

    if (this.mainMenu.hasPoint({ x, y })) {
      this.game.assets.play("click");
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
