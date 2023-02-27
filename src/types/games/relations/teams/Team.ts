import type CreateTeam from "./CreateTeam";

export interface Team extends CreateTeam {
    id: number;
    created_at: Date;
    updated_at: Date;
}