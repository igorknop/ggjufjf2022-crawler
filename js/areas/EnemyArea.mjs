import PlayArea from "./PlayArea.mjs";
import { TYPE_COLOR, FAST, CARD_H, EFFECT_ATTACK, EFFECT_DEFENSE, EFFECT_REGENERATION } from "../../data/AllTimeConstants.mjs";
import { assets } from "../Game.mjs";
import Sprite from "../Sprite.mjs";
import { BACKGROUND_COLOR, FRONT_COLOR } from "../util/Colors.mjs";
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
        max = 2,
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
        let fontSize = 0.025 * ctx.canvas.width;
        ctx.font = `${fontSize}px 'Orbitron'`;
        ctx.strokeStyle = FRONT_COLOR;
        ctx.lineWidth = 1;
        ctx.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);

        if (this.enemy.length > 0) {
            this.enemy[0].draw(ctx);
            //this.hitPoints = this.enemy[0].hitPoints;
        }
        this.cards.forEach((card, k) => {
            card.x = this.x - (this.w - this.cards.length - 1) / 2 * k + card.w / 2;
            card.y = this.y + card.h / 2;
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
        cards.forEach(c => {
            this.addEnemy(c);
        });
        this.updatePositions();
    }

    updatePositions() {
        this.enemy.forEach((card, k) => {
            card.flipped = true;
            card.x = this.x;
            card.y = this.y - card.h * 0.65;
        });
        this.cards.forEach((card, k) => {
            card.flipped = false;
            card.x = this.x - (this.w - this.cards.length - 1) / 2 * k + card.w / 2;
            card.y = this.y + card.h / 2;
        });
    }

    resolveEffects(game) {
        let enemyTotalDamage = 0;
        let enemyTotalDefense = 0;
        let enemyTotalRegeneration = 0;

        let playerTotalDamage = 0;
        let playerTotalDefense = 0;
        let playerTotalRegeneration = 0;

        this.cards.forEach(card => {
            card.player.effects.forEach(effect => {
                if (effect.type === EFFECT_ATTACK) {
                    playerTotalDamage += effect.value;
                } else if (effect.type === EFFECT_DEFENSE) {
                    playerTotalDefense += effect.value;
                } else if (effect.type === EFFECT_REGENERATION) {
                    playerTotalRegeneration += effect.value;
                }
            });
        });
        if (this.enemy.length > 0) {
            this.enemy[0].enemy.effects.forEach(effect => {
                if (effect.type === EFFECT_ATTACK) {
                    enemyTotalDamage += effect.value;
                } else if (effect.type === EFFECT_DEFENSE) {
                    enemyTotalDefense += effect.value;
                } else if (effect.type === EFFECT_REGENERATION) {
                    enemyTotalRegeneration += effect.value;
                }
            });
            this.enemy[0].enemy.damage += Math.max(playerTotalDamage - enemyTotalDefense, 0);
            game.player.stats.damageDealt += Math.min(playerTotalDamage - enemyTotalDefense, 0);
            if (this.enemy[0].enemy.damage >= this.enemy[0].enemy.hitPoints) {
                game.player.stats.enemiesKilled++;
                this.enemy[0].enemy.damage = 0;
                this.enemy[0].flipped = false;
                game.areas.loot.add(this.enemy.shift());
                return;
            }
            this.enemy[0].enemy.damage = Math.max(this.enemy[0].enemy.damage - enemyTotalRegeneration, 0);
        }
        game.player.stats.damageBlocked += Math.min(playerTotalDefense, enemyTotalDamage);
        game.player.damage += Math.max(enemyTotalDamage - playerTotalDefense, 0);
        game.player.damage = Math.max(game.player.damage - playerTotalRegeneration, 0);
    }
}
