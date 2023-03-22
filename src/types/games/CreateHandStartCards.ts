import type { HandStartCardsRuleType } from "./HandStartCardsRuleType.enum";

export interface CreateHandStartCards {
    count_cards: number;
    hidden: boolean;
    type: HandStartCardsRuleType;
    deck: number;
    role: number;
    toDeck: number
}