import PlayArea from "./PlayArea.mjs";
import { CARD_H, EFFECT_ATTACK, EFFECT_DEFENSE, EFFECT_HEAL } from "../../data/AllTimeConstants.mjs";
import { FRONT_COLOR } from "../util/Colors.mjs";

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
        trigger = 3,
        source = null,
    }) {
        super({ x, y, w, h, type, draggable, cards, gap, max });
        this.type = type;
        this.effect = effect;
        this.enemy = enemy;
        this.cooldown = 0;
        this.trigger = trigger;
        this.source = source;
        this.max = max;
        this.gap = gap;
    }

    draw(ctx) {
        let fontSize = 0.025 * ctx.canvas.width;
        ctx.font = `${fontSize}px 'Orbitron'`;
        ctx.strokeStyle = FRONT_COLOR;
        ctx.fillStyle = FRONT_COLOR;
        ctx.lineWidth = 1;
        ctx.strokeRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        //ctx.fillText(`${this.trigger-this.cooldown} ${this.enemy.length}`, this.x, this.y);

        if (this.enemy.length > 0) {
            this.enemy[0].draw(ctx);
        }
        this.cards.forEach((card, k) => {
            this.fixCardPosition(k, card);
            card.draw(ctx);
        });
    }
    fixCardPosition(k, card) {
        const c = k % this.max;
        const l = Math.floor(k / this.max);
        card.flipped = false;
        card.x = this.x - card.w / 2 + c * (card.w + this.gap / 2) - this.gap / 4;
        card.y = this.y + l * (card.h + this.gap) + this.gap;
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
            card.y = this.y - card.h * 0.9;
        });
        this.cards.forEach((card, k) => {
            this.fixCardPosition(k, card);
        });
    }

    resolveEffects(scene) {
        let enemyTotalDamage = 0;
        let enemyTotalDefense = 0;
        let enemyTotalRegeneration = 0;

        let playerTotalDamage = 0;
        let playerTotalDefense = 0;
        let playerTotalRegeneration = 0;

        const fontSize = 0.025 * scene.ctx.canvas.width;

        this.cards.forEach(card => {
            card.player.effects.forEach(effect => {
                if (effect.req) {
                    if (!isSuperset(new Set(card.cardsUnder.flatMap(c => c.player.set)), new Set(effect.req))) {
                        return;
                    }
                }
                if (effect.type === EFFECT_ATTACK) {
                    playerTotalDamage += effect.value;
                } else if (effect.type === EFFECT_DEFENSE) {
                    playerTotalDefense += effect.value;
                } else if (effect.type === EFFECT_HEAL) {
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
                } else if (effect.type === EFFECT_HEAL) {
                    enemyTotalRegeneration += effect.value;
                }
            });
            const damageInflictedToEnemy = Math.max(playerTotalDamage - enemyTotalDefense, 0);
            if (damageInflictedToEnemy > 0) {
                this.enemy[0].enemy.damage += damageInflictedToEnemy;
                scene.player.stats.damageDealt += Math.max(playerTotalDamage - enemyTotalDefense, 0);
                for (let p = 0; p < damageInflictedToEnemy; p++) {
                    scene.particles.explode(this.enemy[0].x - fontSize * 1.3 * p, this.enemy[0].y);
                    scene.assets.play("damage");
                }
            }
            if (this.enemy[0].enemy.damage >= this.enemy[0].enemy.hitPoints) {
                scene.player.stats.monstersKilled++;
                this.enemy[0].enemy.damage = 0;
                this.enemy[0].flipped = false;
                scene.areas.loot.add(this.enemy.shift());
            } else {
                const totalHealed = Math.min(this.enemy[0].enemy.damage, enemyTotalRegeneration);
                this.enemy[0].enemy.damage = Math.max(this.enemy[0].enemy.damage - enemyTotalRegeneration, 0);
                if (totalHealed > 0) {
                    scene.particles.heal(this.enemy[0].x - fontSize * 1.3 * p, this.enemy[0].y);
                    scene.assets.play("heal");
                }
            }
        }
        scene.player.stats.damageBlocked += Math.min(playerTotalDefense, enemyTotalDamage);
        const damageInflictedToPlayer = Math.max(enemyTotalDamage - playerTotalDefense, 0);

        scene.player.damage += damageInflictedToPlayer;
        if (damageInflictedToPlayer > 0) {
            scene.particles.explode(scene.ctx.canvas.width * 0.9 - scene.player.damage * fontSize * 1.3, scene.ctx.canvas.height * 0.655);
            scene.assets.play("damage");
        }
        if (scene.player.damage < scene.player.hitPoints) {
            const totalHealed = Math.min(scene.player.damage, playerTotalRegeneration);
            scene.player.damage = Math.max(scene.player.damage - playerTotalRegeneration, 0);
            scene.player.stats.damageHealed += totalHealed;
            if (totalHealed > 0) {
                scene.particles.heal(scene.ctx.canvas.width * 0.9 - scene.player.damage * fontSize * 1.3, scene.ctx.canvas.height * 0.655);
                scene.assets.play("heal");
            }
        } else {
            scene.assets.play("die");
            scene.gameover = 2.0;
        }
        this.cooldown++;
        if (this.cooldown >= this.trigger) {
            this.cooldown = 0;
            if (this.enemy.length < 3 && this.source != null && this.source.length > 0) {
                this.enemy.push(this.source.shift());
                this.enemy[0].flipped = true;
                this.updatePositions();
            }
        }
    }
}

function isSuperset(set, subset) {
    for (var elem of subset) {
        if (!set.has(elem)) {
            return false;
        }
    }
    return true;
}