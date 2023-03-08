import type Game from "../games/Game";
import type User from "../User";
import type { TableUsers } from "./TableUsers";

export interface LobbyTable {
    id: number;
    name: string;
    private: boolean;
    password: string | null;
    created_at: Date;
    game: Game;
    status: string;
    creator: User;
    public_url: string;
    table_users: TableUsers[] | null;
    game_master: User;
}