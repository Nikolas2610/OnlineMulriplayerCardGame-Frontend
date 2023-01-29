import type { CreateTable } from "@/types/tables/CreateTable";
import { defineStore } from "pinia";

export const useCreateTableStore = defineStore('CreateTableStore', {
    state: () => {
        return {
            table: {
                name: '',
                private: false,
                password: '',
                game: null,
            } as CreateTable
        }
    }, 
    getters: {

    }, 
    actions: {

    }
})