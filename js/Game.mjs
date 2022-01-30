import EndScene from "./scenes/EndScene.mjs";
import StartScene from "./scenes/StartScene.mjs";
import GameScene from "./scenes/GameScene.mjs";
import CreditsScene from "./scenes/CreditsScene.mjs";
import RulesScene from "./scenes/RulesScene.mjs";
import AssetManager from "./AssetManager.mjs";
import { setCardSize } from "../data/AllTimeConstants.mjs";

export const assets = new AssetManager();



export default class Game {
  constructor(canvas) {
    this.assets = assets;
    this.scenes = new Map();
    this.messages = [];
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    setpixelated(this.ctx);
    this.addScene("game", new GameScene(this.canvas, this.ctx));
    this.addScene("end", new EndScene(this.canvas, this.ctx));
    this.addScene("start", new StartScene(this.canvas, this.ctx));
    this.addScene("credits", new CreditsScene(this.canvas, this.ctx));
    this.addScene("rules", new RulesScene(this.canvas, this.ctx));
    this.setScene("start");
    const r = 0.115;
    const w = canvas.height * r * 0.75;
    const h = canvas.height * r;
    setCardSize(w,h);
  }
  addScene(key, scene) {
    scene.game = this;
    scene.assets = this.assets;
    this.scenes.set(key, scene);
  }
  setScene(scene) {
    if (this.scenes.has(scene)) {
      this.scene?.stop();
      this.scene = this.scenes.get(scene);
      this.setup();
      this.start();
    }
  }
  setup() {
    this.scene.setup();
  }
  start() {
    this.scene.start();
  }
}

function setpixelated(context){
  context['imageSmoothingEnabled'] = false;       /* standard */
  context['mozImageSmoothingEnabled'] = false;    /* Firefox */
  context['oImageSmoothingEnabled'] = false;      /* Opera */
  context['webkitImageSmoothingEnabled'] = false; /* Safari */
  context['msImageSmoothingEnabled'] = false;     /* IE */
}