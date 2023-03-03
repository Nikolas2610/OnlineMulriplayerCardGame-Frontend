export default interface UserState {
    id: number | null;
    username: string | null;
    token: string | null;
    email: string | null;
    forgotPasswordToken: JsonWebKey | null;
    role: string | null;
}