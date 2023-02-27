import type Deck from "../decks/Deck";
import type { HandStartCards } from "./relations/HandStartCards";
import type { Role } from "./relations/roles/Role";
import type { Status } from "./relations/status/Status";
import type { Team } from "./relations/teams/Team";

export default interface Game {
    id: number | null;
    name: string;
    description: string;
    grid_rows: number;
    grid_cols: number;
    max_players: number;
    min_players: number;
    private: boolean;
    rank: boolean;
    status_player: boolean;
    extra_roles: boolean;
    extra_teams: boolean;
    created_at: Date | null;
    updated_at: Date | null;
    deck: Deck[] | null;
    hand_start_cards: HandStartCards[] | null;
    roles: Role[] | null;
    status: Status[] | null;
    teams: Team[] | null;
}