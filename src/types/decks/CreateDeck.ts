import type Card from "../cards/Card";

export default interface CreateDeck {
    name: string;
    private: boolean;
    cards: Card[]
}