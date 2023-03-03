
import type { LobbyTable } from "@/types/lobby/LobbyTable";
import { acceptHMRUpdate, defineStore } from "pinia";
import { useUserStore } from "./UserStore";
import socket from "@/plugins/socket";
import { useRouter } from "vue-router";
import router from "@/router";
import { useToast } from "vue-toastification";

const userStore = useUserStore();
const toast = useToast();

export const usePlayerStore = defineStore('PlayerStore', {
    state: () => {
        return {
            socket: null,
            table: null as LobbyTable | null,
            gameMaster: false,
            room: null as string | null,
        }
    },
    getters: {

    },
    actions: {
        async _createTable() {
            // TODO: Validation and catch the errors
            // ! FIX FUNCTION
            const userId = userStore.user.id;
            
            socket.emit('createOnlineTable', { userId, table: this.$state.table }, (response: any) => {
                
            });
        },
        _joinTable(publicUrl: string) {
            const userId = userStore.user.id

            if (userId) {
                socket.emit('joinTable', {
                    userId, publicUrl, tableId: this.$state.table?.id
                }, (response: any) => {
                    // Catch the error
                    if (response.error) {
                        this.$state.room = null;
                        router.push({ name: 'lobby' })
                    }   
                });
            } else {
                toast.warning('You have to login first');
                router.push({ name: 'lobby' })
            }
        },
        _leaveTable() {
            const userId = userStore.user.id;
            socket.emit('leaveTable', {
                userId, tableId: this.$state.table?.id, publicUrl: this.$state.table?.public_url
            }, (response: any) => {
                // Catch the error
                if (response.error) {
                    router.push({ name: 'lobby' })
                }
            });
        },
        _removeTable() {
            socket.emit('removeTable', {
                tableId: this.$state.table?.id
            }, (response: any) => {
                if (response.affected === 1) {
                    toast.success(`Table ${this.$state.table?.name} deleted successfully`);
                    this.$state.table = null;
                } else {
                    toast.error("Can't delete this table");
                }
            })
        }, 
        setGameMaster() {
            this.$state.gameMaster = userStore.user.id === this.$state.table?.game_master.id
        }
    }
})

// Update Store without refresh page
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePlayerStore, import.meta.hot))
}