import Button from "../Button.mjs";
import { BACKGROUND_COLOR, FRONT_COLOR } from "../util/Colors.mjs";
import getXY from "../util/getXY.mjs";
import writeText from "../util/wrapText.mjs";

export default class StartScene {
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
    requestAnimationFrame((t) => {
      this.step(t);
    });
  }
  stop() { }
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

    if (this.assets.progresso() < 100 || this.expire > 0) {
      let fontSize = 0.03571428571428571 * this.canvas.height;
      this.ctx.font = `${fontSize}px 'Orbitron'`;
      this.ctx.textAlign = "center";
      this.ctx.fillStyle = FRONT_COLOR;
      this.ctx.fillText(
        `Loading... ${this.assets.progresso()}%`,
        0.5 * this.canvas.width,
        0.56 * this.canvas.height,
        this.canvas.width
      );
    } else {
      let fontSize = 0.1 * this.canvas.width;
      this.ctx.fillStyle = FRONT_COLOR;
      this.ctx.textAlign = "center";

      this.ctx.font = `${fontSize}px 'Orbitron'`;
      writeText(this.ctx, "CRAWLER",
        0.5 * this.canvas.width,
        0.4 * this.canvas.height,
        this.canvas.width * 0.8,
        2 * fontSize
      );

      this.newGame.draw(this.ctx);
      this.credits.draw(this.ctx);
      this.rules.draw(this.ctx);
    }

    requestAnimationFrame((t) => {
      this.step(t);
    });
    this.t0 = t;
  }

  createAreas() {
    this.newGame = new Button(
      0.5 * this.canvas.width,
      0.7 * this.canvas.height,
      0.3 * this.canvas.width,
      0.07 * this.canvas.height,
      "New Game",
      false
    );
    this.rules = new Button(
      0.5 * this.canvas.width,
      0.8 * this.canvas.height,
      0.3 * this.canvas.width,
      0.07 * this.canvas.height,
      "How to Play",
      false
    );
    this.credits = new Button(
      0.5 * this.canvas.width,
      0.9 * this.canvas.height,
      0.3 * this.canvas.width,
      0.07 * this.canvas.height,
      "Credits",
      false
    );
  }

  mousedown(e) {
    if (this.assets.progresso() < 100.0 || this.expire > 0) {
      return;
    }
    const [x, y] = getXY(e, this.canvas);
    if (this.newGame.hasPoint({ x, y })) {
      this.game.setScene("game");
      this.game.assets.play("click");
    }
    if (this.credits.hasPoint({ x, y })) {
      this.game.setScene("credits");
      this.game.assets.play("click");
    }
    if (this.rules.hasPoint({ x, y })) {
      this.game.setScene("rules");
      this.game.assets.play("click");
    }
  }
  mouseup(e) { }
  click(e) {
    this.mousedown(e);
  }
  mousemove(e) { }
  mouseout(e) { }

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
