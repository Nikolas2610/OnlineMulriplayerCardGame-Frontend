import type { CardStatus } from "./CardStatus.enum";

export interface Image {
    imageName: string,
    name: string,
    file: File,
    imageScreen: string | null,
    private: boolean,
    status: CardStatus
}