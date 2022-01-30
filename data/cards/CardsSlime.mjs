import { EFFECT_ATTACK, EFFECT_DEFENSE, EFFECT_HEAL } from "../AllTimeConstants.mjs";

export const CARDS_SLIMES = [
  { text: "Slime00", enemy: {name: 'Slime', damage:0, hitPoints: 3, effects:[{type:EFFECT_ATTACK, value: 1}], hint:"An unatural amorfous thing, with demi diggested corpses inside"}, player: {name: 'Cloth Gloves', effects:[{type:EFFECT_ATTACK, value:1}], set:['B'], hint:"It's thin, but it's still useful"}},
  { text: "Slime01", enemy: {name: 'Slime', damage:0, hitPoints: 3, effects:[{type:EFFECT_ATTACK, value: 1}], hint:"An unatural amorfous thing, with demi diggested corpses inside"}, player: {name: 'Cloth Shoes', effects:[{type:EFFECT_ATTACK, value:1}], set:['B'], hint:"Can't keep the umidity out of your toes, but it helps"}},
  { text: "Slime02", enemy: {name: 'Slime', damage:0, hitPoints: 3, effects:[{type:EFFECT_ATTACK, value: 1},{type:EFFECT_DEFENSE, value: 1}], hint:"An unatural amorfous thing, with demi diggested corpses inside"}, player: {name: 'Cloth Hood', effects:[{type:EFFECT_HEAL, value:1}], set:['B'], hint:"It can keep the chill out of your ears"}},
  { text: "Slime03", enemy: {name: 'Slime', damage:0, hitPoints: 3, effects:[{type:EFFECT_ATTACK, value: 1}, {type:EFFECT_HEAL, value: 1}], hint:"An unatural amorfous thing, with demi diggested corpses inside"}, player: {name: 'Cloth Shirt', effects:[{type:EFFECT_DEFENSE, value:1}], set:['B'], hint:"A ragged shirt to keep your body warm"}},
  { text: "Slime04", enemy: {name: 'Slime', damage:0, hitPoints: 3, effects:[{type:EFFECT_ATTACK, value: 1}], hint:"An unatural amorfous thing, with demi diggested corpses inside"}, player: {name: 'Cloth Leggings', effects:[{type:EFFECT_ATTACK, value:1}, {type:EFFECT_DEFENSE, value:1},], set:['B'], hint:"Finally everything is hidden now"}},
];
