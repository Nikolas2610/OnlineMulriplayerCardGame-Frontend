import type Deck from "../decks/Deck";

export interface CreateHandStartCards {
    count_cards: number;
    hidden: false;
    repeat: number;
    deck: number;
    role: number;
}