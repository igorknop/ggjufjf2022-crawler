import { EFFECTS, SLOTS } from "../AllTimeConstants.mjs";

export const CARDS_SPECIAL_ITEMS = [
  { text: "Door01", enemy: { name: "Dungeon's Door", damage: 0, hitPoints: 4, effects: [], hint: "A dark oak door with iron bars. An way out of this gloomy place.." }, player: { name: 'Wooden Wand', effects: [{ type: EFFECTS.HEAL, value: 1 }, { type: EFFECTS.ATTACK, value: 4 , req:['C']}, { type: EFFECTS.ATTACK, value: 2 , req:['D']} ], set: ['C', 'D'], slot:SLOTS.HAND_OFF, hint: "A thin twig that sparks in the tip" } },
  
];
