import { useUserStore } from '@/stores/UserStore';
import { setOnlineSocketUser } from '@/utils/sockets/helpers';
import { io } from 'socket.io-client'
import { useToast } from 'vue-toastification'

const userStore = useUserStore();
const socket = io(import.meta.env.VITE_SOCKET_URL)
const toast = useToast();
socket.on('connect_error', (response) => {
    process.env.NODE_ENV === 'development' ? console.log('\x1b[31m%s\x1b[0m', 'connect_error') : '';
    userStore.socket_id = null;
})
socket.on('connect', async () => {
    process.env.NODE_ENV === 'development' ? console.log('\x1b[32m%s\x1b[0m', 'Client connect: ' + socket.id) : '';
    userStore.socket_id = socket.id;
    // If user is logged in, set online socket user
    if (userStore.user.id) {
        const response: any = await setOnlineSocketUser(userStore.user.id);
        // If user not exists remove it from the stores
        if (response?.error) {
            userStore.$reset();
            localStorage.removeItem("username");
            localStorage.removeItem("id");
        }
    }
})

socket.on('error', (response) => {
    if (response) {
        toast.error(response)
    }
})

export default socket