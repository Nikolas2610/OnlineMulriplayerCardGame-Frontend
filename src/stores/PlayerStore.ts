import { acceptHMRUpdate, defineStore } from "pinia";
import { useUserStore } from "./UserStore";
import socket from "@/plugins/socket";
import router from "@/router";
import { useToast } from "vue-toastification";
import type { Table } from "@/types/tables/Table";
import type { TableUsers } from "@/types/lobby/TableUsers";
import type { TableCard } from "@/types/tables/TableCard";
import type { DropZone } from "@/types/online-table/DropZone";
import type { DeckItem } from "@/types/online-table/DeckItem";
import { TableStatus } from "@/types/tables/TableStatus.enum";
import { MovementRotateCard } from "@/types/online-table/RotateCard.enum";
import type { Status } from "@/types/games/relations/status/Status";
import { HistoryMovement } from "@/types/online-table/HIstoryMovement.enum";
import type { TableDeck } from "@/types/tables/TableDeck";
import { TableDeckType } from "@/types/tables/TableDeckType";

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
            dropZones: {
                table: [],
                deck: [],
                junk: [],
                user: [],
            } as DropZone,
            zIndex: 1,
            clickCardId: null as number | null,
            deckReferences: {
                table: null as HTMLElement | null,
                junk: null as HTMLElement | null,
                user: null as HTMLElement | null
            },
            refUndoHistory: [] as TableCard[],
            refRedoHistory: [] as TableCard[],
            refHistoryCapacity: 10 as number,
            rank: {
                notification: false,
                isRankModalOpen: false
            }
        }
    },
    getters: {
        getExistPlayerTableDeckId: (state) => state.table?.table_decks?.find(deck => deck.user?.id === userStore.user.id)?.id,
        getJunkTableDeckId: (state) => state.dropZones.junk[0]?.tableDeckId,
        getTableDeckId: (state) => state.dropZones.table[0]?.tableDeckId,
        getExistPlayerPlayingStatus: (state) => state.table?.table_users?.find(user => user.user.id === userStore.user.id)?.playing,
        getExistTableUserId: (state) => state.table?.table_users?.find(user => user.user.id === userStore.user.id)?.id,
        getTableExist: (state) => state.table?.game?.grid_cols && state.table?.game?.grid_rows ? state.table?.game?.grid_cols > 0 && state.table?.game?.grid_rows > 0 : false,
        getRefHistoryCapacity: (state) => state.refHistoryCapacity
    },
    actions: {
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
                toast.warning('You have to login or set guest nickname');
                router.push({ name: 'lobby' })
            }
        },
        async _validateTablePassword(password: string): Promise<any> {
            return new Promise((resolve, reject) => {
                socket.emit('validateTablePassword', {
                    table: this.$state.table, password
                }, (response: any) => {
                    if (response.error) {
                        // Reject the promise if there's an error
                        reject(response.error);
                    } else {
                        // Resolve the promise with the response
                        resolve(response);
                    }
                });
            });
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
            })
        },
        _setStatusTableUser(statusId: number, table_user: TableUsers) {
            const status = this.$state.table?.game?.status?.find(s => s.id === statusId);
            socket.emit('setStatusTableUser', {
                status, table_user, room: this.$state.room
            })
        },
        _setTeamTableUser(teamId: number, table_user: TableUsers) {
            const team = this.$state.table?.game?.teams?.find(team => team.id === teamId);
            socket.emit('setTeamTableUser', {
                team, table_user, room: this.$state.room
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
            socket.emit('leaveGame', {
                table: this.$state.table, room: this.$state.room
            })
        },
        getCards(tableDeckId: number | undefined) {
            if (tableDeckId && this.$state.cards?.length) {
                return this.$state.cards?.filter(card => card.table_deck.id === tableDeckId);
            }
        },
        onDrop(event: DragEvent, tableDeckId: number | undefined, type: string, zIndex: number) {
            if (this.$state.table?.status === TableStatus.PLAYING || this.$state.table?.status === TableStatus.GAME_MASTER_EDIT) {
                if (event.dataTransfer) {
                    const card: TableCard = JSON.parse(event.dataTransfer.getData('card'));
                    const topBox = parseInt(event.dataTransfer.getData('top'), 10);
                    const leftBox = parseInt(event.dataTransfer.getData('left'), 10);
                    const cardWidth = parseInt(event.dataTransfer.getData('cardWidth'), 10);
                    const cardHeight = parseInt(event.dataTransfer.getData('cardHeight'), 10);
                    const dropZone = this.$state.dropZones[type]?.find((item: DeckItem) => item.tableDeckId === tableDeckId);
                    const dropZoneRect = dropZone.element.getBoundingClientRect();
                    const offsetY = event.y - dropZoneRect.y - topBox;
                    const offsetX = event.x - dropZoneRect.x - leftBox;
                    const { offsetHeight, offsetWidth } = dropZone.element;
                    this.$state.cards?.forEach(dragCard => {
                        if (dragCard.id === card.id) {
                            // Update the top position of the dropped box
                            if (offsetY > offsetHeight - cardHeight) {
                                // Card is too big, adjust it to fit inside the drop zone
                                dragCard.position_x = offsetHeight - cardHeight;
                            } else if (offsetY < 0) {
                                // Card is partially outside the drop zone at the top, adjust it to fit inside
                                dragCard.position_x = 0;
                            } else {
                                // Card is fully inside the drop zone, position it at the current y coordinate
                                dragCard.position_x = offsetY;
                            }
                            // Update the left position of the dropped box
                            if (offsetX > offsetWidth - cardWidth) {
                                // Card is too big, adjust it to fit inside the drop zone
                                dragCard.position_y = offsetWidth - cardWidth
                            } else if (offsetX < 0) {
                                // Card is partially outside the drop zone at the left, adjust it to fit inside
                                dragCard.position_y = 0;
                            } else {
                                // Card is fully inside the drop zone, position it at the current x coordinate
                                dragCard.position_y = offsetX;
                            }
                            dragCard.z_index = this.$state.zIndex;
                            if (type === 'junk') {
                                dragCard.hidden = false;
                            }

                            if (type === 'user') {
                                this.$state.dropZones.deck.forEach(deck => {
                                    if (deck.tableDeckId === dragCard.table_deck.id) {
                                        dragCard.hidden = true;
                                    }
                                })
                            }
                            if (tableDeckId && card.table_deck.id !== tableDeckId) {
                                dragCard.table_deck.id = tableDeckId;
                            }
                            if (!this.isCardMovementInPlayerDeck(card, dragCard)) {
                                this.updateUndoHistory(card);
                                this._updateCard(dragCard);
                            }
                            this.$state.clickCardId = dragCard.id;
                            this.$state.zIndex++
                        }
                    })
                }
            }
        },
        getTableDeckIdOfUser(userId: number) {
            return this.$state.table?.table_decks?.find(deck => deck.user?.id === userId)?.id
        },
        updateCardHistory(cardResponse: TableCard) {
            const cardIndex = this.$state.cards?.findIndex((card) => card.id === cardResponse.id);
            if (cardIndex && cardIndex > -1 && this.$state.cards) {
                this.$state.cards?.splice(cardIndex, 1); // Remove the card from the array
                this.$state.cards?.push(cardResponse); // Add the updated card to the array
            }
        },
        _updateCard(card: TableCard) {
            socket.emit('updateCard', {
                card, room: this.$state.room
            })
        },
        cardsToDeck(previousDeck: number | undefined, newDeck: TableDeck | undefined) {
            if (previousDeck && newDeck) {
                let width = 50;
                this.$state.cards?.forEach(card => {
                    if (card.table_deck.id === previousDeck) {
                        card.table_deck.id = newDeck.id;
                        if (newDeck.type === TableDeckType.DECK || newDeck.type === TableDeckType.JUNK) {
                            // For the decks set position to 0
                            card.position_x = 0;
                            card.position_y = 0;
                            card.rotate = 0;
                        } else {
                            // For table and user deck add cords next to other cards
                            card.position_x = 20;
                            card.position_y = width;
                            width += 50;
                        }
                        this._updateCard(card);
                    }
                })
            }
        },
        toggleCardVisibility() {
            if (this.$state.clickCardId) {
                this.$state.cards?.forEach(card => {
                    if (card.id === this.$state.clickCardId) {
                        const previousCard = { ...card };
                        card.hidden = !card.hidden;
                        this.updateUndoHistory(previousCard);
                        this._updateCard(card);
                    }
                })
            }
        },
        rotateCard(movement: MovementRotateCard) {
            if (this.$state.clickCardId) {
                this.$state.cards?.forEach(card => {
                    if (card.id === this.$state.clickCardId) {
                        const previousCard = { ...card };
                        if (movement === MovementRotateCard.RIGHT) {
                            // If the movement is "right" and the degree is 270, set it to 0
                            if (card.rotate === 270) {
                                card.rotate = 0;
                            } else {
                                // Otherwise, add 90 to the degree value
                                card.rotate += 90;
                            }
                        } else if (movement === MovementRotateCard.LEFT) {
                            // If the movement is "left" and the degree is 0, set it to 270
                            if (card.rotate === 0) {
                                card.rotate = 270;
                            } else {
                                // Otherwise, subtract 90 from the degree value
                                card.rotate -= 90;
                            }
                        }
                        if (!this.isCardMovementInPlayerDeck(previousCard, card)) {
                            this.updateUndoHistory(previousCard);
                            this._updateCard(card);
                        }
                    }
                });
            }
        },
        addStatusPlayer(status: Status | null) {
            const table_user = this.$state.table?.table_users?.find(user => user.user.id === userStore.user.id);
            socket.emit('setStatusTableUser', {
                status, table_user, room: this.$state.room
            })
        },
        setPlayingPlayer() {
            const playingStatus = this.getExistPlayerPlayingStatus ? this.getExistPlayerPlayingStatus : false;
            this.$state.table?.table_users?.forEach(user => {
                if (user.user.id === userStore.user.id) {
                    user.playing = !user.playing;
                } else {
                    user.playing = false
                }
            })
            socket.emit('setPlayerPlaying', {
                table_users: this.$state.table?.table_users, room: this.$state.room
            })
        },
        isCardHidden() {
            if (this.$state.clickCardId) {
                let hidden = true;
                this.$state.cards?.forEach(c => {
                    if (c.id === this.$state.clickCardId) {
                        hidden = c.hidden;
                    }
                });
                return hidden;
            }
            return true;
        },
        _updateTableGameStatus(status: TableStatus) {
            socket.emit('updateTableGameStatus', {
                table: this.$state.table, status, room: this.$state.room
            }, (response: { status: number, message: string }) => {
                if (response.status === 200 && status === TableStatus.GAME_MASTER_EDIT) {
                    toast.success('Table is hide from other players')
                }
                if (response.status === 200 && status === TableStatus.PLAYING) {
                    toast.success('Table is back to playing mode for all players')
                }
            })
        },
        _showAllCards() {
            socket.emit('showAllCards', {
                room: this.$state.room
            });
        },
        _removePlayer(userId: number) {
            socket.emit('removePlayer', {
                userId, tableId: this.$state.table?.id, publicUrl: this.$state.table?.public_url
            });
        },
        _setNextPlayer(next_player: boolean) {
            socket.emit('setNextPlayer', {
                next_player, table_users: this.$state.table?.table_users, room: this.$state.table?.public_url
            });
        },
        _shuffleDeck() {
            if (this.$state.clickCardId) {
                const table_deck_id = this.$state.cards?.find(card => card.id === this.$state.clickCardId)?.table_deck.id;
                socket.emit('shuffleDeck', {
                    table_deck_id, room: this.$state.table?.public_url
                });
            }
        },
        resetDropZones() {
            this.$state.dropZones = {
                table: [],
                deck: [],
                junk: [],
                user: [],
            }
        },
        updateUndoHistory(previous: TableCard, historyMovement: boolean = false) {
            if (this.$state.gameMaster) {
                if (this.$state.refUndoHistory.length > this.getRefHistoryCapacity) {
                    this.$state.refUndoHistory.shift();
                }
                const previousCard = { ...previous };
                this.$state.refUndoHistory.push(previousCard);
                if (!historyMovement) {
                    this.removeRedoHistoryMovement();
                }
            }
        },
        updateRedoHistory(previous: TableCard) {
            if (this.$state.gameMaster) {
                if (this.$state.refRedoHistory.length > this.getRefHistoryCapacity) {
                    this.$state.refRedoHistory.shift();
                }
                const previousCard = { ...previous };
                this.$state.refRedoHistory.push(previousCard);
            }
        },
        removeRedoHistoryMovement() {
            if (this.$state.refRedoHistory.length > 0) {
                this.$state.refRedoHistory = [];
            }
        },
        historyMovement(move: HistoryMovement) {
            if (move === HistoryMovement.UNDO) {
                const cardHistory = this.$state.refUndoHistory.pop();
                if (cardHistory) {
                    const currentCard = this.replaceCard(cardHistory);
                    if (currentCard) {
                        if (!this.isCardMovementInPlayerDeck(cardHistory, currentCard)) {
                            this.updateRedoHistory({ ...currentCard });
                            this._updateCard(cardHistory);
                        }
                    }
                }
            } else {
                const cardHistory = this.$state.refRedoHistory.pop();
                if (cardHistory) {
                    const currentCard = this.replaceCard(cardHistory);
                    if (currentCard) {
                        if (!this.isCardMovementInPlayerDeck(cardHistory, currentCard)) {
                            this.updateUndoHistory({ ...currentCard }, true);
                            this._updateCard(cardHistory);
                        }
                    }
                }
            }
        },
        replaceCard(cardHistory: TableCard) {
            const cardIndex = this.$state.cards?.findIndex(card => card.id === cardHistory.id);
            if (cardIndex !== -1 && cardIndex) {
                const currentCard = this.$state.cards?.splice(cardIndex, 1)[0];
                if (currentCard) {
                    this.$state.cards?.push(cardHistory);
                    return currentCard
                }
            }
            return null;
        },
        isCardMovementInPlayerDeck(previousCard: TableCard, currentCard: TableCard) {
            if (previousCard.table_deck.id === currentCard.table_deck.id && previousCard.table_deck.id === this.getExistPlayerTableDeckId) {
                return true;
            }
            return false;
        }
    },
})

// Update Store without refresh page
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePlayerStore, import.meta.hot))
}