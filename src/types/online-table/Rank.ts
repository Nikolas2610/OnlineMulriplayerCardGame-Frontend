import type { TableUsers } from "../lobby/TableUsers";
import type { Table } from "../tables/Table";
import type { RankType } from "./RankType.enum";

export interface Rank {
    id: number;
    title: string | null;
    points: number | null;
    table_user: TableUsers;
    created_at: Date;
    updated_at: Date;
    row: number;
    type: RankType;
    table: Table | null;
}