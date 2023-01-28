import type UserState from "./auth/UserState";

export default interface User extends UserState {
    id: number;
    email_confirmed: boolean;
    created_at: Date;
    updated_at: Date;
}