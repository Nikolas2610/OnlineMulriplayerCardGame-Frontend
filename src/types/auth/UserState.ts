export default interface UserState {
    username: string | null;
    token: string | null;
    forgotPasswordToken: JsonWebKey | null;
}