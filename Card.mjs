import Sprite from "./Sprite.mjs";
import { TYPE_COLOR } from "./data/AllTimeConstants.mjs";
import { assets } from "./Game.mjs";
import { CARD_W } from "./data/AllTimeConstants.mjs";
import { CARD_H } from "./data/AllTimeConstants.mjs";
import { BACKGROUND_COLOR, FRONT_COLOR } from "./util/Colors.mjs";

const PEOPLE_IMAGES = [
  { sx: 243, sy: 2279, sw: 276, sh: 364 },
  { sx: 524, sy: 2279, sw: 276, sh: 364 },
  { sx: 810, sy: 2279, sw: 276, sh: 364 },
  { sx: 1096, sy: 2279, sw: 276, sh: 364 },
];

export default class Card extends Sprite {
  constructor({ w= CARD_W, h= CARD_H, text="Card ?" }) {
    super({
      w, h, text,
    });
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    ctx.lineWidth = 2;
    ctx.strokeStyle = FRONT_COLOR;
    ctx.fillStyle = FRONT_COLOR;
    ctx.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    ctx.fillText(this.text, this.x, this.y + this.w * 0.04);
  }
}
