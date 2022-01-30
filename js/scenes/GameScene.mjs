import Area from "../areas/Area.mjs";
import EnemyArea from "../areas/EnemyArea.mjs";
import Button from "../Button.mjs";
import CrawlerCard from "../CrawlerCard.mjs";
import { STARTING_CARDS_IN_HAND, GAME_TIME, STARTING_STAMINA_REGEN } from "../../data/AllTimeConstants.mjs";
import Ready from "../areas/Ready.mjs";
import { BACKGROUND_COLOR, FRONT_COLOR } from "../util/Colors.mjs";
import getXY from "../util/getXY.mjs";
import generateLevel1 from "../../data/cards/Level1.mjs";
import { CARDS_GIANT_RATS } from "../../data/cards/CardsGiantRat.mjs";
import ParticleManager from "../util/Particles.mjs";

export default class GameScene {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.gameover = null;
    this.player = createPlayerData();
    this.playedCard = null;
    this.t0 = null;
    this.dt = null;
    this.areas = {};
    const touches = [];
    this.animID = null;
    this.currentLevel = [];
    this.createAreas();
    this.hint = "";
    this.particles = new ParticleManager(ctx);
  }
  start() {
    this.assets.stopAll();
    this.animID = requestAnimationFrame((t) => {
      this.step(t);
    });
  }
  stop() {
    this.game.messages = [];

    for (const key in this.player.stats) {
      if (Object.hasOwnProperty.call(this.player.stats, key)) {
        const value = this.player.stats[key];
        this.game.messages.push(`${key}: ${value}`);

      }
    }
    let total = this.player.stats.coinsGained + this.player.stats.monstersKilled;
    this.game.messages.push("");
    this.game.messages.push(`TOTAL SCORE:\t\t${total}`);
    this.game.score = total;
    this.assets.stopAll();
    if (total < 0) {
      //this.assets.play("lost");
    } else {
      //this.assets.play("win");
    }
  }

  setup() {
    this.gameover = null;
    this.expire = GAME_TIME;
    this.playedCard = null;
    this.t0 = null;
    this.dt = null;
    this.areas = {};
    const touches = [];
    this.player = createPlayerData();


    this.currentLevel = generateLevel1();
    this.createAreas();
    this.areas.deck.loadAll(CARDS_GIANT_RATS.map((c) => new CrawlerCard(c)));
    while (this.areas.hand.size() < this.player.stamina) {
      this.refillPlayerHand();
    }
    this.areas.enemies[1].enemy.push(this.currentLevel.shift());
    this.areas.enemies[1].updatePositions();

    this.animID = null;

    this.canvas.onmousedown = (e) => {
      this.mousedown(e);
    };
    this.canvas.onmouseup = (e) => {
      this.mouseup(e);
    };
    this.canvas.onclick = (e) => {
      this.click(e);
    };
    this.canvas.onmousemove = (e) => {
      this.mousemove(e);
    };
    this.canvas.onmouseout = (e) => {
      this.mouseout(e);
    };
    this.canvas.ontouchstart = (e) => {
      this.touchstart(e);
    };
    this.canvas.ontouchend = (e) => {
      this.touchend(e);
    };
    this.canvas.ontouchmove = (e) => {
      this.touchmove(e);
    };
  }

  step(t) {
    this.t0 = this.t0 ?? t;
    this.dt = Math.min((t - this.t0) / 1000, 0.32);
    this.ctx.fillStyle = BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = FRONT_COLOR;
    this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);

    //this.areas.cardCount.draw(this.ctx);
    const fontSize = 0.025 * this.ctx.canvas.width;
    this.ctx.font = `${fontSize}px "Orbitron"`;
    this.areas.enemies.forEach((e) => {
      e.draw(this.ctx);
    });


    this.areas.trash.draw(this.ctx);
    this.areas.deck.draw(this.ctx);
    this.areas.discard.draw(this.ctx);
    this.areas.loot.draw(this.ctx);

    this.newTurn.draw(this.ctx);
    this.showDiscard.draw(this.ctx);
    this.showDeck.draw(this.ctx);
    this.showTrash.draw(this.ctx);

    this.expire -= Math.min(this.expire, 1 * this.dt);
    const min = padzero(Math.floor(this.expire / 60), 2);
    const seg = padzero(Math.floor(this.expire % 60), 2);
    this.ctx.font = `${this.canvas.height * 0.05}px 'Orbitron'`;
    this.ctx.textAlign = "center";
    this.ctx.fillStyle =
      this.expire > 38
        ? FRONT_COLOR
        : `hsl(0deg, ${(2 - this.expire / 38) * 50}%,  ${(2 - this.expire / 38) * 50}%)`;
    this.ctx.fillText(
      `${min}:${seg}`,
      0.5 * this.canvas.width,
      0.05 * this.canvas.height
    );
    this.drawHud(this.ctx);
    this.areas.hand.draw(this.ctx);
    this.playedCard?.draw(this.ctx);

    this.particles.step(this.dt);
    this.particles.draw();

    // if (this.areas.hand.cards.length === 0) {
    //   this.endTurn();
    // }
    if (this.gameover !== null) {
      this.gameover -= this.dt;
    }
    if (this.expire <= 0 || (this.player.damage >= this.player.hitPoints)) {
      //cancelAnimationFrame(this.animID);
      if (this.gameover <= 0.0) {
        this.game.setScene("end");
        return;
      }
    }

    this.animID = requestAnimationFrame((t) => {
      this.step(t);
    });
    this.t0 = t;
  }

  createAreas() {

    this.areas.hand = new Ready(
      {
        title: "Hand",
        x: this.canvas.width / 2,
        y: 0.735 * this.canvas.height,
        visible: true,
      }
    );

    this.areas.trash = new Area(
      {
        title: "Trash",
        x: this.canvas.width / 2,
        y: 0.925 * this.canvas.height,
        visible: false,
        w: this.canvas.width * (4 / 5),
      }
    );
    this.areas.discard = new Area(
      {
        title: "Discard",
        x: this.canvas.width / 2,
        y: 0.925 * this.canvas.height,
        visible: false,
        w: this.canvas.width * (4 / 5),

      }
    );
    this.areas.deck = new Area(
      {
        title: "Deck",
        x: this.canvas.width / 2,
        y: 0.925 * this.canvas.height,
        visible: false,
        w: this.canvas.width * (4 / 5),
      }
    );

    this.areas.loot = new Area(
      {
        title: "Loot",
        x: this.canvas.width / 2,
        y: 0.925 * this.canvas.height,
        visible: true,
        w: this.canvas.width * (4 / 5),
      }
    );

    this.areas.enemies = [
      new EnemyArea(
        {
          x: 0.5 * this.canvas.width / 3,
          y: 0.315 * this.canvas.height,
          w: this.canvas.width / 3,
          h: this.canvas.height / 2,
          type: 0,
          enemy: [],
          source: this.currentLevel,
          trigger: 5,
          gap: this.canvas.height * 0.025,
        }),
      new EnemyArea(
        {
          x: 1.5 * this.canvas.width / 3,
          y: 0.315 * this.canvas.height,
          w: this.canvas.width / 3,
          h: this.canvas.height / 2,
          type: 0,
          enemy: [],
          source: this.currentLevel,
          trigger: 3,
          gap: this.canvas.height * 0.025,
        }
      ),
      new EnemyArea(
        {
          x: 2.5 * this.canvas.width / 3,
          y: 0.315 * this.canvas.height,
          w: this.canvas.width / 3,
          h: this.canvas.height / 2,
          type: 0,
          enemy: [],
          source: this.currentLevel,
          trigger: 4,
          gap: this.canvas.height * 0.025,
        }),
    ];

    this.areas.buildings = [];
    this.newTurn = new Button(
      this.canvas.width * (0 + 4 / 4 - 1 / 8),
      0.83 * this.canvas.height,
      0.21875 * this.canvas.width,
      0.045 * this.canvas.height,
      "End Turn",
      false
    );
    this.showDeck = new Button(
      this.canvas.width * (0 + 2 / 4 - 1 / 8),
      0.83 * this.canvas.height,
      0.21875 * this.canvas.width,
      0.045 * this.canvas.height,
      "Deck",
      false
    );
    this.showDiscard = new Button(
      this.canvas.width * (3 / 4 - 1 / 8),
      0.83 * this.canvas.height,
      0.21875 * this.canvas.width,
      0.045 * this.canvas.height,
      "Discard",
      false
    );
    this.showTrash = new Button(
      this.canvas.width * (1 / 4 - 1 / 8),
      0.83 * this.canvas.height,
      0.21875 * this.canvas.width,
      0.045 * this.canvas.height,
      "Trash",
      false
    );
    //this.endTurn(this);
    this.refillPlayerHand();
  }

  mousedown(e) {
    const [x, y] = getXY(e, this.canvas);
    if (this.gameover !== null) { return; }
    this.areas.hand.cards.forEach((s) => {
      if (s.draggable && s.hasPoint({ x, y })) {
        this.playedCard = s;
        this.playedCard.oldx = this.playedCard.x;
        this.playedCard.oldy = this.playedCard.y;
      }
    });
  }
  mouseup(e) {
    const [x, y] = getXY(e, this.canvas);
    if (this.gameover !== null) {
      return;
    }
    if (this.playedCard !== null) {
      this.playedCard.x = x;
      this.playedCard.y = y;
      this.areas.enemies.forEach((enemyArea) => {
        // const checked = enemy.check(x, y);
        if (enemyArea.hasPoint({ x, y })) {
          this.game.assets.play('right');
          let overAnother = false;
          for (let i = 0; i < enemyArea.cards.length; i++) {
            if (enemyArea.cards[i].hasPoint({ x, y })) {
              overAnother = true;
              enemyArea.cards[i].cardsUnder.push(this.playedCard);
              this.areas.hand.delete(this.playedCard);
              this.playedCard.x = enemyArea.cards[i].x;
              this.playedCard.y = enemyArea.cards[i].y + 8 * enemyArea.cards[i].cardsUnder.length;
              this.playedCard = null;
              this.areas.hand.updatePositions();
              return;
            }
          }
          if (!overAnother) {
            this.areas.hand.delete(this.playedCard)
            enemyArea.add(this.playedCard);
          }
        }
      });
      if (this.playedCard != null) {
        this.playedCard.x = this.playedCard?.oldx;
        this.playedCard.y = this.playedCard?.oldy;
        this.game.assets.play('right');
      }
      this.playedCard = null;
    }
  }
  click(e) {
    const [x, y] = getXY(e, this.canvas);
    if (this.gameover !== null) {
      return;
    }
    if (this.newTurn.hasPoint({ x, y })) {
      this.game.assets.play("click");
      this.areas.loot.visible = true;
      this.areas.deck.visible = false;
      this.areas.discard.visible = false;
      this.areas.trash.visible = false;
      this.endTurn();
    }
    if (this.showDeck.hasPoint({ x, y })) {
      this.game.assets.play("click");
      this.areas.loot.visible = !this.areas.loot.visible;
      this.areas.deck.visible = !this.areas.deck.visible;
      this.areas.discard.visible = false;
      this.areas.trash.visible = false;
    }
    if (this.showDiscard.hasPoint({ x, y })) {
      this.game.assets.play("click");
      this.areas.loot.visible = !this.areas.loot.visible;
      this.areas.deck.visible = false;
      this.areas.discard.visible = !this.areas.discard.visible;
      this.areas.trash.visible = false;
    }
    if (this.showTrash.hasPoint({ x, y })) {
      this.game.assets.play("click");
      this.areas.loot.visible = !this.areas.loot.visible;
      this.areas.deck.visible = false;
      this.areas.discard.visible = false;
      this.areas.trash.visible = !this.areas.trash.visible;
    }

    this.areas.loot.cards.forEach((lootedCard) => {
      // const checked = enemy.check(x, y);
      if (lootedCard.hasPoint({ x, y })) {
        this.areas.loot.delete(lootedCard)
        this.areas.discard.add(lootedCard);
        this.player.stats.lootedCards++;

        this.player.coins += this.areas.loot.size();
        this.player.stats.coinsGained += this.areas.loot.size();

        this.areas.trash.addAll(this.areas.loot);

      }
    });

  }


  mousemove(e) {
    this.hint = "";
    const [x, y] = getXY(e, this.canvas);
    if (this.playedCard) {
      this.playedCard.x = x;
      this.playedCard.y = y;
      this.hint = this.playedCard.player.hint;
      return;
    }
    this.areas.enemies.forEach(enArea => {
      enArea.enemy.forEach(enemy => {
        if (enemy.hasPoint({ x, y })) {
          this.hint = enemy.enemy.hint ?? "";
          return;
        }
      });
    });
  }
  mouseout(e) {
    if (this.playedCard) {
      this.playedCard.x = this.playedCard?.oldx;
      this.playedCard.y = this.playedCard?.oldy;
      this.playedCard = null;
    }
  }

  touchstart(e) {
    const newTouch = e.changedTouches[0];
    this.mousedown(newTouch);
  }
  touchend(e) {
    const newTouch = e.changedTouches[0];
    this.mouseup(newTouch);
  }
  touchmove(e) {
    e.preventDefault();
    const newTouch = e.changedTouches[0];
    this.mousemove(newTouch);
  }

  endTurn() {
    this.areas.enemies.forEach((enemyArea) => {
      enemyArea.resolveEffects(this);
    });

    this.areas.enemies.forEach((enemyArea) => {

      this.areas.discard.cards = [...this.areas.discard.cards, ...enemyArea.cards, ...enemyArea.cards.flatMap(c => c.cardsUnder)];
      enemyArea.cards.forEach(c => { c.cardsUnder = []; });
      enemyArea.cards = [];
    });
    this.areas.discard.updatePositions();

    this.refillPlayerHand();

  }

  refillPlayerHand() {
    let cardsDrawned = 0;
    if (this.areas.deck.size() <= Math.min(this.player.stamina - this.areas.hand.size(), this.player.staminaRegen)) {
      cardsDrawned += this.areas.deck.size();
      this.areas.hand.addAll(this.areas.deck);
      this.areas.deck.addAll(this.areas.discard);
    }

    while (this.areas.deck.size() > 0 && cardsDrawned < this.player.staminaRegen && this.areas.hand.size() < this.player.stamina) {
      const r = Math.floor(Math.random() * this.areas.deck.size());
      const p = this.areas.deck.cards[r];
      this.areas.hand.add(p);
      this.areas.deck.delete(p);
      cardsDrawned++;
    }
  }

  drawHud(ctx) {
    ctx.fillStyle = FRONT_COLOR;
    const fontSize = 0.025 * this.canvas.width;
    for (let h = 0; h < this.player.hitPoints; h++) {
      ctx.fillRect(this.canvas.width * 0.11 + h * fontSize * 1.3, this.canvas.height * 0.655, fontSize, fontSize);
    }
    ctx.fillStyle = FRONT_COLOR;
    for (let h = 0; h < this.player.damage; h++) {
      ctx.beginPath();
      ctx.ellipse(this.canvas.width * 0.9 - h * fontSize * 1.3 - fontSize, this.canvas.height * 0.655 + fontSize / 2, fontSize / 2, fontSize / 2, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.closePath();
    }
    ctx.font = `${this.canvas.width * 0.025}px "Orbitron"`;
    ctx.textAlign = 'left';
    ctx.fillText(`${this.player.coins} coins`, this.canvas.width * 0.11, this.canvas.height * 0.64);
    ctx.fillText(`Monsters: ${this.currentLevel.length}`, this.canvas.width * 0.3, this.canvas.height * 0.64);
    ctx.fillText(`${this.hint}`, this.canvas.width * 0.1, this.canvas.height * 0.59, this.canvas.width * 0.8);


  }

  drawCRTFilter(ctx) {
    ctx.save();
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let r = 0; r < ctx.canvas.height; r += 6) {
      ctx.globalAlpha = 0.1 * Math.sin(r / ctx.canvas.height * Math.PI);
      ctx.moveTo(0, r);
      ctx.strokeStyle = 'hsla(300deg, 100%, 20%, 0.1';
      ctx.lineTo(ctx.canvas.width, r);
      ctx.stroke();
    }
    for (let c = 0; c < ctx.canvas.width; c += 6) {
      ctx.globalAlpha = 0.1 * Math.sin(c / ctx.canvas.width * Math.PI);
      ctx.moveTo(c, 0);
      ctx.strokeStyle = 'hsla(200deg, 100%, 10%, 0.05';
      ctx.lineTo(c, ctx.canvas.height);
      ctx.stroke();
    }
    ctx.restore();
  }
}
function padzero(num, places) {
  return String(num).padStart(places, "0");
}

function createPlayerData() {
  return {
    hitPoints: 5,
    stamina: STARTING_CARDS_IN_HAND,
    staminaRegen: STARTING_STAMINA_REGEN,
    damage: 0,
    coins: 0,

    stats: {
      monstersKilled: 0,
      lootedCards: 0,
      damageTaken: 0,
      damageBlocked: 0,
      damageDealt: 0,
      damageHealed: 0,
      level: 1,
      coinsGained: 0,
      coinsSpent: 0,
    }
  }
}