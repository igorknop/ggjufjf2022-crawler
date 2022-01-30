import { CARD_W } from "../data/AllTimeConstants.mjs";
import { CARD_H } from "../data/AllTimeConstants.mjs";
import { BACKGROUND_COLOR, FRONT_COLOR } from "./util/Colors.mjs";
import Card from "./Card.mjs";



export default class CrawlerCard extends Card {
    constructor({ w = CARD_W, h = CARD_H, text = "Card ?", player, enemy, flipped, damage = 0, hitPoints = 0 }) {
        super({
            w, h, text,
        });
        this.player = {
            name: "Player Face",
            effects: [],
            ...player,
        };
        this.enemy = {
            name: "Enemy Face",
            hitPoints: hitPoints,
            damage: 0,
            effects: [],
            ...enemy,
        };
        this.flipped = flipped ?? false;
        this.cardsUnder = [];
    }
    draw(ctx) {
        if (this.flipped) {
            this.drawAsEnemy(ctx);
        } else {
            this.drawAsPlayer(ctx);
        }
    }
    drawAsPlayer(ctx) {
        let fontSize = 0.025 * ctx.canvas.width;
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.strokeStyle = FRONT_COLOR;
        ctx.lineWidth = 1;
        for (let u = this.cardsUnder.length; u >= 0; u--) {
            ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2 + fontSize * u, this.w, this.h);
            ctx.strokeRect(this.x - this.w / 2, this.y - this.h / 2 + fontSize * u, this.w, this.h);
        }
        ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        ctx.strokeStyle = FRONT_COLOR;
        ctx.fillStyle = FRONT_COLOR;
        ctx.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        ctx.textAlign = "center";
        ctx.font = `${fontSize}px "Orbitron"`;
        ctx.fillText(this.player.name, this.x, this.y - this.h * 0.34, this.w * 0.9);
        ctx.fillText(this.player.set.join(''), this.x, this.y - this.h * 0.2, this.w * 0.9);

        ctx.strokeStyle = FRONT_COLOR;
        if (this.cardsUnder.length > 0) {
            ctx.fillText(`[${this.cardsUnder.map(c => c.player.set.join('')).join('')}]`, this.x, this.y, this.w * 0.9);
        }
        ctx.fillStyle = FRONT_COLOR;
        ctx.font = `${fontSize}px "Orbitron"`;
        const last = this.player.effects.length - 1;
        for (let i = last; i >= 0; i--) {
            const effect = this.player.effects[i];
            if (effect.req) {
                ctx.fillText(`${effect.req.join('')}: ${effect.type} ${effect.value}`, this.x, this.y + this.w / 2 - (last- i) * fontSize*1.1, this.w * 0.9);
            } else {
                ctx.fillText(`${effect.type} ${effect.value}`, this.x, this.y + this.w / 2 - (last - i) * fontSize*1.1, this.w * 0.9);
            }
        };

    }
    drawAsEnemy(ctx) {
        let fontSize = 0.025 * ctx.canvas.width;
        let chipSize = 0.01 * ctx.canvas.height;
        ctx.beginPath();
        ctx.fillStyle = FRONT_COLOR
        ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        ctx.lineWidth = 2;
        ctx.strokeStyle = BACKGROUND_COLOR;
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        ctx.textAlign = "center";

        ctx.fillText(this.enemy.name, this.x, this.y - this.h * 0.30, this.w * 0.9);
        for (let h = 0; h < this.enemy.hitPoints; h++) {
            ctx.fillStyle = BACKGROUND_COLOR;
            ctx.fillRect(this.x + h * fontSize - this.w / 2 + 4, this.y - this.h * 0.25, chipSize, chipSize);
        }
        for (let h = 0; h < this.enemy.damage; h++) {
            ctx.fillStyle = BACKGROUND_COLOR;
            ctx.beginPath();
            ctx.ellipse(this.x + this.w / 2 - h * fontSize - fontSize, this.y - this.h * 0.10, chipSize / 2, chipSize / 2, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.closePath();
        }
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.font = `${fontSize}px "Orbitron"`;
        for (let i = this.enemy.effects?.length - 1; i >= 0; i--) {
            const effect = this.enemy.effects[i];
            ctx.fillText(`${effect.type} ${effect.value}`, this.x, this.y + this.w / 2 - i * fontSize, this.w * 0.9);
        };

    }

    getHint() {
        return `${this.player.name}
----------------
${this.enemy.name}`;
    }
}


