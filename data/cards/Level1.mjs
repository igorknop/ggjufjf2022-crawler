import CrawlerCard from "../../js/CrawlerCard.mjs";
import { shuffleArray } from "../../js/util/shuffle.mjs";
import { CARDS_GIANT_RATS } from "./CardsGiantRat.mjs";
import { CARDS_SLIMES } from "./CardsSlime.mjs";
import { CARDS_SPECIAL_ITEMS } from "./CardsSpecialItems.mjs";
import { CARDS_ZOMBIES } from "./CardsZombies.mjs";

export default function generateLevel1() {
    const tier1 = [
        ...shuffleArray(
            [...CARDS_GIANT_RATS.slice(0,-1).map(c => new CrawlerCard(c)),
            ...CARDS_SLIMES.map(c => new CrawlerCard(c))]
        ),
        new CrawlerCard(CARDS_GIANT_RATS[CARDS_GIANT_RATS.length-1]),
        ,
        new CrawlerCard(CARDS_SPECIAL_ITEMS[0]),
        ,
        ...shuffleArray([
            ...CARDS_ZOMBIES.map(c => new CrawlerCard(c)),
        ])
    ];

    return tier1;
}