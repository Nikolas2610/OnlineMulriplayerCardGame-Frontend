import type CreateGame from "@/types/games/CreateGame";
import type { CreateHandStartCards } from "@/types/games/CreateHandStartCards";
import type CreateRole from "@/types/roles/CreateRole";
import type CreateStatus from "@/types/status/CreateStatus";
import type CreateTeam from "@/types/teams/CreateTeam";
import { acceptHMRUpdate, defineStore } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast();

export const useCreateGameStore = defineStore("CreateGameStore", {
    state: () => {
        return {
            game: {
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
                hand_start_cards: false
            } as CreateGame,
            teams: [] as CreateTeam[],
            status: [] as CreateStatus[],
            roles: [
                { name: 'Table' },
                { name: 'Player' },
            ] as CreateRole[],
            hand_start_cards: [
                {
                    count_cards: 1,
                    hidden: false,
                    repeat: 1,
                    deck: 0,
                    role: 0,
                }
            ] as CreateHandStartCards[]
        }
    },
    getters: {
        getTeams: (state) => state.teams,
        getStatus: (state) => state.status,
        getRoles: (state) => state.roles,
    },
    actions: {
        addTeam() {
            this.$state.teams.push({ name: '' });
        },
        deleteTeam(id: number) {
            if (this.$state.teams.length > 1) {
                this.$state.teams = this.$state.teams.filter((team, index) => index !== id);
            } else {
                toast.warning("Can't delete the last team");
            }
        },
        addRole() {
            this.$state.roles.push({ name: '' });
        },
        deleteRole(id: number) {
            if (this.$state.roles.length > 3) {
                this.$state.roles = this.$state.roles.filter((team, index) => index !== id);
            } else {
                toast.warning("Can't delete the default roles");
            }
        },
        addStatus() {
            this.$state.status.push({ name: '' });
        },
        deleteStatus(id: number) {
            if (this.$state.status.length > 1) {
                this.$state.status = this.$state.status.filter((team, index) => index !== id);
            } else {
                toast.warning("Can't delete the last status");
            }
        },
        addHandStartCardsRow() {
            this.$state.hand_start_cards.push({
                count_cards: 1,
                hidden: false,
                repeat: 1,
                deck: 0,
                role: 0,
            })
        },
        deleteHandStartCardsRow(id: number) {
            if (this.$state.hand_start_cards.length > 1) {
                this.$state.hand_start_cards = this.$state.hand_start_cards.filter((item, index) => index !== id);
            } else {
                toast.warning("Can't delete the last field of the table");
            }
        },
        validateExtraItems() {
            let error = false;
            if (this.$state.game.extra_teams) {
                this.$state.teams.forEach(team => {
                    if (team.name === '') {
                        toast.error('Team names is required');
                        error = true;
                    }
                })
            }
            if (this.$state.game.extra_roles) {
                this.$state.roles.forEach(role => {
                    if (role.name === '') {
                        toast.error('Role names is required');
                        error = true;
                    }
                })
            }
            if (this.$state.game.status_player) {
                this.$state.status.forEach(status => {
                    if (status.name === '') {
                        toast.error('Status names is required');
                        error = true;
                    }
                })
            }
            return !error ? true : false
        }
    }
})

// Update Store without refresh page
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCreateGameStore, import.meta.hot))
}