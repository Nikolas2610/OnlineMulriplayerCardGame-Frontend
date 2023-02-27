import axiosUser from "@/plugins/axiosUser";
import type { DeckReturn } from "@/types/decks/DeckReturn";
import type CreateGame from "@/types/games/CreateGame";
import type { CreateHandStartCards } from "@/types/games/CreateHandStartCards";
import type Game from "@/types/games/Game";
import type CreateRole from "@/types/games/relations/roles/CreateRole";
import type CreateStatus from "@/types/games/relations/status/CreateStatus";
import type CreateTeam from "@/types/games/relations/teams/CreateTeam";
import type { AxiosResponse } from "axios";
import { acceptHMRUpdate, defineStore } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast();

const defaultGame = {
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

export const useGameStore = defineStore("GameStore", {
    state: () => {
        return {
            loading: false,
            createGame: {
                game: { ...defaultGame } as Game,
                teams: [] as CreateTeam[],
                status: [] as CreateStatus[],
                roles: [
                    { name: 'Table' },
                    { name: 'Player' },
                ] as CreateRole[],
                hand_start_cards: [{
                    count_cards: 1,
                    deck: 0,
                    role: 0,
                    hidden: true,
                    repeat: 1
                }] as CreateHandStartCards[],
                selectedDecks: [] as Array<number>,
            },
            decks: [] as DeckReturn[],
            editGame: false,
            stepForm: {
                value: 1,
                loading: false,
                submitted: [false, false, false],
                change: [false, false, false]
            },
            games: [] as Game[],
            role: 'user',
        }
    },
    getters: {
        getTeams: (state) => state.createGame.teams,
        getStatus: (state) => state.createGame.status,
        getRoles: (state) => state.createGame.roles,
        validateEmptyDecks: (state) => state.createGame.selectedDecks.length !== 0
    },
    actions: {
        setUserRole(role: string) {
            this.$state.role = role;
        },
        async fetchGames() {
            try {
                this.$state.loading = true;
                const { data: games }: AxiosResponse = await axiosUser.get(`${this.$state.role}/games`);
                this.$state.games = games;
                this.$state.loading = false;
            } catch (error) {
                console.log(error)
            }
        },
        async fetchDecks() {
            try {
                this.$state.loading = true;
                const { data: decks }: AxiosResponse = await axiosUser.get(this.$state.role === 'user' ? "deck/private-public" : 'admin/decks');
                this.$state.decks = decks;
                this.$state.loading = false;
                return decks;
            } catch (error: any) {
                console.log(error)
            }
        },
        toggleEditGame(index: number) {
            this.$state.createGame.game = { ...this.$state.games[index] };
            this.$state.editGame = !this.$state.editGame;
            this.$state.createGame.selectedDecks = [];
            this.$state.stepForm.change = [false, false, false];
            const selectedDecks = this.$state.createGame.game.deck?.map(deck => deck.id);
            selectedDecks?.forEach(item => {
                if (item) {
                    this.$state.createGame.selectedDecks.push(item)
                }
            });
            this.$state.createGame.roles = [];
            const roles = this.$state.createGame.game.roles?.map(role => role.name)
            roles?.forEach(role => {
                if (role) {
                    this.$state.createGame.roles.push({ name: role });
                }
            })
            this.$state.createGame.teams = [];
            const teams = this.$state.createGame.game.teams?.map(team => team.name)
            teams?.forEach(team => {
                if (team) {
                    this.$state.createGame.teams.push({ name: team });
                }
            })
            this.$state.createGame.status = [];
            const status = this.$state.createGame.game.status?.map(s => s.name)
            status?.forEach(s => {
                if (s) {
                    this.$state.createGame.status.push({ name: s });
                }
            })
            this.$state.createGame.hand_start_cards = [];
            this.$state.createGame.game.hand_start_cards?.forEach(item => {
                if (item && item.deck && item.deck?.id) {
                    const deckIndex = this.$state.createGame.selectedDecks.indexOf(item.deck.id)
                    const roleIndex = this.$state.createGame.roles.map(role => role.name).indexOf(item.role.name)
                    this.$state.createGame.hand_start_cards.push({
                        count_cards: item.count_cards,
                        deck: deckIndex,
                        role: roleIndex,
                        hidden: item.hidden,
                        repeat: item.repeat
                    });
                }
            })
        },
        addTeam() {
            this.$state.createGame.teams.push({ name: '' });
        },
        deleteTeam(id: number) {
            if (this.$state.createGame.teams.length) {
                this.$state.createGame.teams = this.$state.createGame.teams.filter((team, index) => index !== id);
            }
        },
        addRole() {
            this.$state.createGame.roles.push({ name: '' });
        },
        deleteRole(id: number) {
            if (this.$state.createGame.roles.length > 2) {
                this.$state.createGame.roles = this.$state.createGame.roles.filter((team, index) => index !== id);
            }
        },
        addStatus() {
            this.$state.createGame.status.push({ name: '' });
        },
        deleteStatus(id: number) {
            if (this.$state.createGame.status.length) {
                this.$state.createGame.status = this.$state.createGame.status.filter((team, index) => index !== id);
            }
        },
        addHandStartCardsRow() {
            this.$state.createGame.hand_start_cards.push({
                count_cards: 1,
                hidden: false,
                repeat: 1,
                deck: 0,
                role: 0,
            })
        },
        deleteHandStartCardsRow(id: number) {
            if (this.$state.createGame.hand_start_cards) {
                this.$state.createGame.hand_start_cards = this.$state.createGame.hand_start_cards.filter((item, index) => index !== id);
            }
        },
        validateMoreSettings() {
            let error = false;
            if (this.$state.createGame.teams.length > 0) {
                this.$state.createGame.teams.forEach(team => {
                    if (team.name === '') {
                        toast.error('Team names is required');
                        error = true;
                    }
                })
            }
            if (this.$state.createGame.roles.length > 0) {
                this.$state.createGame.roles.forEach(role => {
                    if (role.name === '') {
                        toast.error('Role names is required');
                        error = true;
                    }
                })
            }
            if (this.$state.createGame.status.length > 0) {
                this.$state.createGame.status.forEach(status => {
                    if (status.name === '') {
                        toast.error('Status names is required');
                        error = true;
                    }
                })
            }
            return !error ? true : false
        },
        async _submit() {
            try {
                this.$state.stepForm.loading = true;
                switch (this.$state.stepForm.value) {
                    case 1:
                        const gameResponse: AxiosResponse = await axiosUser.post('game', {
                            game: this.$state.createGame.game,
                            decks: this.$state.createGame.selectedDecks
                        });

                        if (gameResponse.status === 201) {
                            this.$state.createGame.game = gameResponse.data;
                            this.$state.stepForm.submitted[this.$state.stepForm.value - 1] = true
                            this.$state.stepForm.change[this.$state.stepForm.value - 1] = false;
                            this.$state.stepForm.value++;
                        }
                        this.$state.stepForm.loading = false;
                        break;
                    case 2:
                        const moreSettingsResponse: AxiosResponse = await axiosUser.post('game/more-settings', {
                            game: this.$state.createGame.game,
                            roles: this.$state.createGame.roles,
                            status: this.$state.createGame.status,
                            teams: this.$state.createGame.teams,
                        });
                        if (moreSettingsResponse.status === 201) {
                            this.$state.createGame.game = moreSettingsResponse.data;
                            this.$state.stepForm.change[this.$state.stepForm.value - 1] = false;
                            this.$state.stepForm.value++;
                        }
                        this.$state.stepForm.loading = false;
                        break;
                    case 3:
                        const handStartCardsResponse: AxiosResponse = await axiosUser.post('game/hand-start-games', {
                            game: this.$state.createGame.game,
                            hand_start_cards: this.$state.createGame.hand_start_cards,
                        });
                        if (handStartCardsResponse.status === 201) {
                            toast.success('Game create successfully');
                            this.$state.stepForm.change[this.$state.stepForm.value - 1] = false;
                            this.$state.stepForm.value = 1;
                            this.clearFormData();
                        }
                        this.$state.stepForm.loading = false;
                        break;
                    default:
                        toast.error('Something went wrong. Please try again later');
                        break;
                }
            } catch (error: any) {
                this.$state.stepForm.loading = false;
                toast.error(error.response ? error.response?.data?.message : 'Something went wrong')
            }
        },
        async _update() {
            try {
                this.$state.stepForm.loading = true;
                switch (this.$state.stepForm.value) {
                    case 1:
                        const gameResponse: AxiosResponse = await axiosUser.patch('game', {
                            game: this.$state.createGame.game,
                            decks: this.$state.createGame.selectedDecks
                        });

                        if (gameResponse.status === 200) {
                            this.$state.createGame.game = gameResponse.data;
                            this.$state.stepForm.change[this.$state.stepForm.value - 1] = false;
                            this.$state.stepForm.submitted[this.$state.stepForm.value - 1] = true
                            this.$state.stepForm.value++;
                        }
                        this.$state.stepForm.loading = false;
                        break;
                    case 2:
                        const moreSettingsResponse: AxiosResponse = await axiosUser.patch('game/more-settings', {
                            game: this.$state.createGame.game,
                            roles: this.$state.createGame.roles,
                            status: this.$state.createGame.status,
                            teams: this.$state.createGame.teams,
                        });
                        if (moreSettingsResponse.status === 200) {
                            this.$state.createGame.game = moreSettingsResponse.data;
                            this.$state.stepForm.change[this.$state.stepForm.value - 1] = false;
                            this.$state.stepForm.submitted[this.$state.stepForm.value - 1] = true
                            this.$state.stepForm.value++;
                        }
                        this.$state.stepForm.loading = false;
                        break;
                    case 3:
                        const handStartCardsResponse: AxiosResponse = await axiosUser.patch('game/hand-start-games', {
                            game: this.$state.createGame.game,
                            hand_start_cards: this.$state.createGame.hand_start_cards,
                        });
                        if (handStartCardsResponse.status === 200) {
                            toast.success('Game updated successfully');
                            this.clearFormData();
                            this.$state.stepForm.change[this.$state.stepForm.value - 1] = false;
                            this.$state.stepForm.value = 1;
                            this.fetchGames();
                        }
                        this.$state.stepForm.loading = false;
                        break;
                    default:
                        toast.error('Something went wrong. Please try again later');
                        break;
                }
            } catch (error: any) {
                console.log(error)
                this.$state.stepForm.loading = false;
                toast.error(error.response ? error.response?.data?.message : 'Something went wrong')
            }
        },
        async _delete(id: number | null) {
            if (!id) {
                toast.error('Something went wrong. Please try again later');
                return
            }
            try {
                // Pass the ID of the game
                const response: AxiosResponse = await axiosUser.delete(`user/delete/game`, {
                    data: {
                        game_id: id
                    }
                });
                if (response.data.affected === 1) { // Success delete
                    toast.success('Game deleted successfully');
                    this.fetchGames()
                    return
                }
                toast.error('Something went wrong. Please try again later');
            } catch (error: any) {
                // Capture the errors
                error.response.data.message ?
                    toast.error(error.response.data.message) :
                    toast.error('Something went wrong. Please try again later');
            }
        },
        clearFormData() {
            this.$state.createGame.game = { ...defaultGame };
            this.$state.createGame.roles = [
                { name: 'Table' },
                { name: 'Player' },
            ];
            this.$state.createGame.hand_start_cards = [{
                count_cards: 1,
                deck: 0,
                role: 0,
                hidden: true,
                repeat: 1
            }]
            this.$state.createGame.status = [];
            this.$state.createGame.teams = [];
            this.$state.createGame.selectedDecks = [];
            this.$state.stepForm.submitted = [false, false, false];
            if (this.$state.editGame) {
                this.$state.stepForm.value = 1;
            }
            this.$state.editGame = false;
        },
        stepFormChange() {
            this.$state.stepForm.change[this.$state.stepForm.value - 1] = true;
        }, 
        unMountedDashboard() {
            this.$state.games = [];
            this.$state.decks = [];
        }
    }
})

// Update Store without refresh page
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot))
}