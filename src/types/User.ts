import type UserState from "./auth/UserState";

export default interface User extends UserState {
    id: number;
    isEmailConfirmed: boolean;
    created_at: Date;
    updated_at: Date;
}