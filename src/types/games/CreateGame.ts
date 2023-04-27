export default interface CreateGame {
    name: string;
    description: string;
    extra_roles: boolean;
    status_player: boolean;
    extra_teams: boolean;
    private: boolean;
    grid_rows: number;
    grid_cols: number;
    max_players: number;
    hand_start_cards: boolean;
}