
import { acceptHMRUpdate, defineStore } from "pinia";
import { useUserStore } from "./UserStore";
import socket from "@/plugins/socket";
import router from "@/router";
import { useToast } from "vue-toastification";
import type { Table } from "@/types/tables/Table";
import type { TableUsers } from "@/types/lobby/TableUsers";
import type { TableCard } from "@/types/tables/TableCard";

const userStore = useUserStore();
const toast = useToast();

export const usePlayerStore = defineStore('PlayerStore', {
    state: () => {
        return {
            socket: null as string | null,
            table: null as Table | null,
            gameMaster: false,
            room: null as string | null,
            cards: null as TableCard[] | null,
        }
    },
    getters: {
        tableDeckId: (state) => state.table?.table_decks?.find(deck => deck.user?.id === userStore.user.id)?.id,
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
                    this.$state.table = null;
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
        _updateTurnTableUsers() {
            this.$state.table?.table_users?.forEach((user, index) => {
                user.turn = index + 1;
            })
            socket.emit('setTurnTableUsers', {
                table_users: this.$state.table?.table_users, room: this.$state.room
            });
        },
        _setRoleTableUser(roleId: number, table_user: TableUsers) {
            const role = this.$state.table?.game?.roles?.find(role => role.id === roleId);
            socket.emit('setRoleTableUser', {
                role, table_user, room: this.$state.room
            }, (response: { message: string, status: number }) => {
                if (response.status === 200) {
                    // console.log(response);
                }
            })
        },
        _setStatusTableUser(statusId: number, table_user: TableUsers) {
            const status = this.$state.table?.game?.status?.find(s => s.id === statusId);
            socket.emit('setStatusTableUser', {
                status, table_user, room: this.$state.room
            }, (response: { message: string, status: number }) => {
                if (response.status === 200) {
                    // console.log(response);
                }
            })
        },
        _setTeamTableUser(teamId: number, table_user: TableUsers) {
            const team = this.$state.table?.game?.teams?.find(team => team.id === teamId);
            socket.emit('setTeamTableUser', {
                team, table_user, room: this.$state.room
            }, (response: { message: string, status: number }) => {
                if (response.status === 200) {
                    // console.log(response);
                }
            })
        },
        getIndexTableUser(table_user: TableUsers) {
            return this.$state.table?.table_users?.map(user => user.id).indexOf(table_user.id);
        },
        setGameMaster() {
            if (this.$state.table?.game_master?.id) {
                this.$state.gameMaster = userStore.user.id === this.$state.table?.game_master.id
            }
        },
        _stopGame() {
            socket.emit('stopGame', {
                table: this.$state.table, room: this.$state.room
            })
        },
        _newGame() {
            socket.emit('newGame', {
                table: this.$state.table, room: this.$state.room
            })
        },
        _leaveGame() {
            console.log('\x1b[31m%s\x1b[0m', 'leaveGame');
            socket.emit('leaveGame', {
                table: this.$state.table, room: this.$state.room
            }, (response: { message: string, status: number }) => {
                if (response.status === 200) {
                    console.log(response);
                }
            })
        }
    }
})

// Update Store without refresh page
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePlayerStore, import.meta.hot))
}