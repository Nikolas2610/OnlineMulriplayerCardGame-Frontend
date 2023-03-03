import { io } from 'socket.io-client'
import { useToast } from 'vue-toastification'

const socket = io('http://localhost:3000')
const toast = useToast();
socket.on('connect_error', (response) => {
    console.log('\x1b[31m%s\x1b[0m', 'connect_error');
})
socket.on('connect', () => {
    console.log('\x1b[32m%s\x1b[0m', 'Client connect: ' + socket.id);
})

socket.on('error', (response) => {
    if (response) {
        toast.error(response)
    }
})

export default socket