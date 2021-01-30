import Button from "./Button.mjs";

export const bg = new Image();
bg.src = "./assets/gamejam.png";

export default class EndScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
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
    this.ctx.fillStyle = "hsl(200, 7%, 84%)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = "hsl(200, 7%, 74%)";
    this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = "black";
    this.ctx.font = "50px bold monospace";
    this.ctx.textAlign = "center";
    this.ctx.fillText(`FIM`, this.canvas.width/2, this.canvas.height/2);
    requestAnimationFrame((t) => {
      this.step(t);
    });
    this.t0 = t;
  }

  createAreas() {
    this.newGame = new Button(
      this.canvas.width - 30,
      this.canvas.height - 100,
      50,
      30,
      "New Game"
    );
  }

  mousedown(e) {
    const x = e.pageX - this.canvas.offsetLeft;
    const y = e.pageY - this.canvas.offsetTop;
    if (this.newGame.hasPoint({ x, y })) {
      
    }
  }
  mouseup(e) {
    
  }
  click(e) {
    const x = e.pageX - this.canvas.offsetLeft;
    const y = e.pageY - this.canvas.offsetTop;
    if (this.newGame.hasPoint({ x, y })) {
      
    }
  }
  mousemove(e) {
   
  }
  mouseout(e) {
  
  }

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
