import axiosUser from "@/plugins/axiosUser";
import type Game from "@/types/games/Game";
import type { CreateTable } from "@/types/tables/CreateTable";
import type { Table } from "@/types/tables/Table";
import type { AxiosResponse } from "axios";
import { acceptHMRUpdate, defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { useUserStore } from "./UserStore";
import socket from "@/plugins/socket";
import router from "@/router";
import { usePlayerStore } from "./PlayerStore";
const userStore = useUserStore();
const toast = useToast();
const playerStore = usePlayerStore();

export const useTableStore = defineStore('TableStore', {
    state: () => {
        return {
            table: {
                name: '',
                private: false,
                password: '',
                game: null as number | null,
            } as CreateTable,
            games: [] as Game[],
            editTable: false,
            loading: false,
            edit: {} as Table,
            tables: [] as Table[],
            gameSelected: 0,
            selectedTableId: -1,
            role: 'user',
        }
    },
    getters: {
        loadingStatus: (state) => state.loading
    },
    actions: {
        setUserRole(role: string) {
            this.$state.role = role;
        },
        toggleLoading(value: boolean | null) {
            if (value) {
                this.$state.loading = value;
            } else {
                this.$state.loading = !this.$state.loading;
            }
        },
        updateSelectedGame(value: number) {
            this.$state.editTable ? this.$state.gameSelected = value : this.$state.table.game = value
        },
        clearFormData() {
            this.$state.table.game = 0
            this.$state.table.name = ''
            this.$state.table.private = false
            this.$state.table.password = ''
        },
        async fetchGames() {
            try {
                const { data: games } = await axiosUser.get(this.$state.role === 'user' ? "game/private-public" : "admin/games");
                this.$state.games = games;
            } catch (error) {
                process.env.NODE_ENV === 'development' ? console.log(error) : ''
            }
        },
        async fetchTables() { 
            this.toggleLoading(true);
            try {
                const response: AxiosResponse = await axiosUser.get(`${this.$state.role}/tables`);
                this.$state.tables = response.data
            } catch (error) {
                process.env.NODE_ENV === 'development' ? console.log(error) : ''
            }
            this.toggleLoading(false);
        },
        async _submit() {
            const user_id = userStore.user.id;
            socket.emit('createOnlineTable', { user_id, table: this.$state.table }, (response: Table) => {
                if (response.id) {
                    playerStore.table = { ...response };
                    this.$state.table.game = null;
                    this.$state.table.name = '';
                    this.$state.table.password = '';
                    this.$state.table.private = false;
                    router.push({ name: 'room', params: { id: response.public_url } })
                }
            })
        },
        toggleEditTable(index: number) {
            this.$state.edit = { ...this.$state.tables[index] };
            this.$state.editTable = !this.$state.editTable;
        },
        async _update() {
            try {
                this.toggleLoading(null);
                this.$state.games.forEach(game => {
                    if (game.id === this.$state.gameSelected) {
                        this.$state.edit.game = game;
                        return
                    }
                })
                const response: AxiosResponse = await axiosUser.patch(`${this.$state.role}/table`,
                    { table: this.$state.edit }
                );
                if (response.status === 200) {
                    this.toggleLoading(null);
                    toast.success(response.data.message);
                    this.$state.editTable = false;
                    this.fetchTables();
                }
            } catch (error: any) {
                this.toggleLoading(null);
                toast.error(error)
            }
        },
        async _delete() {
            try {
                this.toggleLoading(null);
                const response: AxiosResponse = await axiosUser.delete(`${this.$state.role}/table`,
                    { data: { id: this.$state.selectedTableId } });
                if (response.status === 200) {
                    toast.success(response.data.message);
                    this.toggleLoading(null);
                    this.fetchTables();
                }
            } catch (error: any) {
                this.toggleLoading(null);
                toast.error(error)
            }
        },
        async _deleteTableDetails() {
            try {
                this.toggleLoading(null);
                const response: AxiosResponse = await axiosUser.delete(`${this.$state.role}/table/users`,
                    { data: { id: this.$state.edit.id } });
                if (response.status === 200) {
                    toast.success('Table users has been successfully deleted');
                    this.toggleLoading(null);
                }
            } catch (error: any) {
                this.toggleLoading(null);
                toast.error(error)
            }
        },
        unMountedDashboard() {
            this.$state.games = [];
            this.$state.tables = [];
        }
    }
})

// Update Store without refresh page
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTableStore, import.meta.hot))
}