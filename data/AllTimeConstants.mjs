import { BACKGROUND_COLOR } from "../js/util/Colors.mjs";


export const GAME_TIME = 180;

export const TYPE_COLOR = {};
export let CARD_W = 0;
export let CARD_H = 0;
export const setCardSize = (w, h)=>{
    CARD_W = w;
    CARD_H = h;
}

export const STARTING_CARDS_IN_HAND = 4;
export const STARTING_STAMINA_REGEN = 2;

export const EFFECT_ATTACK = 'attack';
export const EFFECT_DEFENSE = 'defense';
export const EFFECT_HEAL = 'heal';
export const EFFECT_REST = 'rest';

export const EFFECTS = {
    EFFECT_ATTACK: {
        id: 'attack',
        name: 'Attack',
    },
    EFFECT_DEFENSE: {
        id: 'defense',
        name: 'Defense',
    },  
    EFFECT_HEAL: {
        id: 'heal',
        name: 'Heal',
    },
    EFFECT_REST: {
        id: 'rest',
        name: 'Rest',
    },
}