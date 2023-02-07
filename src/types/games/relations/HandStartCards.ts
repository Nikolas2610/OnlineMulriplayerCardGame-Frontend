import type Deck from "@/types/decks/Deck";
import type { Role } from "./roles/Role";

export interface HandStartCards {
    id: number;
    deck: Deck;
    role: Role;
    updated_at: Date;
    created_at: Date;
    count_cards: number;
    hidden: boolean;
    repeat: number;
}