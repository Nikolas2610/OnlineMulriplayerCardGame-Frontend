import type Card from "../cards/Card";
import type { TableDeck } from "./TableDeck";

export interface TableCard {
    id: number;
    hidden: boolean;
    rotate: number;
    turn: number;
    position_x: number;
    position_y: number;
    table_deck: TableDeck;
    card: Card;
    created_at: Date;
    updated_at: Date;
    z_index: number;
}