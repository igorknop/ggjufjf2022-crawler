import Area from "../areas/Area.mjs";
import EnemyArea from "../areas/EnemyArea.mjs";
import Button from "../Button.mjs";
import Card from "../Card.mjs";
import CrawlerCard from "../CrawlerCard.mjs";
import { ALL_AVAILABLE } from "../../data/AllCards.mjs";
import { CARDS_IN_HAND, GAME_TIME } from "../../data/AllTimeConstants.mjs";
import { CARDS_GIANT_RAT } from "../../data/cards/CardsGiantRat.mjs";
import { CARDS_SLIME } from "../../data/cards/CardsSlime.mjs";
import PlayArea from "../areas/PlayArea.mjs";
import Ready from "../areas/Ready.mjs";
import { BACKGROUND_COLOR, FRONT_COLOR } from "../util/Colors.mjs";
import getXY from "../util/getXY.mjs";
import { shuffleArray } from "../util/shuffle.mjs";

export default class GameScene {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.player = {
      hitPoints: 5,
      damage: 0,
      monstersKilled: 0,
      coins: 0,
    }
    this.grace = 5;
    this.reputation = 5;
    this.playedCard = null;
    this.t0 = null;
    this.dt = null;
    this.areas = {};
    const touches = [];
    this.createAreas();
    this.animID = null;
  }
  start() {
    this.assets.stopAll();
    this.animID = requestAnimationFrame((t) => {
      this.step(t);
    });
  }
  stop() {
    this.game.messages = [];
    const totalBuildReputations =
      4 * this.areas.buildings.reduce((a, c) => a + c.reputation - 2, 0);
    this.game.messages.push(
      `Character Skills:\t\t${totalBuildReputations}`
    );
    const totalGodReputations =
      8 * this.areas.enemies.reduce((a, c) => a + c.reputation - 2, 0);
    this.game.messages.push(`Character Level:\t\t${totalGodReputations}`);
    this.game.messages.push(`Monsters Slain:\t\t${totalGodReputations}`);
    let total = 0;
    total += totalBuildReputations;
    total += totalGodReputations;
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
    this.expire = GAME_TIME;
    this.playedCard = null;
    this.t0 = null;
    this.dt = null;
    this.areas = {};
    const touches = [];
    this.player = {
      hitPoints: 5,
      damage: 0,
      monstersKilled: 0,
      coins: 0,
    }
    this.loot = [];

    this.createAreas();
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


    this.areas.hand.draw(this.ctx);
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
      this.expire > 30
        ? FRONT_COLOR
        : `hsl(0deg, 100%, ${(1 - (30 - this.expire) / 30) * 50}%`;
    this.ctx.fillText(
      `${min}:${seg}`,
      0.5 * this.canvas.width,
      0.05 * this.canvas.height
    );
    this.drawHud(this.ctx);
    // if (this.areas.hand.cards.length === 0) {
    //   this.endTurn();
    // }
    if (this.expire <= 0 || (this.player.damage >= this.player.hitPoints)) {
      //cancelAnimationFrame(this.animID);
      this.game.setScene("end");
      return;
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
        y: 0.73 * this.canvas.height,
        visible: true,
      }
    );

    this.areas.trash = new Area(
      {
        title: "Trash",
        x: this.canvas.width / 2,
        y: 0.9153571428571429 * this.canvas.height,
        visible: false,
        w: this.canvas.width * (4 / 5),
      }
    );
    this.areas.discard = new Area(
      {
        title: "Discard",
        x: this.canvas.width / 2,
        y: 0.9153571428571429 * this.canvas.height,
        visible: false,
        w: this.canvas.width * (4 / 5),

      }
    );
    this.areas.deck = new Area(
      {
        title: "Deck",
        x: this.canvas.width / 2,
        y: 0.9153571428571429 * this.canvas.height,
        visible: false,
        w: this.canvas.width * (4 / 5),
      }
    );

    this.areas.loot = new Area(
      {
        title: "Loot",
        x: this.canvas.width / 2,
        y: 0.55 * this.canvas.height,
        visible: true,
        w: this.canvas.width * (4 / 5),
      }
    );

    this.areas.deck.loadAll(CARDS_SLIME.map((c) => new CrawlerCard(c)));
    this.areas.enemies = [
      new EnemyArea(
        {
          x: 0.5 * this.canvas.width / 3,
          y: 0.25 * this.canvas.height,
          w: this.canvas.width / 3,
          h: this.canvas.height / 3,
          type: 0,
          enemy: shuffleArray(CARDS_SLIME.map(c => new CrawlerCard(c))),
        }),
      new EnemyArea(
        {
          x: 1.5 * this.canvas.width / 3,
          y: 0.25 * this.canvas.height,
          w: this.canvas.width / 3,
          h: this.canvas.height / 3,
          type: 0,
          enemy: shuffleArray(CARDS_SLIME.map(c => new CrawlerCard(c))),
        }
      ),
      new EnemyArea(
        {
          x: 2.5 * this.canvas.width / 3,
          y: 0.25 * this.canvas.height,
          w: this.canvas.width / 3,
          h: this.canvas.height / 3,
          type: 0,
          enemy: shuffleArray(CARDS_SLIME.map(c => new CrawlerCard(c))),
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
    if (this.playedCard !== null) {
      this.playedCard.x = x;
      this.playedCard.y = y;
      this.areas.enemies.forEach((enemyArea) => {
        // const checked = enemy.check(x, y);
        if (enemyArea.hasPoint({ x, y })) {
          this.areas.hand.delete(this.playedCard)
          enemyArea.add(this.playedCard);
        }
        // if (checked) {
        //   if (!checked.deliver(this.dragging.type)) {
        //     enemy.loseRep();
        //     this.assets.play("thunder", false, 0.3);
        //   }
        //   this.assets.play("gore");
        //   this.areas.trash.add(this.dragging);
        //   this.areas.hand.delete(this.dragging);
        //   if (checked.demands.length === 0) {
        //     enemy.gainRep();
        //     checked.effect(this);
        //     checked.resetDemands();
        //     enemy.sendToBottom(checked);
        //     enemy.resetCooldown();
        //   }
        //   this.dragging = null;
        //   return;
        // }
      });
      if (this.playedCard != null) {
        this.playedCard.x = this.playedCard?.oldx;
        this.playedCard.y = this.playedCard?.oldy;
      }
      this.playedCard = null;
    }
  }
  click(e) {
    const [x, y] = getXY(e, this.canvas);
    if (this.newTurn.hasPoint({ x, y })) {
      this.endTurn();
    }
    if (this.showDeck.hasPoint({ x, y })) {
      this.areas.deck.visible = !this.areas.deck.visible;
      this.areas.discard.visible = false;
      this.areas.trash.visible = false;
    }
    if (this.showDiscard.hasPoint({ x, y })) {
      this.areas.deck.visible = false;
      this.areas.discard.visible = !this.areas.discard.visible;
      this.areas.trash.visible = false;
    }
    if (this.showTrash.hasPoint({ x, y })) {
      this.areas.deck.visible = false;
      this.areas.discard.visible = false;
      this.areas.trash.visible = !this.areas.trash.visible;
    }
  }
  mousemove(e) {
    const [x, y] = getXY(e, this.canvas);
    if (this.playedCard) {
      this.playedCard.x = x;
      this.playedCard.y = y;
    }
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
    this.areas.discard.addAll(this.areas.hand);
    this.areas.enemies.forEach((enemyArea) => {
      this.areas.discard.cards = [...this.areas.discard.cards, ...enemyArea.cards];
      enemyArea.cards = [];
    });
    this.areas.discard.updatePositions();
    this.refillPlayerHand();

  }

  refillPlayerHand() {
    if (this.areas.deck.size() <= CARDS_IN_HAND) {
      this.areas.hand.addAll(this.areas.deck);
      this.areas.deck.addAll(this.areas.discard);
    }
    while (this.areas.hand.size() < CARDS_IN_HAND && this.areas.deck.size() > 0) {
      const r = Math.floor(Math.random() * this.areas.deck.size());
      const p = this.areas.deck.cards[r];
      this.areas.hand.add(p);
      this.areas.deck.delete(p);
    }
  }

  drawHud(ctx) {
    for (let h = 0; h < this.player.hitPoints; h++) {
      ctx.fillStyle = FRONT_COLOR;
      ctx.fillRect(this.canvas.width * 0.10 + h * 12, this.canvas.height * 0.64, 10, 10);
    }
    for (let h = 0; h < this.player.damage; h++) {
      ctx.fillStyle = FRONT_COLOR;
      ctx.beginPath();
      ctx.ellipse(this.canvas.width * 0.9 - h * 12, this.canvas.height * 0.647, 5, 5, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.closePath();
    }

  }
}
function padzero(num, places) {
  return String(num).padStart(places, "0");
}

