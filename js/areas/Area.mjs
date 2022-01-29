import { CARD_H, CARD_W } from "../../data/AllTimeConstants.mjs";
import { FRONT_COLOR } from "../util/Colors.mjs";

export default class Area {
  constructor({ title = "", x = 0, y = 0, visible = true, cards = [], max = 5, gap = 2, w = (CARD_W * 5 + 12), h = CARD_H + 12 }) {
    this.x = x;
    this.y = y;
    this.cards = cards;
    this.title = title;
    this.max = max;
    this.visible = visible;
    this.gap = gap;
    this.w = w;
    this.h = h;
  }

  loadAll(cardList) {
    cardList.forEach((c) => {
        this.add(c);
    });
  }

  add(card) {
    card.draggable = false;
    this.cards.push(card);
    this.updatePositions();
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

  draw(ctx) {
    if (!this.visible) return;
    ctx.strokeStyle = FRONT_COLOR;
    ctx.lineWidth = 3;
    ctx.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    ctx.lineWidth = 1;
    ctx.font = "15px 'Orbitron'";
    ctx.fillStyle = FRONT_COLOR;
    ctx.fillText(this.title, this.x, this.y);
    this.cards.forEach((p) => {
      p.draw(ctx);
    });
  }

  transfer(sourceArea, quantity = 1) {
    let transferCard = sourceArea.cards.splice(0, quantity);
    transferCard.forEach((person) => {
      this.add(person);
    });
    this.updatePositions();
  }

  addAll(sourceArea) {
    this.transfer(sourceArea, sourceArea.size());
    this.updatePositions();
  }

  delete(card) {
    const idx = this.cards.indexOf(card);
    const targetCard = this.cards.splice(idx, 1);
    this.updatePositions();
    return targetCard;
  }

  size() {
    return this.cards.length;
  }

  countPeople() {
    let count = [0, 0, 0, 0];
    this.cards.forEach((person) => {
      count[person.type]++;
    });
    return count;
  }

  drawCount(ctx) {
    if (!this.visible) return;
    let counts = this.countPeople();
    let fontSize = 0.04 * ctx.canvas.height;
    ctx.font = `${fontSize}px 'Skranji'`;
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "black";
    for (let i = 0; i < counts.length; i++) {
      ctx.strokeText(
        counts[i],
        this.x + 0.156 * ctx.canvas.width * i - 0.116 * ctx.canvas.width,
        this.y + 0.048 * ctx.canvas.height
      );
      ctx.fillText(
        counts[i],
        this.x + 0.156 * ctx.canvas.width * i - 0.116 * ctx.canvas.width,
        this.y + 0.048 * ctx.canvas.height
      );
    }
  }
}
