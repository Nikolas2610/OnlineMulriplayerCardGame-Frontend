export default interface UserState {
    username: string | null;
    token: string | null;
    email: string | null;
    forgotPasswordToken: JsonWebKey | null;
    role: string | null;
}