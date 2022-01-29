import Area from "../Area.mjs";
import Button from "../Button.mjs";
import Card from "../Card.mjs";
import { ALL_AVAILABLE } from "../data/AllCards.mjs";
import { GAME_TIME } from "../data/AllTimeConstants.mjs";
import PlayArea from "../PlayArea.mjs";
import Ready from "../Ready.mjs";
import { BACKGROUND_COLOR, FRONT_COLOR } from "../util/Colors.mjs";
import getXY from "../util/getXY.mjs";

export default class GameScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
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
      `Building's Reputation:\t\t${totalBuildReputations}`
    );
    const totalGodReputations =
      8 * this.areas.enemies.reduce((a, c) => a + c.reputation - 2, 0);
    this.game.messages.push(`God's Grace:\t\t${totalGodReputations}`);
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
    this.grace = 5;
    this.reputation = 5;
    this.playedCard = null;
    this.t0 = null;
    this.dt = null;
    this.areas = {};
    const touches = [];
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



    //this.areas.enemies[0].loadAll(ALL_GOD_A_CARDS, this.canvas);
    //this.areas.enemies[0].godMode = "A";
    //this.areas.enemies[1].loadAll(ALL_GOD_B_CARDS, this.canvas);
    //this.areas.enemies[1].godMode = "B";

  }

  step(t) {
    this.t0 = this.t0 ?? t;
    this.dt = Math.min((t - this.t0) / 1000, 0.32);
    this.ctx.fillStyle = BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = FRONT_COLOR;
    this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);

    //this.areas.cardCount.draw(this.ctx);
    this.areas.enemies.forEach((e) => {
      e.draw(this.ctx);
    });


    this.areas.hand.draw(this.ctx);
    this.areas.trash.draw(this.ctx);
    this.areas.deck.draw(this.ctx);
    this.areas.discard.draw(this.ctx);

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
        : `hsl(0deg, 100%, ${(1 - this.expire / 30) * 50}%`;
    this.ctx.fillText(
      `${min}:${seg}`,
      0.5 * this.canvas.width,
      0.05 * this.canvas.height
    );
    if (this.areas.hand.cards.length === 0) {
      this.endTurn();
    }
    if (this.expire <= 0) {
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
    //this.areas.deck.loadAll(ALL_AVAILABLE, this.canvas);
    this.areas.deck.add(new Card({ text: "Card00" }));
    this.areas.deck.add(new Card({ text: "Card01" }));
    this.areas.deck.add(new Card({ text: "Card02" }));
    this.areas.deck.add(new Card({ text: "Card03" }));
    this.areas.deck.add(new Card({ text: "Card04" }));
    this.areas.deck.add(new Card({ text: "Card05" }));
    this.areas.deck.add(new Card({ text: "Card06" }));
    this.areas.deck.add(new Card({ text: "Card07" }));
    this.areas.deck.add(new Card({ text: "Card08" }));
    this.endTurn();
    this.areas.discard.add(new Card({ text: "Card08" }));
    this.areas.trash.add(new Card({ text: "Card08" }));
    this.areas.discard.add(new Card({ text: "Card08" }));
    this.areas.enemies = [];
    this.areas.enemies.push(
      new PlayArea(
        {
          x: 0.5 * this.canvas.width / 3,
          y: 0.25 * this.canvas.height,
          w: this.canvas.width / 3,
          h: this.canvas.height / 3,
          type: 0,
        }
      )
    );
    this.areas.enemies.push(
      new PlayArea(
        {
          x: 1.5 * this.canvas.width / 3,
          y: 0.25 * this.canvas.height,
          w: this.canvas.width / 3,
          h: this.canvas.height / 3,
          type: 0
        }
      )
    );
    this.areas.enemies.push(
      new PlayArea(
        {
          x: 2.5 * this.canvas.width / 3,
          y: 0.25 * this.canvas.height,
          w: this.canvas.width / 3,
          h: this.canvas.height / 3,
        }
      )
    );
    this.areas.buildings = [];
    this.newTurn = new Button(
      0.85 * this.canvas.width,
      0.58 * this.canvas.height,
      0.25625 * this.canvas.width,
      0.07 * this.canvas.height,
      "End Turn",
      false
    );
    this.showDeck = new Button(
      this.canvas.width * (0 + 1 / 3 - 1 / 5),
      0.82 * this.canvas.height,
      0.21875 * this.canvas.width,
      0.043 * this.canvas.height,
      "Deck",
      false
    );
    this.showDiscard = new Button(
      this.canvas.width * (2 / 3 - 1 / 5),
      0.82 * this.canvas.height,
      0.21875 * this.canvas.width,
      0.045 * this.canvas.height,
      "Discard",
      false
    );
    this.showTrash = new Button(
      this.canvas.width * (3 / 3 - 1 / 5),
      0.82 * this.canvas.height,
      0.21875 * this.canvas.width,
      0.045 * this.canvas.height,
      "Trash",
      false
    );
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
      this.areas.enemies.forEach((enemy) => {
        // const checked = enemy.check(x, y);
        if (enemy.hasPoint({ x, y })) {
          enemy.cards.push(this.playedCard);
          this.areas.hand.delete(this.playedCard);
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
    this.areas.discard.addAll(this.areas.hand);

    if (this.areas.deck.size() <= 5) {
      this.areas.hand.addAll(this.areas.deck);
      this.areas.deck.addAll(this.areas.discard);
    }
    while (this.areas.hand.size() < 5 && this.areas.deck.size() > 0) {
      const r = Math.floor(Math.random() * this.areas.deck.size());
      const p = this.areas.deck.cards[r];
      this.areas.hand.add(p);
      this.areas.deck.delete(p);
    }
  }
}
function padzero(num, places) {
  return String(num).padStart(places, "0");
}
