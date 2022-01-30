import Sprite from "./Sprite.mjs";
import { assets } from "./Game.mjs";
import { BUTTON_BACKGROUND_COLOR, BUTTON_TEXT_COLOR } from "./util/Colors.mjs";

export default class Button extends Sprite {
  constructor(x, y, w, h, text, useImage = true) {
    super({});
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
    this.useImage = useImage;
  }
  draw(ctx) {
    ctx.beginPath();
    let fontSize = 0.022 * ctx.canvas.height;
    ctx.font = `${fontSize}px 'Orbitron'`;  
    if (this.useImage) {
      ctx.drawImage(
        assets.img("button"),
        this.x - this.w * 0.65,
        this.y - this.h * 0.9,
        this.w * 1.32,
        this.h * 1.9
      );
    } else {
      ctx.fillStyle = BUTTON_BACKGROUND_COLOR;
      ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
      ctx.strokeStyle = BUTTON_TEXT_COLOR;
      ctx.lineWidth = 2;
      ctx.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    }
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText(this.text, this.x, this.y + this.w * 0.04);
  }
}
