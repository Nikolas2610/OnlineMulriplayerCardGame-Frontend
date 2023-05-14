import socket from "@/plugins/socket";


export const setOnlineSocketUser = (userId: number | null) => {
    return new Promise((resolve, reject) => {
      if (userId) {
        socket.emit("setOnlineSocketUser", { user_id: userId, socket_id: socket.id }, (response: any) => {
          resolve(response);
        });
      } else {
        resolve(null);
      }
    });
  };

export const setOfflineSocketUser = (userId: number | null) => {
    if (userId) {
        socket.emit("setOfflineSocketUser", { user_id: userId, socket_id: socket.id });
    }
}