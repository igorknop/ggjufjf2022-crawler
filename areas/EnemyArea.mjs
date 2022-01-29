import PlayArea from "../PlayArea.mjs";
import { TYPE_COLOR, FAST, CARD_H } from "../data/AllTimeConstants.mjs";
import { assets } from "../Game.mjs";
import Sprite from "../Sprite.mjs";
import { FRONT_COLOR } from "../util/Colors.mjs";
import CrawlerCard from "../CrawlerCard.mjs";

export default class EnemyArea extends PlayArea {
    constructor({
        type = 0,
        effect = () => { },
        w = CARD_H * 1.7,
        h = CARD_H * 1.7,
        x = 0,
        y = 0,
        draggable = true,
        max = 5,
        gap = 2,
        cards = [],
        enemy = [],
    }) {
        super({ x, y, w, h, type, draggable, cards, gap, max });
        this.type = type;
        this.effect = effect;
        this.enemy = enemy;
        this.updatePositions();
    }

    draw(ctx) {
        ctx.strokeStyle = FRONT_COLOR;
        ctx.lineWidth = 3;
        ctx.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        ctx.lineWidth = 1;

        if (this.enemy.length > 0) {
            this.enemy[0].draw(ctx);
        }
        this.cards.forEach((card, k) => {
            card.x = this.x -(this.w-this.cards.length-1)/2 * k + card.w/2;
            card.y = this.y + card.h/2;
            card.draw(ctx);
        });
    }
    add(card) {
        card.flipped = false;
        this.cards.push(card);
        this.updatePositions();
        return true;
    }
    addEnemy(card) {
        card.flipped = true;
        this.enemy.push(card);
        this.updatePositions();
        return true;
    }

    loadAll(cards) {
        cards.forEach(c=>{
            this.addEnemy(c);
        });
        this.updatePositions();
    }

    updatePositions() {
        this.enemy.forEach((card,k) => {
            card.flipped = true;
            card.x = this.x;
            card.y = this.y - card.h*0.65;
        });
        this.cards.forEach((card,k) => {
            card.flipped = false;
            card.x = this.x -(this.w-this.cards.length-1)/2 * k + card.w/2;
            card.y = this.y + card.h/2;
        });
    }
}
