import Button from "./Button.mjs";
import { assets } from "./Game.mjs";
import { BUTTON_BACKGROUND_COLOR, BUTTON_TEXT_COLOR } from "./util/Colors.mjs";

export default class NextTurnButton extends Button {
  constructor(x, y, w, h, text, useImage = true) {
    super(x, y, w, h, text, useImage);
  }
  draw(ctx) {
    ctx.beginPath();
    if (this.useImage) {
      ctx.drawImage(
        assets.img("hourglass"),
        this.x - this.w * 0.5,
        this.y - this.h * 0.5,
        this.w * 1,
        this.h * 1
      );
    } else {
      ctx.fillStyle = BUTTON_BACKGROUND_COLOR;
      ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
      ctx.strokeStyle = BUTTON_TEXT_COLOR;
    }
  }
}
