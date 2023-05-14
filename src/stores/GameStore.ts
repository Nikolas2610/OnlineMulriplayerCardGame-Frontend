import axiosUser from "@/plugins/axiosUser";
import type { DeckReturn } from "@/types/decks/DeckReturn";
import { DeckType } from "@/types/decks/DeckType.enum";
import type { CreateHandStartCards } from "@/types/games/CreateHandStartCards";
import type Game from "@/types/games/Game";
import { HandStartCardsRuleType } from "@/types/games/HandStartCardsRuleType.enum";
import type CreateRole from "@/types/games/relations/roles/CreateRole";
import type CreateStatus from "@/types/games/relations/status/CreateStatus";
import type CreateTeam from "@/types/games/relations/teams/CreateTeam";
import type { AxiosResponse } from "axios";
import { acceptHMRUpdate, defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { defaultHandStartCards, defaultRole, defaultExtraDecks, defaultGame } from "@/utils/GameDefaultObjects";
import router from "@/router";
const toast = useToast();

export const useGameStore = defineStore("GameStore", {
    state: () => {
        return {
            loading: false,
            createGame: {
                game: { ...defaultGame } as Game,
                teams: [] as CreateTeam[],
                status: [] as CreateStatus[],
                roles: [{ ...defaultRole }] as CreateRole[],
                hand_start_cards: [{ ...defaultHandStartCards }] as CreateHandStartCards[],
                extraDecks: [...defaultExtraDecks] as Array<{ name: string }>,
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
                process.env.NODE_ENV === 'development' ? console.log(error) : ''
            }
        },
        async fetchDecks() {
            try {
                this.$state.loading = true;
                const { data: decks }: AxiosResponse = await axiosUser.get(this.$state.role === 'user' ? "deck/private-public" : 'admin/decks');
                // If decks are empty redirect to deck form
                if (decks.length === 0) {
                    toast.warning("First you have to create deck before create game");
                    router.push({ name: 'create-deck' })
                }

                this.$state.decks = decks;
                this.$state.loading = false;
                return decks;
            } catch (error: any) {
                this.$state.loading = false;
                if (error?.response?.data?.message === 'Error occurred while fetching decks') {
                    toast.warning("First you have to create deck before create game");
                    router.push({ name: 'create-deck' })
                }
                process.env.NODE_ENV  === 'development' ? console.log(error) : ''
            }
        },
        toggleEditGame(index: number) {
            // Initialize settings
            this.$state.createGame.game = { ...this.$state.games[index] };
            this.$state.editGame = !this.$state.editGame;
            this.$state.createGame.selectedDecks = [];
            this.$state.stepForm.change = [false, false, false];
            // Initialize select decks
            const selectedDecks = this.$state.createGame.game.deck?.filter(d => d.type === DeckType.DECK).map(deck => deck.id);
            selectedDecks?.forEach(item => {
                if (item) {
                    this.$state.createGame.selectedDecks.push(item)
                }
            });
            // Initialize roles
            this.$state.createGame.roles = [];
            const roles = this.$state.createGame.game.roles?.map(role => role.name)
            roles?.forEach(role => {
                if (role) {
                    this.$state.createGame.roles.push({ name: role });
                }
            })
            // If roles are empty set default roles
            if (roles?.length === 0) {
                this.$state.createGame.roles = [{ ...defaultRole }];
            }
            // Initialize teams
            this.$state.createGame.teams = [];
            const teams = this.$state.createGame.game.teams?.map(team => team.name)
            teams?.forEach(team => {
                if (team) {
                    this.$state.createGame.teams.push({ name: team });
                }
            })
            // Initialize status
            this.$state.createGame.status = [];
            const status = this.$state.createGame.game.status?.map(s => s.name)
            status?.forEach(s => {
                if (s) {
                    this.$state.createGame.status.push({ name: s });
                }
            })
            // Initialize extra empty decks
            this.$state.createGame.extraDecks = [];
            const extraDecks = this.$state.createGame.game.deck?.filter(d => d.type === DeckType.EXTRA_DECK);
            extraDecks?.forEach(deck => {
                if (deck) {
                    this.$state.createGame.extraDecks.push({ name: deck.name });
                }
            })
            // If extra decks are empty set default extra decks
            if (extraDecks?.length === 0) {
                this.$state.createGame.extraDecks = [...defaultExtraDecks];
            }
            // Initialize hand start card rules
            this.$state.createGame.hand_start_cards = [];
            this.$state.createGame.game.hand_start_cards?.forEach(rule => {
                if (rule && rule.deck && rule.deck?.id) {
                    // const deckIndex = this.$state.createGame.selectedDecks.indexOf(rule.deck.id)
                    // const roleIndex = this.$state.createGame.roles.map(role => role.name).indexOf(rule.role?.name)
                    this.$state.createGame.hand_start_cards.push({
                        count_cards: rule.count_cards,
                        deck: rule.deck.id,
                        role: rule.role?.id ? rule.role?.id : -1,
                        hidden: rule.hidden,
                        type: rule.type,
                        toDeck: rule.toDeck?.id ? rule.toDeck?.id : -1,
                    });
                }
            })
            // If card rules are empty set default card rules
            if (this.$state.createGame.game.hand_start_cards?.length === 0) {
                this.$state.createGame.hand_start_cards = [{ ...defaultHandStartCards }];
            }
        },
        addExtraDeck() {
            this.$state.createGame.extraDecks.push({ name: '' });
        },
        deleteExtraDeck(id: number) {
            if (this.$state.createGame.extraDecks.length > 2) {
                this.$state.createGame.extraDecks = this.$state.createGame.extraDecks.filter((team, index) => index !== id);
            }
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
            if (this.$state.createGame.roles.length > 1) {
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
            this.$state.createGame.hand_start_cards.push({ ...defaultHandStartCards })
        },
        deleteHandStartCardsRow(id: number) {
            if (this.$state.createGame.hand_start_cards) {
                this.$state.createGame.hand_start_cards = this.$state.createGame.hand_start_cards.filter((item, index) => index !== id);
            }
        },
        validateHandStartingCards() {
            let validate = true;
            this.$state.createGame.hand_start_cards.forEach(rule => {
                if (rule.role === -1 && rule.type === HandStartCardsRuleType.ROLE) {
                    toast.error('Role is empty');
                    validate = false;
                    return
                }
                if (rule.toDeck === -1 && rule.type === HandStartCardsRuleType.DECK) {
                    toast.error('To deck is empty');
                    validate = false;
                    return
                }
                if (rule.deck === -1) {
                    toast.error('From deck is empty')
                    validate = false;
                    return
                }
            })
            return validate;
        },
        validateMoreSettings() {
            let error = false;
            if (this.$state.createGame.teams.length > 0) {
                this.$state.createGame.teams.forEach(team => {
                    if (team.name === '') {
                        toast.error('Team name is required');
                        error = true;
                    }
                })
            }
            if (this.$state.createGame.roles.length > 0) {
                this.$state.createGame.roles.forEach(role => {
                    if (role.name === '') {
                        toast.error('Role name is required');
                        error = true;
                    }
                })
            }
            if (this.$state.createGame.status.length > 0) {
                this.$state.createGame.status.forEach(status => {
                    if (status.name === '') {
                        toast.error('Status name is required');
                        error = true;
                    }
                })
            }
            if (this.$state.createGame.extraDecks.length > 0) {
                this.$state.createGame.extraDecks.forEach(deck => {
                    if (deck.name === '') {
                        toast.error('Extra deck name is required');
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
                            this.$state.stepForm.change[this.$state.stepForm.value] = true;
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
                            extra_decks: this.$state.createGame.extraDecks
                        });
                        if (moreSettingsResponse.status === 201) {
                            this.$state.createGame.game = moreSettingsResponse.data;
                            this.$state.stepForm.change[this.$state.stepForm.value - 1] = false;
                            this.$state.stepForm.value++;
                        }
                        this.$state.stepForm.loading = false;
                        break;
                    case 3:
                        this.prepareHandStartCardsRequest();
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
                            this.$state.createGame.extraDecks = [...defaultExtraDecks];
                            this.$state.createGame.roles = [{ ...defaultRole }];
                            this.$state.createGame.hand_start_cards = gameResponse.data.hand_start_cards ?? [{ ...defaultHandStartCards }];
                            this.$state.stepForm.change[this.$state.stepForm.value - 1] = false;
                            this.$state.stepForm.change[this.$state.stepForm.value] = true;
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
                            extra_decks: this.$state.createGame.extraDecks
                        });
                        if (moreSettingsResponse.status === 200) {
                            this.$state.createGame.game = moreSettingsResponse.data;
                            this.$state.createGame.hand_start_cards = [];
                            this.$state.stepForm.change[this.$state.stepForm.value - 1] = false;
                            this.$state.stepForm.submitted[this.$state.stepForm.value - 1] = true
                            this.$state.stepForm.value++;
                        }
                        this.$state.stepForm.loading = false;
                        break;
                    case 3:
                        this.prepareHandStartCardsRequest();
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
                this.$state.stepForm.loading = false;
                toast.error(error.response ? error.response?.data?.message : 'Something went wrong')
            }
        },
        prepareHandStartCardsRequest() {
            this.$state.createGame.hand_start_cards.forEach(rule => {
                if (rule.type === HandStartCardsRuleType.DECK) {
                    rule.role = -1;
                } else {
                    rule.toDeck = -1;
                }
            })
        },
        async _delete(id: number | null) {
            if (!id) {
                toast.error('Something went wrong. Please try again later');
                return
            }
            try {
                // Pass the ID of the game
                const response: AxiosResponse = await axiosUser.delete(`${this.$state.role}/games`, {
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
            this.$state.createGame.roles = [{ ...defaultRole }];
            this.$state.createGame.hand_start_cards = [{ ...defaultHandStartCards }]
            this.$state.createGame.status = [];
            this.$state.createGame.extraDecks = [...defaultExtraDecks];
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