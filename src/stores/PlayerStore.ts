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
import { SocketStatus } from "@/types/online-table/SocketStatus.enum";

const userStore = useUserStore();
const toast = useToast();

export const usePlayerStore = defineStore('PlayerStore', {
    state: () => {
        return {
            socket: userStore.getSocketId as string | null,
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
            },
            leaverPlayer: {
                table: null as Table | null,
                loading: false,
            },
            isCardDetailsModalOpen: false,
        }
    },
    getters: {
        getExistPlayerTableDeckId: (state) => state.table?.table_decks?.find(deck => deck.user?.id === userStore.user.id)?.id,
        getJunkTableDeckId: (state) => state.dropZones.junk[0]?.tableDeckId,
        getTableDeckId: (state) => state.dropZones.table[0]?.tableDeckId,
        getExistPlayerPlayingStatus: (state) => state.table?.table_users?.find(user => user.user.id === userStore.user.id)?.playing,
        getExistTableUser: (state) => state.table?.table_users?.find(user => user.user.id === userStore.user.id),
        getTableExist: (state) => state.table?.game?.grid_cols && state.table?.game?.grid_rows ? state.table?.game?.grid_cols > 0 && state.table?.game?.grid_rows > 0 : false,
        getRefHistoryCapacity: (state) => state.refHistoryCapacity,
        getClickedCard: (state) => state.cards?.find(card => card.id === state.clickCardId) ?? null as TableCard | null
    },
    actions: {
        _joinTable(publicUrl: string) {
            // Not mount OnlineTable until get the leave player all the game data
            if (this.$state.leaverPlayer.table) {
                this.$state.leaverPlayer.loading = true;
            }
            // Join the table
            socket.emit('joinTable', {
                publicUrl, tableId: this.$state.table?.id
            }, (response: any) => {
                // Catch the error
                if (response.error) {
                    this.$state.room = null;
                    router.push({ name: 'lobby' })
                }
            });
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
            }, (response: TableUsers | any) => {
                if (response.socket_status === SocketStatus.LEAVE) {
                    this.$state.leaverPlayer.table = response.table;
                }
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
        _updateTurnTableUsers(event: any) {
            if (this.$state.table?.table_users) {
                const newOrder = [...this.$state.table?.table_users];
                const movedItem = newOrder.splice(event.moved.oldIndex, 1)[0];
                newOrder.splice(event.moved.newIndex, 0, movedItem);

                // If newIndex is smaller than oldIndex, it means the item was moved up.
                if (event.moved.newIndex < event.moved.oldIndex) {
                    newOrder[event.moved.newIndex].turn = 1;
                    newOrder[event.moved.oldIndex].turn -= 1;
                } else {
                    // If newIndex is greater than oldIndex, it means the item was moved down.
                    newOrder[event.moved.newIndex].turn = newOrder[event.moved.oldIndex].turn + 1;
                    newOrder[event.moved.oldIndex].turn += 1;
                }

                newOrder.forEach((user, index) => {
                    user.turn = index + 1;
                })

                socket.emit('setTurnTableUsers', {
                    table_users: newOrder, room: this.$state.room
                });
            }
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
        _exitTable() {
            socket.emit('exitTable', {
                table: this.$state.table, room: this.$state.room
            })
        },
        getCards(tableDeckId: number | undefined) {
            if (tableDeckId && this.$state.cards?.length) {
                return this.$state.cards?.filter(card => card.table_deck.id === tableDeckId);
            }
        },
        onDrop(event: DragEvent, tableDeckId: number | undefined, type: string) {
            // Check if the table status is in PLAYING or GAME_MASTER_EDIT mode
            if (this.$state.table?.status === TableStatus.PLAYING || this.$state.table?.status === TableStatus.GAME_MASTER_EDIT) {
                // Check if the dataTransfer object exists
                if (event.dataTransfer) {
                    // Get the card object from dataTransfer
                    const card: TableCard = JSON.parse(event.dataTransfer.getData('card'));

                    // If the player is not playing or not a game master, and the card is not a share card, return
                    if ((!this.getExistTableUser?.playing && !this.gameMaster) && (card.table_deck.id !== this.getExistPlayerTableDeckId || type !== TableDeckType.USER)) {
                        toast.warning('Turn on your turn to be able to play')
                        return;
                    }

                    // Get drag-related information from dataTransfer
                    const topBox = parseInt(event.dataTransfer.getData('top'), 10);
                    const leftBox = parseInt(event.dataTransfer.getData('left'), 10);
                    const cardWidth = parseInt(event.dataTransfer.getData('cardWidth'), 10);
                    const cardHeight = parseInt(event.dataTransfer.getData('cardHeight'), 10);

                    // Find the drop zone where the card is being dropped
                    const dropZone = this.$state.dropZones[type]?.find((item: DeckItem) => item.tableDeckId === tableDeckId);
                    const dropZoneRect = dropZone.element.getBoundingClientRect();

                    // Calculate the offset positions of the card within the drop zone
                    const offsetY = event.y - dropZoneRect.y - topBox;
                    const offsetX = event.x - dropZoneRect.x - leftBox;

                    // Get the dimensions of the drop zone
                    const { offsetHeight, offsetWidth } = dropZone.element;

                    // Loop through the cards in the state
                    this.$state.cards?.forEach(dragCard => {
                        // Check if the current card is the one being dragged
                        if (dragCard.id === card.id) {
                            // Update the card position within the drop zone based on the offsets
                            dragCard.position_x = Math.max(0, Math.min(offsetHeight - cardHeight, offsetY));
                            dragCard.position_y = Math.max(0, Math.min(offsetWidth - cardWidth, offsetX));

                            // Update the z-index of the card
                            dragCard.z_index = this.$state.zIndex;

                            // Update card visibility based on the table deck type
                            if (type === TableDeckType.JUNK) {
                                dragCard.hidden = false;
                            } else if (type === TableDeckType.USER) {
                                if (dragCard.table_deck.type !== TableDeckType.USER) {
                                    dragCard.hidden = true;
                                }
                            }

                            // Update the card's table deck type
                            dragCard.table_deck.type = type as TableDeckType;

                            // Update the card's table deck ID if it has changed
                            if (tableDeckId && card.table_deck.id !== tableDeckId) {
                                dragCard.table_deck.id = tableDeckId;
                            }

                            // Update the undo history and card state if the card movement is not within the player's deck
                            if (!this.isCardMovementInPlayerDeck(card, dragCard)) {
                                this.updateUndoHistory(card);
                                this._updateCard(dragCard);
                            }

                            // Update the state with the clicked card ID and increment the z-index
                            this.$state.clickCardId = dragCard.id;
                            this.$state.zIndex++;
                        }
                    });
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
            if (this.$state.clickCardId && this.isCardAvailableForAction()) {
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
        isCardAvailableForAction() {
            return (this.getExistTableUser?.playing || this.$state.gameMaster || this.getClickedCard?.table_deck.id === this.getExistPlayerTableDeckId)
        },
        rotateCard(movement: MovementRotateCard) {
            if (this.$state.clickCardId && this.isCardAvailableForAction()) {
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
            // Retrieve the current player's playing status or set to false if not found
            const playingStatus = this.getExistPlayerPlayingStatus ? this.getExistPlayerPlayingStatus : false;

            // Find the index of the current user in the table_users array
            const userIndex = this.table?.table_users?.map(user => user.user.id).indexOf(userStore.user?.id ?? -1);

            // Check if the table, table_users array, and userIndex are valid
            if (this.$state.table && this.$state.table.table_users && userIndex !== undefined && userIndex !== -1) {
                // Calculate the next player's index (wrap around to 0 if at the end of the array)
                const nextPlayer = userIndex + 1 >= this.$state.table?.table_users?.length ? 0 : userIndex + 1

                // Update the playing status of each user in the table_users array
                this.$state.table?.table_users?.forEach((user, index) => {
                    if (index === userIndex) {
                        // Toggle the current player's playing status
                        user.playing = !user.playing;
                    } else if (nextPlayer === index && playingStatus && this.$state.table?.game?.auto_turn) {
                        // Set the next player as the active player if auto_turn is enabled
                        user.playing = true;
                    } else {
                        // Set other players' playing status to false
                        user.playing = false
                    }
                })
            }

            // Emit a 'setPlayerPlaying' event to the server with the updated table_users array and room
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
        cardToPlayer(deckId: number) {
            if (this.$state.clickCardId && this.isCardAvailableForAction()) {
                const card = this.$state.cards?.find(c => c.id === this.$state.clickCardId);
                if (card && card.table_deck) {
                    if (card.table_deck.id !== undefined) {
                        this.$state.clickCardId = null;
                        // Set zero values at card position
                        if (card.table_deck.type === TableDeckType.TABLE) {
                            card.position_x = 0;
                            card.position_y = 0;
                        }
                        card.table_deck.id = deckId;
                        this.updateUndoHistory({ ...card });
                        this._updateCard(card);
                    }
                }
            }
        },
        replaceCard(cardHistory: TableCard) {
            const cardIndex = this.$state.cards?.findIndex(card => card.id === cardHistory.id);
            if (cardIndex !== undefined && cardIndex !== -1 && cardIndex >= 0) {
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