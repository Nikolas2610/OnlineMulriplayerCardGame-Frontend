import type Deck from "../decks/Deck";
import type User from "../User";
import type { Table } from "./Table";
import type { TableDeckType } from "./TableDeckType";

export interface TableDeck {
    id: number;
    created_at: Date;
    updated_at: Date;
    table_id: Table | null;
    user: User | null;
    deck_id: Deck | null;
    type: TableDeckType
}