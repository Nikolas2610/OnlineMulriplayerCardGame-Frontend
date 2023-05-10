export default interface CreateGame {
    name: string;
    description: string;
    auto_turn: boolean;
    private: boolean;
    grid_rows: number;
    grid_cols: number;
    max_players: number;
    hand_start_cards: boolean;
}