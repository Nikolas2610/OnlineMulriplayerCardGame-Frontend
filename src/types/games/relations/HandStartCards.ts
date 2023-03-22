import type Deck from "@/types/decks/Deck";
import type { HandStartCardsRuleType } from "../HandStartCardsRuleType.enum";
import type { Role } from "./roles/Role";

export interface HandStartCards {
    id: number;
    deck: Deck;
    role: Role | null;
    updated_at: Date;
    created_at: Date;
    count_cards: number;
    hidden: boolean;
    type: HandStartCardsRuleType;
    toDeck: Deck | null;
}