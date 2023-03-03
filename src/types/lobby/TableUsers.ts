import type { Table } from "../tables/Table";
import type User from "../User";

export interface TableUsers {
    id: number;
    playing: boolean;
    status: string | null;
    team: string | null;
    turn: number | null;
    created_at: Date;
    updated_at: Date;
    table: Table | null;
    user: User;
}