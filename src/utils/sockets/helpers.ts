import socket from "@/plugins/socket";


export const setOnlineSocketUser = (userId: number | null) => {
    if (userId) {
        socket.emit("setOnlineSocketUser", { user_id: userId, socket_id: socket.id });
    }
}

export const setOfflineSocketUser = (userId: number | null) => {
    if (userId) {
        socket.emit("setOfflineSocketUser", { user_id: userId, socket_id: socket.id });
    }
}