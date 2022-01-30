import { EFFECT_ATTACK, EFFECT_DEFENSE, EFFECT_REGENERATION } from "../AllTimeConstants.mjs";

export const CARDS_GIANT_RATS = [
  { text: "GiantRat00", enemy: {name: 'GiantRat', damage:0, hitPoints: 1, effects:[{type:EFFECT_ATTACK, value: 1}]}, player: {name: 'Bare Hands', effects:[{type:EFFECT_ATTACK, value:1}], set:['A']}},
  { text: "GiantRat01", enemy: {name: 'GiantRat', damage:0, hitPoints: 1, effects:[{type:EFFECT_ATTACK, value: 1}]}, player: {name: 'Bare Feet', effects:[{type:EFFECT_ATTACK, value:1}], set:['A']}},
  { text: "GiantRat02", enemy: {name: 'GiantRat', damage:0, hitPoints: 1, effects:[{type:EFFECT_ATTACK, value: 1},{type:EFFECT_DEFENSE, value: 1}]}, player: {name: 'Bare Head', effects:[{type:EFFECT_ATTACK, value:1}], set:['A']}},
  { text: "GiantRat03", enemy: {name: 'GiantRat', damage:0, hitPoints: 1, effects:[{type:EFFECT_ATTACK, value: 1}, {type:EFFECT_REGENERATION, value: 1}]}, player: {name: 'Bare Chest', effects:[{type:EFFECT_DEFENSE, value:1}], set:['A']}},
  { text: "GiantRat04", enemy: {name: 'GiantRat', damage:0, hitPoints: 1, effects:[{type:EFFECT_ATTACK, value: 1}]}, player: {name: 'Waist Cloth', effects:[{type:EFFECT_ATTACK, value:1}, {type:EFFECT_DEFENSE, value:1},], set:['A']}},
  { text: "GiantRat05", enemy: {name: 'GiantRat', damage:0, hitPoints: 1, effects:[{type:EFFECT_ATTACK, value: 1}]}, player: {name: 'Waist Cloth', effects:[{type:EFFECT_DEFENSE, value:1}, {type:EFFECT_DEFENSE, value:2, req:['A']},], set:['A','B']}},
];
