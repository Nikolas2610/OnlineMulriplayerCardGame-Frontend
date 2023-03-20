<template>
    <div class="fixed bottom-10 left-10 transition-height ease duration-1000 z-[2147483640]"
        :class="chatStore.isChatOpen ? 'w-[500px] h-[600px]' : 'w-[50px] h-[50px]'">
        <Flex justify="start" v-if="!chatStore.isChatOpen">
            <div class="cursor-pointer hover:text-primary duration-300 transition hover:scale-110 relative"
                @click="chatStore.toggleChatMessenger()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-12 h-12"
                    viewBox="0 0 16 16">
                    <path
                        d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                </svg>
                <div v-if="chatStore.unreadMessages > 0"
                    class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                    {{ chatStore.unreadMessages  }}    
                </div>
            </div>
        </Flex>
        <div v-else class="h-full relative bg-dark-smooth rounded-3xl p-4">
            <Flex justify="between" :column="true" class="h-full" :gap="6">
                <Flex justify="between">
                    <div class="text-2xl px-2 font-bold">
                        Table Chat
                    </div>
                    <div class="cursor-pointer hover:text-primary duration-300 transition hover:scale-110"
                        @click="chatStore.toggleChatMessenger()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-8 h-8"
                            viewBox="0 0 16 16">
                            <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                        </svg>
                    </div>
                </Flex>
                <Flex class="bottom-5 left-6 bg-dark rounded-3xl w-full p-4 h-full overflow-y-auto scroll-smooth"
                    v-if="chatStore.getMessages.length > 0" :columnReverse="true" :gap="4">
                    <ChatMessage :data="message" v-for="message in chatStore.getMessages" :key="message.id"
                        :isActiveUserMessage="message.user.id === userStore.user.id" />
                </Flex>
                <Flex justify="center" items="center"
                    class="text-xl bottom-5 left-6 bg-dark rounded-3xl w-full p-4 h-full overflow-y-auto scroll-smooth"
                    v-else :columnReverse="true" :gap="4">
                    No messages
                </Flex>
                <form @submit.prevent="chatStore._sendMessage()">
                    <Flex justify="center" items="center" class="bg-dark bottom-5 rounded-3xl left-6 w-full" :gap="4">
                        <input v-model="message" @input="chatStore.message = message"
                            class="w-full bg-dark rounded-3xl p-4 focus:outline-none focus:ring-2 transition duration-300 focus:ring-primary focus:ring-opacity-50"
                            placeholder="Type your message..." />
                        <button type="submit" class="w-8 h-8 mr-8 absolute right-3 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="w-8 h-8 mr-8 cursor-pointer hover:text-primary transition duration-300 hover:scale-110"
                                viewBox="0 0 16 16">
                                <path
                                    d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                            </svg>
                        </button>
                    </Flex>
                </form>
            </Flex>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch, onUnmounted } from 'vue';
import Flex from '../wrappers/Flex.vue';
import ChatMessage from '@/components/online-table/chat/ChatMessage.vue'
import { useChatStore } from '@/stores/ChatStore'
import socket from '@/plugins/socket';
import { useUserStore } from '@/stores/UserStore';

const chatStore = useChatStore();
const message = ref('')
const userStore = useUserStore();

onBeforeMount(() => {
    socket.on('getSendMessage', (response: any) => {
        if (response) {
            chatStore.messages.unshift(response);
            if (!chatStore.isChatOpen) {
                chatStore.unreadMessages++;
            }
        }
    })
})

watch(() => chatStore.message,
    (newVal) => {
        message.value = newVal;
    })

onUnmounted(() => {
    socket.off('getSendMessage');
    chatStore.messages = [];
})
</script>