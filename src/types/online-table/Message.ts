import type User from "../User";

export interface Message {
    id: number,
    message: string,
    user: User,
    created_at: Date;
}