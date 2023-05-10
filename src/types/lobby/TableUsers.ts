import type { Role } from "../games/relations/roles/Role";
import type { Status } from "../games/relations/status/Status";
import type { Team } from "../games/relations/teams/Team";
import type { SocketStatus } from "../online-table/SocketStatus.enum";
import type { Table } from "../tables/Table";
import type User from "../User";

export interface TableUsers {
    id: number;
    playing: boolean;
    status: Status | null;
    team: Team | null;
    turn: number;
    created_at: Date;
    updated_at: Date;
    table: Table | null;
    user: User;
    role: Role | null;
    socket_id: string | null;
    socket_status: SocketStatus
}