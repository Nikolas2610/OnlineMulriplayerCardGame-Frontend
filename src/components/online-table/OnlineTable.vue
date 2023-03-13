<template>
    <!-- Decks -->
    <Flex :justify="'center'">
        <Flex :class="`w-[${width}px] h-[120px]`" class="bg-secondary border px-4" :items="'center'" :justify="'between'">
            <Flex v-if="playerStore.cards">
                <TableDecks :deck="{ tableDeckId: deck.tableDeckId, index, cards: playerStore.getCards(deck.tableDeckId) }"
                    :index="index" v-for="(deck, index) in playerStore.dropZones.deck" :key="deck.tableDeckId"
                    @deck-create="(reference) => addDeckToDropZone(reference, index)"
                    @on-drag-start="(event, cardRef, card) => onDragStart(event, cardRef, card)"
                    @on-drag-enter="(event) => onDragEnter(event)" @on-drag-leave="(event) => onDragLeave(event)"
                    @on-drop="(event, index) => onDrop(event, index, 'deck')" />
            </Flex>
            <Flex :column="true" :items="'center'" :gap="1" v-if="playerStore.cards">
                <div class="card-box border cursor-pointer relative" ref="tableDeckTrashReference"
                    @drop="(event) => onDrop(event, playerStore.getJunkTableDeckId, 'junk')" @dragover.prevent
                    @dragleave="(event) => onDragLeave(event)" @dragenter.prevent="(event) => onDragEnter(event)">
                    <DraggableCard :card="card"
                        v-for="(card, index) in playerStore.getCards(playerStore.getJunkTableDeckId)" :key="index"
                        @on-drag-start="(event, cardRef) => onDragStart(event, cardRef, card)" />
                </div>
                <div>Table Deck</div>
            </Flex>
        </Flex>
    </Flex>

    <!-- Table -->
    <Flex :justify="'center'" v-if="playerStore.cards">
        <div class="grid bg-dark relative" :class="`grid-cols-${playerStore.table?.game?.grid_cols} grid-rows-${playerStore.table?.game?.grid_rows} h-[${height}px] w-[${width}px]`
        " ref="tableDeckReference" @drop="(event) => onDrop(event, playerStore.getTableDeckId, 'table')"
            @dragover.prevent @dragleave="(event) => onDragLeave(event)" @dragenter.prevent="(event) => onDragEnter(event)">
            <div class="col-span-1" v-for="index in playerStore.table?.game?.grid_cols">
                <div class="row-span-1 bg-primary border w-full" :class="`h-[${heightCell}px]`"
                    v-for="index in playerStore.table?.game?.grid_rows"></div>
            </div>
            <DraggableCard :card="card" v-for="(card, index) in playerStore.getCards(playerStore.getTableDeckId)"
                :key="index" @on-drag-start="(event, cardRef) => onDragStart(event, cardRef, card)" :absolute="true" />
        </div>
    </Flex>

    <!-- Player Deck -->
    <Flex :justify="'center'" v-if="playerStore.cards">
        <div :class="`w-[${width}px] h-[150px]`" class="bg-secondary border relative" ref="playerDeckReference"
            @drop="(event) => onDrop(event, playerStore.getExistPlayerTableDeckId, 'user')" @dragover.prevent
            @dragleave="(event) => onDragLeave(event)" @dragenter.prevent="(event) => onDragEnter(event)">
            <!-- <Flex v-if="playerStore.cards">
                <img :src="loadImage(card.card.image)" class="w-16 h-16" alt="" srcset="" :id="card.id.toString()"
                    v-for="card in playerStore.cards.filter(card => card.table_deck?.id === playerStore.getExistPlayerTableDeckId)">
            </Flex> -->
            <div>
                <Flex class="border w-full h-full">
                    <!-- No cards -->
                    <!-- TODO: Remove image after develop -->
                    <!-- <img src="http://localhost:3000/1673792413257-52306542.png" class="w-16 h-16" alt="" v-for="i in 8" :key="i"> -->
                    <DraggableCard :card="card"
                        v-for="(card, index) in playerStore.getCards(playerStore.getExistPlayerTableDeckId)" :key="index"
                        @on-drag-start="(event, cardRef) => onDragStart(event, cardRef, card)" :absolute="true" />
                </Flex>
            </div>
        </div>
    </Flex>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/PlayerStore';
import TableDecks from '@/components/online-table/TableDecks.vue'
import Flex from '../wrappers/Flex.vue';
import { loadImage } from '@/utils/Function';
import { ref, watch, onMounted } from 'vue';
import type { TableCard } from '@/types/tables/TableCard';
import DraggableCard from './DraggableCard.vue';
import { TableStatus } from '@/types/tables/TableStatus.enum';
import type { DropZone } from '@/types/online-table/DropZone';
import type { DeckItem } from '@/types/online-table/DeckItem';

const playerStore = usePlayerStore();
const height = ref(800);
const width = ref(1200);
const heightCell = ref(800)
if (playerStore.table?.game) {
    heightCell.value = parseFloat((height.value / playerStore.table?.game.grid_rows).toFixed(1));
}
// TESTING

