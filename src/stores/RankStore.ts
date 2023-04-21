import socket from "@/plugins/socket";
import type { TableUsers } from "@/types/lobby/TableUsers";
import type { Rank } from "@/types/online-table/Rank";
import { RankType } from "@/types/online-table/RankType.enum";
import { acceptHMRUpdate, defineStore } from "pinia";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useRankStore = defineStore('RankStore', {
    state: () => {
        return {
            tableHeaders: ['Round'],
            rankPoints: [] as Rank[][],
            tableUsers: [] as TableUsers[],
            tableId: 167 as number | null,
            room: '' as string,
            form: {
                newPoints: [
                    { points: 0, row: 5, table_user: 127, type: RankType.POINTS }
                ],
                header: { title: 'New Title', row: 5, type: RankType.TITLE, },
                showStoreForm: false,
            },
            testTableUsers: [3124, 3125, 3126, 3127],
            editRow: null as number | null,
        }
    },
    getters: {
        nextRow: (state) => state.rankPoints.length
    },
    actions: {
        _fetchRankPoints() {
            socket.emit('getRankTable', { table_id: this.$state.tableId }, (response: Rank[][]) => {
                this.$state.rankPoints = response;
            })
        },
        _store() {
            const data = [this.$state.form.header, ...this.$state.form.newPoints];
            socket.emit('storeRankRow', {
                data,
                room: this.$state.room,
                table_id: this.$state.tableId,
                row: this.nextRow
            }, (response: any) => {
                if (response.status === 200) {
                    this.$state.form.showStoreForm = false;
                } else {
                    toast.error('Something went wrong');
                }
            })
        },
        _update(row: number) {
            const index = this.$state.rankPoints.findIndex(rankRow => rankRow.some(rank => rank.row === row));
            const data = this.$state.rankPoints[index];
            socket.emit('updateRankRow', {
                data,
                room: this.$state.room,
                table_id: this.$state.tableId,
                row
            }, (response: any) => {
                if (response.status === 200) {
                    this.$state.editRow = null;
                } else {
                    toast.error('Something went wrong');
                }
            })
        },
        _delete(row: number) {
            const arrayIndex = this.$state.rankPoints[row];
            const rowDelete = arrayIndex[0].row;
            socket.emit('deleteRankRow', {
                room: this.$state.room,
                table_id: this.$state.tableId,
                row: rowDelete
            }, (response: any) => {
                if (response.status === 200) {
                    toast.success("Row deleted successfully")
                } else {
                    toast.error('Something went wrong');
                }
            })
        },
        addNewPoints() {
            this.$state.form.newPoints = [];
            const maxRow: number = this.nextRow;

            if (this.$state.tableId) {
                this.$state.form.header = {
                    title: 'Round ' + maxRow.toString(),
                    row: maxRow,
                    type: RankType.TITLE,
                };

                this.$state.tableUsers.forEach(user => {
                    this.$state.form.newPoints.push(
                        { points: 0, row: maxRow, table_user: user.id, type: RankType.POINTS }
                    )
                })
            }
            this.$state.form.showStoreForm = true;
        },
        addTableUsers(tableUsers: TableUsers[]) {
            this.$state.tableUsers = tableUsers.sort((a, b) => a.id - b.id);
            this.$state.tableHeaders = ['Round']
            this.$state.tableUsers.forEach(user => {
                if (user.user.username) {
                    this.$state.tableHeaders.push(user.user.username);
                }
            })
            this._fetchRankPoints();
        }
    }

})

// Update Store without refresh page
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useRankStore, import.meta.hot))
}