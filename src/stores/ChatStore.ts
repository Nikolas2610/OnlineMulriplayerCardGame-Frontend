import type { Message } from "@/types/online-table/Message";
import { acceptHMRUpdate, defineStore } from "pinia";
import socket from "@/plugins/socket";
import { useUserStore } from "./UserStore";
import type { WebSocketResponse } from "@/types/online-table/WebSocketResponse";
import { usePlayerStore } from "./PlayerStore";

const userStore = useUserStore();
const playerStore = usePlayerStore();

export const useChatStore = defineStore('ChatStore', {
    state: () => {
        return {
            message: '' as string,
            messages: [] as Message[], 
            unreadMessages: 0,
            room: playerStore.room as string | null,
            isChatOpen: false as boolean,
        }
    }, 
    getters: {
        getMessages: (state) =>  state.messages
    }, 
    actions: {
        _sendMessage() {
            if (this.$state.message.length > 0) {
                const data = {
                    message: this.$state.message, room: this.$state.room, user: userStore.user
                }
                socket.emit('sendMessage', {
                    data
                }, (response: WebSocketResponse) => {
                    if (response.status === 200) {
                        this.$state.message = '';
                    }
                })
            }
        }, 
        toggleChatMessenger() {
            if (!this.$state.isChatOpen) {
                this.$state.unreadMessages = 0;
            }
            this.$state.isChatOpen = !this.$state.isChatOpen;
        }
    }
})

// Update Store without refresh page
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot))
}