export default interface Deck {
    id: number;
    name: string;
    private: boolean;
    created_at: Date;
    updated_at: Date;
    creator_id: number;
}