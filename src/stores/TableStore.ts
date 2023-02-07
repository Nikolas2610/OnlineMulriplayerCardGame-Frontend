import axiosUser from "@/plugins/axiosUser";
import type Game from "@/types/games/Game";
import type { CreateTable } from "@/types/tables/CreateTable";
import type { Table } from "@/types/tables/Table";
import type { AxiosResponse } from "axios";
import { acceptHMRUpdate, defineStore } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast();

export const useTableStore = defineStore('TableStore', {
    state: () => {
        return {
            table: {
                name: '',
                private: false,
                password: '',
                game: 0,
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
        toggleLoading() {
            this.$state.loading = !this.$state.loading;
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
            this.toggleLoading();
            const { data: games } = await axiosUser.get(this.$state.role === 'user' ? "game/private-public" : "admin/games");
            this.$state.games = games;
            this.toggleLoading();
        },
        async fetchTables() {
            this.toggleLoading();
            const response: AxiosResponse = await axiosUser.get(`${this.$state.role}/tables`);
            this.$state.tables = response.data
            this.toggleLoading();
        },
        async _submit() {
            try {
                const response: AxiosResponse = await axiosUser.post('table',
                    { table: this.$state.table }
                );
                if (response.status === 201) {
                    toast.success('Table create successfully');
                    this.clearFormData();
                }
            } catch (error: any) {
                toast.error(error)
            }
        },
        toggleEditTable(index: number) {
            this.$state.edit = { ...this.$state.tables[index] };
            this.$state.editTable = !this.$state.editTable;
        },
        async _update() {
            try {
                this.toggleLoading();
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
                    this.toggleLoading();
                    toast.success(response.data.message);
                    this.$state.editTable = false;
                    this.fetchTables();
                }
            } catch (error: any) {
                this.toggleLoading();
                toast.error(error)
            }
        },
        async _delete() {
            try {
                this.toggleLoading();
                const response: AxiosResponse = await axiosUser.delete(`${this.$state.role}/table`,
                    { data: { id: this.$state.selectedTableId } });
                if (response.status === 200) {
                    toast.success(response.data.message);
                    this.toggleLoading();
                    this.fetchTables();
                }
            } catch (error: any) {
                this.toggleLoading();
                toast.error(error)
            }
        }
    }
})

// Update Store without refresh page
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useTableStore, import.meta.hot))
}