import type Card from "../cards/Card";

export default interface Deck {
    id: number | null;
    name: string;
    private: boolean;
    created_at: Date | null;
    updated_at: Date | null;
    creator_id: number | null;
    cards: Card[]
}