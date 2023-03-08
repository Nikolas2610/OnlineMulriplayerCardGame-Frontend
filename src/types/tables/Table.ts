// import type { TableStatus } from '@/types/tables/TableStatus.enum'

import type Game from "../games/Game";
import type { TableUsers } from "../lobby/TableUsers";
import type User from "../User";
import type { TableDeck } from "./TableDeck";

export interface Table {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    status: string;
    private: boolean;
    password: string | null;
    game: Game | null;
    public_url: string;
    creator: User | null;
    table_users: TableUsers[] | null;
    game_master: User | null;
    table_decks: TableDeck[] | null;
}