import CrawlerCard from "../../js/CrawlerCard.mjs";
import { shuffleArray } from "../../js/util/shuffle.mjs";
import { CARDS_GIANT_RATS } from "./CardsGiantRat.mjs";
import { CARDS_SLIMES } from "./CardsSlime.mjs";

export default function generateLevel1(){
    const tier1 = shuffleArray([
        ...CARDS_GIANT_RATS.map(c=>new CrawlerCard(c)),
        ...CARDS_SLIMES.map(c=>new CrawlerCard(c)),
    ]);

    return tier1;
}