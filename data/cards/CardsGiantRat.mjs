import { EFFECT_ATTACK, EFFECT_DEFENSE, EFFECT_HEAL, SLOTS } from "../AllTimeConstants.mjs";

export const CARDS_GIANT_RATS = [
  { text: "GiantRat00", enemy: { name: 'Giant Rat', damage: 0, hitPoints: 1, effects: [{ type: EFFECT_ATTACK, value: 1 }], hint: "A bizarre, oversided pestilent animal" }, player: { name: 'Bare Hands', effects: [{ type: EFFECT_ATTACK, value: 1 }, { type: EFFECT_ATTACK, value: 1 , req:['A']} ], set: ['A'], slot:SLOTS.GLOVES, hint: "You own the mostly versatile weapons" } },
  
  { text: "GiantRat01", enemy: { name: 'Giant Rat', damage: 0, hitPoints: 1, effects: [{ type: EFFECT_ATTACK, value: 1 }], hint: "A bizarre, oversided pestilent animal" }, player: { name: 'Bare Feet', effects: [{ type: EFFECT_ATTACK, value: 1 }, { type: EFFECT_DEFENSE, value: 1, req:['B']}], set: ['B'], slot:SLOTS.FEET, hint: "You can feel the cold of the ground beneath your feet" } },
  
  { text: "GiantRat02", enemy: { name: 'Giant Rat', damage: 0, hitPoints: 1, effects: [{ type: EFFECT_ATTACK, value: 1 }, { type: EFFECT_DEFENSE, value: 1 }], hint: "A bizarre, oversided pestilent animal" }, player: { name: 'Bare Head', effects: [{ type: EFFECT_ATTACK, value: 1 }, { type: EFFECT_HEAL, value: 1, req:['C']}], set: ['C'], slot:SLOTS.HEAD, hint: "Surprise the enemy with your hard skull" } },

  { text: "GiantRat03", enemy: { name: 'Giant Rat', damage: 0, hitPoints: 1, effects: [{ type: EFFECT_ATTACK, value: 1 }, { type: EFFECT_HEAL, value: 1 }], hint: "A bizarre, oversided pestilent animal" }, player: { name: 'Bare Chest', effects: [{ type: EFFECT_DEFENSE, value: 1 }, { type: EFFECT_HEAL, value: 2, req:['D']}], set: ['D'], slot:SLOTS.CHEST, hint: "Sometimes, you just can take it" } },

  { text: "GiantRat04", enemy: { name: 'Giant Rat', damage: 0, hitPoints: 1, effects: [{ type: EFFECT_ATTACK, value: 1 }], hint: "A bizarre, oversided pestilent animal" }, player: { name: 'Ragged thong', effects: [{ type: EFFECT_ATTACK, value: 1 }, { type: EFFECT_DEFENSE, value: 1, req:['B'] },], set: ['A'], slot:SLOTS.LEGS, hint: "A few pieces of cloth can be used to keep your secrets" } },

  { text: "GiantRat05", enemy: { name: 'Giant Rat', damage: 0, hitPoints: 1, effects: [{ type: EFFECT_ATTACK, value: 1 }], hint: "A bizarre, oversided pestilent animal" }, player: { name: 'Rotten Cloth', effects: [{ type: EFFECT_DEFENSE, value: 1 }, { type: EFFECT_DEFENSE, value: 2, req: ['C'], slot:SLOTS.CAPE, hint: "" },], set: ['B', 'C'], slot:'', hint: "It smells, but keep you warm" } },

  { text: "GiantRat06", enemy: { name: 'Giant Rat', damage: 0, hitPoints: 1, effects: [{ type: EFFECT_ATTACK, value: 1 }], hint: "A bizarre, oversided pestilent animal" }, player: { name: 'Worned Rope', effects: [{ type: EFFECT_DEFENSE, value: 1 }, { type: EFFECT_ATTACK, value: 3, req: ['A'], slot:'', hint: SLOTS.WAIST },], set: ['A', 'B'], slot:'', hint: "A worned out rope to keep your weapons on hand" }, },

  { text: "GiantRat07", enemy: { name: 'Rat King', damage: 0, hitPoints: 5, effects: [{ type: EFFECT_ATTACK, value: 1 }, { type: EFFECT_HEAL, value: 1 }], hint: "Five giant rats, entangled by the tails" }, player: { name: 'Rotten Club', effects: [{ type: EFFECT_ATTACK, value: 1 }, { type: EFFECT_ATTACK, value: 3, req: ['A'] }, { type: EFFECT_DEFENSE, value: 2, req: ['B'] }], set: ['A','B'], slot:SLOTS.HAND_MAIN, hint: "A rotten piece of wood" } },
];
