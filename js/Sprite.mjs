import { CARD_H, CARD_W, PRIEST } from "../data/AllTimeConstants.mjs";
import { TYPE_COLOR } from "../data/AllTimeConstants.mjs";


export default class Sprite {
  constructor({type = PRIEST, w=CARD_W, h=CARD_H, draggable=true, x=0, y=0, text=""}) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.draggable = draggable;
    this.color = TYPE_COLOR[PRIEST];
    this.text = text;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = TYPE_COLOR[this.type];
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
  }
  hasPoint(point) {
    return !(
      this.x + this.w / 2 < point.x ||
      this.x - this.w / 2 > point.x ||
      this.y + this.h / 2 < point.y ||
      this.y - this.h / 2 > point.y
    );
  }
  collidedWith(target) {
    return !(
      this.x + this.w / 2 < target.x - this.w / 2 ||
      this.x - this.w / 2 > target.x + this.w / 2 ||
      this.y + this.h / 2 < target.y - this.h / 2 ||
      this.y - this.h / 2 > target.y + this.h / 2
    );
  }
}
