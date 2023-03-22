import type { CreateHandStartCards } from "@/types/games/CreateHandStartCards";
import type Game from "@/types/games/Game";
import { HandStartCardsRuleType } from "@/types/games/HandStartCardsRuleType.enum";
import type CreateExtraDeck from "@/types/games/relations/CreateExtraDeck";
import type CreateRole from "@/types/games/relations/roles/CreateRole";

export const defaultHandStartCards = {
    count_cards: 1,
    hidden: false,
    deck: -1,
    role: -1,
    type: HandStartCardsRuleType.ROLE,
    toDeck: -1,
} as CreateHandStartCards

export const defaultRole = { name: 'Player' } as CreateRole

export const defaultExtraDecks = [
    { name: 'Table' },
    { name: 'Junk' },
] as CreateExtraDeck[]

export const defaultGame = {
    name: '',
    description: '',
    extra_roles: false,
    status_player: false,
    extra_teams: false,
    rank: false,
    private: false,
    grid_rows: 1,
    grid_cols: 1,
    max_players: 1,
    min_players: 1,
} as Game;