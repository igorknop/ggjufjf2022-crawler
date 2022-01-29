import { EFFECT_ATTACK, EFFECT_DEFENSE, EFFECT_REGENERATION } from "../AllTimeConstants.mjs";

export const CARDS_SLIME = [
  { text: "Slime00", enemy: {name: 'Slime', damage:0, hitPoints: 3, effects:[{type:EFFECT_ATTACK, value: 1}]}, player: {name: 'Cloth Gloves', effects:[{type:EFFECT_ATTACK, value:1}]}},
  { text: "Slime01", enemy: {name: 'Slime', damage:0, hitPoints: 3, effects:[{type:EFFECT_ATTACK, value: 1}]}, player: {name: 'Cloth Shoes', effects:[{type:EFFECT_ATTACK, value:2}]}},
  { text: "Slime02", enemy: {name: 'Slime', damage:0, hitPoints: 3, effects:[{type:EFFECT_ATTACK, value: 1},{type:EFFECT_DEFENSE, value: 1}]}, player: {name: 'Cloth Hood', effects:[{type:EFFECT_ATTACK, value:3}]}},
  { text: "Slime03", enemy: {name: 'Slime', damage:0, hitPoints: 3, effects:[{type:EFFECT_ATTACK, value: 1}, {type:EFFECT_REGENERATION, value: 1}]}, player: {name: 'Cloth Shirt', effects:[{type:EFFECT_ATTACK, value:1},{type:EFFECT_ATTACK, value:1},]}},
  { text: "Slime04", enemy: {name: 'Slime', damage:0, hitPoints: 3, effects:[{type:EFFECT_ATTACK, value: 1}]}, player: {name: 'Cloth Leggings', effects:[{type:EFFECT_ATTACK, value:1}, {type:EFFECT_DEFENSE, value:1},]}}
];
