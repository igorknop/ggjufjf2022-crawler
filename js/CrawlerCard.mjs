import Sprite from "./Sprite.mjs";
import { TYPE_COLOR } from "../data/AllTimeConstants.mjs";
import { assets } from "./Game.mjs";
import { CARD_W } from "../data/AllTimeConstants.mjs";
import { CARD_H } from "../data/AllTimeConstants.mjs";
import { BACKGROUND_COLOR, FRONT_COLOR } from "./util/Colors.mjs";
import Card from "./Card.mjs";

const PEOPLE_IMAGES = [
    { sx: 243, sy: 2279, sw: 276, sh: 364 },
    { sx: 524, sy: 2279, sw: 276, sh: 364 },
    { sx: 810, sy: 2279, sw: 276, sh: 364 },
    { sx: 1096, sy: 2279, sw: 276, sh: 364 },
];

export default class CrawlerCard extends Card {
    constructor({ w = CARD_W, h = CARD_H, text = "Card ?", player, enemy, flipped }) {
        super({
            w, h, text,
        });
        this.player = player ?? {
            name: "Player Face",
        };
        this.enemy = enemy ?? {
            name: "Enemy Face",
            hitPoints: 0,
            damage: 2,
        }
        this.flipped = flipped ?? false;
    }
    draw(ctx) {
        if (this.flipped) {
            this.drawAsEnemy(ctx);
        } else {
            this.drawAsPlayer(ctx);
        }
    }
    drawAsPlayer(ctx) {
        ctx.beginPath();
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        ctx.lineWidth = 2;
        ctx.strokeStyle = FRONT_COLOR;
        ctx.fillStyle = FRONT_COLOR;
        ctx.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        ctx.font = '12px "Orbitron"';
        ctx.fillText(this.player.name, this.x, this.y - this.w * 0.46, this.w * 0.9);
        ctx.fillStyle = FRONT_COLOR;
        ctx.font = "8px 'Orbitron'";
        for (let i = this.player.effects.length - 1; i >= 0; i--) {
            const effect = this.player.effects[i];
            ctx.fillText(`${effect.type} ${effect.value}`, this.x, this.y + this.w / 2 - i * 12, this.w * 0.9);
        };
    }
    drawAsEnemy(ctx) {
        ctx.beginPath();
        ctx.fillStyle = FRONT_COLOR
        ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        ctx.lineWidth = 2;
        ctx.strokeStyle = BACKGROUND_COLOR;
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        ctx.font = '12px "Orbitron"';
        ctx.fillText(this.enemy.name, this.x, this.y - this.h * 0.30, this.w * 0.9);
        for (let h = 0; h < this.enemy.hitPoints; h++) {
            ctx.fillStyle = BACKGROUND_COLOR;
            ctx.fillRect(this.x + h * 8 - this.w / 2 + 4, this.y - this.h * 0.25, 6, 6);
        }
        for (let h = 0; h < this.enemy.damage; h++) {
            ctx.fillStyle = BACKGROUND_COLOR;
            ctx.beginPath();
            ctx.ellipse(this.x + this.w / 2 - h * 8 - 8, this.y - this.h * 0.10, 3, 3, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.closePath();
        }
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.font = "8px 'Orbitron'";
        for (let i = this.enemy.effects?.length - 1; i >= 0; i--) {
            const effect = this.enemy.effects[i];
            ctx.fillText(`${effect.type} ${effect.value}`, this.x, this.y + this.w / 2 - i * 12, this.w * 0.9);
        };

    }

    getHint() {
        return `${this.player.name}
----------------
${this.enemy.name}`;
    }
}
