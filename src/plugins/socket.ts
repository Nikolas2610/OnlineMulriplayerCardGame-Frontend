import { usePlayerStore } from '@/stores/PlayerStore';
import { io } from 'socket.io-client'
import { useToast } from 'vue-toastification'

const playerStore = usePlayerStore();
const socket = io(import.meta.env.VITE_SOCKET_URL)
const toast = useToast();
socket.on('connect_error', (response) => {
    console.log('\x1b[31m%s\x1b[0m', 'connect_error');
    playerStore.socket = null;
})
socket.on('connect', () => {
    console.log('\x1b[32m%s\x1b[0m', 'Client connect: ' + socket.id);
    playerStore.socket = socket.id;
})

socket.on('error', (response) => {
    if (response) {
        toast.error(response)
    }
})

export default socket