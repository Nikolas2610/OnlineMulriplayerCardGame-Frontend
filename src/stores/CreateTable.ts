import axiosUser from "@/plugins/axiosUser";
import type { CreateTable } from "@/types/tables/CreateTable";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast();

export const useCreateTableStore = defineStore('CreateTableStore', {
    state: () => {
        return {
            table: {
                name: '',
                private: false,
                password: '',
                game: null,
            } as CreateTable,
            games: []
        }
    },
    getters: {

    },
    actions: {
        clearFormData() {
            this.$state.table.game = null
            this.$state.table.name = ''
            this.$state.table.private = false
            this.$state.table.password = ''
        },
        async _submit() {
            try {
                const response = await axiosUser.post('table',
                    { table: this.$state.table }
                );
                if (response.status === 201) {
                    toast.success('Table create successfully');
                    this.clearFormData();
                }
            } catch (error: any) {
                toast.error(error)
            }
        }
    }
})