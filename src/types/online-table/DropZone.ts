import type { DeckItem } from "./DeckItem";

export interface DropZone {
    table: DeckItem[],
    deck: DeckItem[],
    junk: DeckItem[],
    user: DeckItem[]
    [key: string]: any;
}