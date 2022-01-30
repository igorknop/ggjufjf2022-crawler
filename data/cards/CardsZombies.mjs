import { EFFECTS, SLOTS } from "../AllTimeConstants.mjs";

export const CARDS_ZOMBIES = [
  { text: "Zombie00", enemy: { name: 'Zombie', damage: 0, hitPoints: 3, effects: [{ type: EFFECTS.ATTACK, value: 1 }], hint: "A putrid reanimated human" }, player: { name: 'Leather Gloves', effects: [{ type: EFFECTS.DEFENSE, value: 1 }, { type: EFFECTS.ATTACK, value: 2 , req:['B']} ], set: ['A'], slot:SLOTS.GLOVES, hint: "Worn out leather. Probaly used by a thief." } },
  
  { text: "Zombie01", enemy: { name: 'Zombie', damage: 0, hitPoints: 3, effects: [{ type: EFFECTS.ATTACK, value: 1 }], hint: "A putrid reanimated human" }, player: { name: 'Leather Shoes', effects: [{ type: EFFECTS.ATTACK, value: 1 }, { type: EFFECTS.DEFENSE, value: 2, req:['A']}], set: ['B'], slot:SLOTS.FEET, hint: "You can walk with making noises with this." } },
  
  { text: "Zombie02", enemy: { name: 'Zombie', damage: 0, hitPoints: 3, effects: [{ type: EFFECTS.ATTACK, value: 1 }, { type: EFFECTS.DEFENSE, value: 1 }], hint: "A putrid reanimated human" }, player: { name: 'Leather Cap', effects: [{ type: EFFECTS.DEFENSE, value: 2 }, { type: EFFECTS.HEAL, value: 1, req:['B']}], set: ['B'], slot:SLOTS.HEAD, hint: 'A sturd hardened leather heal.' } },

  { text: "Zombie03", enemy: { name: 'Zombie', damage: 0, hitPoints: 3, effects: [{ type: EFFECTS.ATTACK, value: 1 }, { type: EFFECTS.HEAL, value: 1 }], hint: "A putrid reanimated human" }, player: { name: 'Leather Jacket', effects: [{ type: EFFECTS.DEFENSE, value: 2 }, { type: EFFECTS.DEFENSE, value: 2, req:['B']}], set: ['B'], slot:SLOTS.CHEST, hint: "A fine jacket but a little rotten. Like his previous owner." } },

  { text: "Zombie04", enemy: { name: 'Zombie', damage: 0, hitPoints: 3, effects: [{ type: EFFECTS.ATTACK, value: 1 }], hint: "A putrid reanimated human" }, player: { name: 'Leather Tights', effects: [{ type: EFFECTS.DEFENSE, value: 2 }, { type: EFFECTS.ATTACK, value: 2, req:['B'] },], set: ['A'], slot:SLOTS.LEGS, hint: "A solid protection without impairing effects" } },

  { text: "Zombie05", enemy: { name: 'Zombie', damage: 0, hitPoints: 3, effects: [{ type: EFFECTS.ATTACK, value: 1 }], hint: "A putrid reanimated human" }, player: { name: 'Leather Leggins', effects: [{ type: EFFECTS.ATTACK, value: 1 }, { type: EFFECTS.DEFENSE, value: 2, req: ['B'], slot:SLOTS.HAND_OFF, hint: "" },], set: ['A', 'B'], slot:'', hint: "Hardened leather with some blood stains" } },

  { text: "Zombie06", enemy: { name: 'Zombie', damage: 0, hitPoints: 3, effects: [{ type: EFFECTS.ATTACK, value: 1 }], hint: "A putrid reanimated human" }, player: { name: 'Wood Wand', effects: [{ type: EFFECTS.DEFENSE, value: 1 }, { type: EFFECTS.ATTACK, value: 3, req: ['A'], slot:'', hint: SLOTS.WAIST },], set: ['A', 'B'], slot:'', hint: "A leather belt with a rusted iron buckles." }, },

  { text: "Zombie07", enemy: { name: 'Zombie Knight', damage: 0, hitPoints: 5, effects: [{ type: EFFECTS.ATTACK, value: 1 }, { type: EFFECTS.HEAL, value: 1 }], hint: "A grey skinned dead woman. His honor lost to the hunger of the dead." }, player: { name: 'Short Sword', effects: [{ type: EFFECTS.ATTACK, value: 2 }, { type: EFFECTS.ATTACK, value: 1, req: ['A'] }, { type: EFFECTS.ATTACK, value: 1, req: ['B'] }], set: ['A','B'], slot:SLOTS.HAND_MAIN, hint: "A crude weapon used by whom need to hit and run" } },
];
