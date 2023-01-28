import type CreateGame from "@/types/games/CreateGame";
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
            } as CreateGame,
            teams: [{ name: '' }] as CreateTeam[],
            status: [{ name: '', description: '' }] as CreateStatus[],
            roles: [{ name: '', description: '', max_players: 1 }] as CreateRole[]
        }
    },
    getters: {
        getTeams: (state) => state.teams,
    },
    actions: {
        addTeam() {
            this.$state.teams.push({ name: '' });
        },
        deleteTeam(id: number) {
            if (this.$state.teams.length > 1) {
                this.$state.teams = this.$state.teams.filter((team, index) => index !== id);
            } else {
                toast.error("Can't delete the last team");
            }
        },
        addRole() {
            this.$state.roles.push({ name: '', description: '', max_players: 1 });
        },
        deleteRole(id: number) {
            if (this.$state.roles.length > 1) {
                this.$state.roles = this.$state.roles.filter((team, index) => index !== id);
            } else {
                toast.error("Can't delete the last role");
            }
        },
        addStatus() {
            this.$state.status.push({ name: '', description: '' });
        },
        deleteStatus(id: number) {
            if (this.$state.status.length > 1) {
                this.$state.status = this.$state.status.filter((team, index) => index !== id);
            } else {
                toast.error("Can't delete the last status");
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