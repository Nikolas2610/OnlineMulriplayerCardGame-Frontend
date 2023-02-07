import type CreateStatus from "./CreateStatus";

export interface Status extends CreateStatus {
    id: number;
    created_at: Date;
    updated_at: Date;
}