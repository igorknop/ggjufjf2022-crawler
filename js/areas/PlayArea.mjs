import { TYPE_COLOR , FAST, CARD_H } from "../../data/AllTimeConstants.mjs";
import { assets } from "../Game.mjs";
import Sprite from "../Sprite.mjs";
import { FRONT_COLOR } from "../util/Colors.mjs";

export default class PlayArea extends Sprite {
  constructor({
    cards = [],
    type = 0,
    effect = () => {},
    w = CARD_H*1.7,
    h = CARD_H*1.7,
    x = 0,
    y = 0,
    draggable = true,
  }) {
    super({x,y,w,h,type, draggable});
    this.type = type;
    this.w = w;
    this.h = h;
    this.cards = cards;
    this.effect = effect;
  }
  draw(ctx) {
    ctx.strokeStyle = FRONT_COLOR;
    ctx.lineWidth = 3;
    ctx.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    ctx.lineWidth = 1;
    const r = 0.07;
    const w = r * 0.75 * ctx.canvas.width;
    const h = r * ctx.canvas.width;
    const g = h / 8;
    this.cards.forEach((c, k) => {
      //const c = k % 1;
      //const l = Math.floor(k / 1);
      const x = this.x + (w + g) * k - w * 1.7;
      const y = this.y + (h + g);
      c.x = x;
      c.y = y;
      c.draw(ctx);
    });
  }

  add(card) {
    this.cards.push(card);
    this.updatePositions();
    return true;
  }
  updatePositions() {
    this.cards.forEach((card, k) => {
      const n = k;
      const l = Math.floor(n / this.max);
      const c = n % this.max;
      card.x =
        this.x - this.w/2 + card.w/2 + this.gap + (card.w + this.gap) * c + (l % 2 === 0 ? 0 : card.w / 2);
      card.y = this.y  + (card.h / 3) * l;
  
    });    
  }

}
