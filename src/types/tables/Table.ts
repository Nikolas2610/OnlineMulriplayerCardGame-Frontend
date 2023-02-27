// import type { TableStatus } from '@/types/tables/TableStatus.enum'

import type Game from "../games/Game";

export interface Table {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    status: string;
    private: boolean;
    password: string | null;
    game: Game | null;
}