const test = ref<DropZone>({
    table: [],
    deck: [],
    junk: [],
    user: [],
});
const test2: string = 'deck';
test.value.table?.push({ tableDeckId: 0, element: null });
test.value[test2]?.push({ tableDeckId: 0, element: null });
console.log(test.value[test2]?.find((item: DeckItem) => item.tableDeckId === 0));




// END TESTING


const playerDeckReference = ref<HTMLElement | null>(null);
const tableDeckReference = ref<HTMLElement | null>(null);
const tableDeckTrashReference = ref<HTMLElement | null>(null);

onMounted(() => {
    console.log('onMounted');

    console.log(playerStore.dropZones);
    if (tableDeckTrashReference.value) {
        playerStore.dropZones.junk[0].element = tableDeckTrashReference.value
    }
    if (tableDeckReference.value) {
        playerStore.dropZones.table[0].element = tableDeckReference.value
    }
    if (playerDeckReference.value) {
        playerStore.dropZones.user[0].element = playerDeckReference.value
    }
})

const addDeckToDropZone = (reference: HTMLElement | null, index: number) => {
    if (reference) {
        playerStore.dropZones.deck[index].element = reference;
    }
}

// DRAG EVENTS
const zIndex = ref(2);
const onDragLeave = (event: any) => {
    // console.log('\x1b[32m%s\x1b[0m', 'onDragLeave');
}
const onDragEnter = (event: any) => {
    // console.log('\x1b[31m%s\x1b[0m', 'onDragEnter');
}

const onDragStart = (event: any, item: HTMLElement, card: TableCard) => {
    // console.log('\x1b[34m%s\x1b[0m', 'onDragStart');
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('card', JSON.stringify(card));
    event.dataTransfer.setData('cardHeight', item.offsetHeight);
    event.dataTransfer.setData('cardWidth', item.offsetWidth);
    event.dataTransfer.setData('top', event.y - item.getBoundingClientRect().top);
    event.dataTransfer.setData('left', event.x - item.getBoundingClientRect().left);
}

const onDrop = (event: DragEvent, tableDeckId: number | undefined, type: string) => {
    playerStore.onDrop(event, tableDeckId, type, zIndex.value++);
    // console.log('\x1b[34m%s\x1b[0m', 'onDrop');
    // TODO: Remove waiting status after develop 
    // if (playerStore.table?.status === TableStatus.PLAYING || playerStore.table?.status === TableStatus.WAITING) {
    //     if (event.dataTransfer) {
    //         const card: TableCard = JSON.parse(event.dataTransfer.getData('card'));

    //         const topBox = parseInt(event.dataTransfer.getData('top'), 10);

    //         const leftBox = parseInt(event.dataTransfer.getData('left'), 10);

    //         const cardWidth = parseInt(event.dataTransfer.getData('cardWidth'), 10);
    //         const cardHeight = parseInt(event.dataTransfer.getData('cardHeight'), 10);


    //         const dropZone = playerStore.dropZones[type]?.find((item: DeckItem) => item.tableDeckId === tableDeckId);
    //         const dropZoneRect = dropZone.element.getBoundingClientRect();
    //         const offsetY = event.y - dropZoneRect.y - topBox;
    //         const offsetX = event.x - dropZoneRect.x - leftBox;
    //         const { offsetHeight, offsetWidth } = dropZone.element;
    //         playerStore.cards?.forEach(dragCard => {
    //             if (dragCard.id === card.id) {
    //                 // TODO: FIX other deck
    //                 if (tableDeckId && card.table_deck.id !== tableDeckId) {
    //                     dragCard.table_deck.id = tableDeckId;
    //                 }
    //                 // Update the top position of the dropped box
    //                 if (offsetY > offsetHeight - cardHeight) {
    //                     // Card is too big, adjust it to fit inside the drop zone
    //                     dragCard.position_x = offsetHeight - cardHeight;
    //                 } else if (offsetY < 0) {
    //                     // Card is partially outside the drop zone at the top, adjust it to fit inside
    //                     dragCard.position_x = 0;
    //                 } else {
    //                     // Card is fully inside the drop zone, position it at the current y coordinate
    //                     dragCard.position_x = offsetY;
    //                 }
    //                 // Update the left position of the dropped box
    //                 if (offsetX > offsetWidth - cardWidth) {
    //                     // Card is too big, adjust it to fit inside the drop zone
    //                     dragCard.position_y = offsetWidth - cardWidth
    //                 } else if (offsetX < 0) {
    //                     // Card is partially outside the drop zone at the left, adjust it to fit inside
    //                     dragCard.position_y = 0;
    //                 } else {
    //                     // Card is fully inside the drop zone, position it at the current x coordinate
    //                     dragCard.position_y = offsetX;
    //                 }
    //                 dragCard.z_index = zIndex.value++
    //             }
    //         })
    //     }
    // }

}

// END DRAG


// For Debug 
watch(() => playerStore.table?.game?.grid_rows,
    () => {
        if (playerStore.table?.game) {
            heightCell.value = parseFloat((height.value / playerStore.table?.game.grid_rows).toFixed(1));
        }
    })
watch(() => playerStore.cards,
    () => {
        console.log("update Cards Online table");
    })
</script>