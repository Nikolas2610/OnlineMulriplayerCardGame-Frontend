import type CreateRole from "./CreateRole";

export interface Role extends CreateRole {
    id: number;
    created_at: Date;
    updated_at: Date;
}