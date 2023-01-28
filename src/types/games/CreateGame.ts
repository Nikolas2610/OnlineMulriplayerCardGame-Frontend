export default interface CreateGame {
    name: string;
    description: string;
    extra_roles: boolean;
    status_player: boolean;
    extra_teams: boolean;
    rank: boolean;
    private: boolean;
    grid_rows: number;
    grid_cols: number;
    max_players: number;
    min_players: number;
}