import { TableStatus } from "@/types/tables/TableStatus.enum";

export const StatusTable = [
    { id: TableStatus.PAUSE, name: "Pause" },
    { id: TableStatus.FINISH, name: "Finish" },
    { id: TableStatus.PLAYING, name: "Playing" },
    { id: TableStatus.WAITING, name: "Waiting" },
    { id: TableStatus.PLAYER_DISCONNECTED, name: "Player Disconnected" },
    { id: TableStatus.PLAYER_LEAVE, name: "Player Leave" }
];