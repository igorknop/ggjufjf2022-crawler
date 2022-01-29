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
        ctx.fillText(this.player.name, this.x, this.y - this.w * 0.46, this.w*0.9);
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
        ctx.fillText(this.enemy.name, this.x, this.y - this.w * 0.46, this.w*0.9);
    }

    getHint(){
        return `${this.player.name}
----------------
${this.enemy.name}`;
    }
}
