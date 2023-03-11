<template>
    <!-- Decks -->
    <Flex :justify="'center'">
        <Flex :class="`w-[${width}px] h-[120px]`" class="bg-secondary border px-4" :items="'center'" :justify="'between'">
            <Flex>
                <TableDecks :table-deck-id="index" :cards="getCards(index)" :index="index" v-for="(i, index) in 2" :key="i"
                @deck-create="(reference) => addDeckToDropZone(reference)"
                @on-drag-start="(event, cardRef, card) => onDragStart(event, cardRef, card)"
                @on-drag-enter="(event) => onDragEnter(event)"
                @on-drag-leave="(event) => onDragLeave(event)"
                @on-drop="(event, index) => onDrop(event, index)" />
            </Flex>
            <Flex :column="true" :items="'center'" :gap="1">
                <div class="w-[50px] h-[75px] border cursor-pointer relative" ref="tableDeckTrashReference"
                    @drop="(event) => onDrop(event, 2)" @dragover.prevent @dragleave="(event) => onDragLeave(event)"
                    @dragenter.prevent="(event) => onDragEnter(event)">
                    <DraggableCard :card="card" v-for="(card, index) in getCards(2)" :key="index"
                        @on-drag-start="(event, cardRef) => onDragStart(event, cardRef, card)" />
                </div>
                <div>Table Deck</div>
            </Flex>
        </Flex>
    </Flex>

    <!-- Table -->
    <Flex :justify="'center'">
        <div class="grid bg-dark relative" :class="`grid-cols-${playerStore.table?.game?.grid_cols} grid-rows-${playerStore.table?.game?.grid_rows} h-[${height}px] w-[${width}px]`
        " ref="tableDeckReference" @drop="(event) => onDrop(event, 3)" @dragover.prevent
            @dragleave="(event) => onDragLeave(event)" @dragenter.prevent="(event) => onDragEnter(event)">
            <div class="col-span-1" v-for="index in playerStore.table?.game?.grid_cols">
                <div class="row-span-1 bg-primary border w-full" :class="`h-[${heightCell}px]`"
                    v-for="index in playerStore.table?.game?.grid_rows"></div>
            </div>
            <DraggableCard :card="card" v-for="(card, index) in getCards(3)" :key="index"
                @on-drag-start="(event, cardRef) => onDragStart(event, cardRef, card)" :absolute="true" />
        </div>
    </Flex>

    <!-- Player Deck -->
    <Flex :justify="'center'">
        <div :class="`w-[${width}px] h-[150px]`" class="bg-secondary border relative" ref="playerDeckReference"
            @drop="(event) => onDrop(event, 4)" @dragover.prevent @dragleave="(event) => onDragLeave(event)"
            @dragenter.prevent="(event) => onDragEnter(event)">
            <Flex v-if="playerStore.cards">
                <img :src="loadImage(card.card.image)" class="w-16 h-16" alt="" srcset="" :id="card.id.toString()"
                    v-for="card in playerStore.cards.filter(card => card.table_deck?.id === playerStore.tableDeckId)">
            </Flex>
            <div v-else>
                <Flex class="border w-full h-full">
                    <!-- No cards -->
                    <!-- TODO: Remove image after develop -->
                    <!-- <img src="http://localhost:3000/1673792413257-52306542.png" class="w-16 h-16" alt="" v-for="i in 8" :key="i"> -->
                    <DraggableCard :card="card" v-for="(card, index) in getCards(4)" :key="index"
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

const playerStore = usePlayerStore();
const height = ref(800);
const width = ref(1200);
const heightCell = ref(800)
if (playerStore.table?.game) {
    heightCell.value = parseFloat((height.value / playerStore.table?.game.grid_rows).toFixed(1));
}
// TESTING
interface OnlineTableDeck {
    tableDeckId: number | undefined,
    element: HTMLElement | null
}
interface DropZone {
    table: OnlineTableDeck[],
    deck: OnlineTableDeck[],
    junk: OnlineTableDeck[],
    user: OnlineTableDeck[]
}

const test = ref<DropZone>({
    table: [],
    deck: [],
    junk: [],
    user: [],
});
const test2 = 'deck';
test.value.table?.push({tableDeckId: 0, element: null});
test.value[test2]?.push({tableDeckId: 0, element: null});




// END TESTING


const playerDeckReference = ref<HTMLElement | null>(null);
const tableDeckReference = ref<HTMLElement | null>(null);
const tableDeckTrashReference = ref<HTMLElement | null>(null);
const dropZones = ref<HTMLElement[]>([]);
onMounted(() => {
    if (tableDeckTrashReference.value) {
        dropZones.value.push(tableDeckTrashReference.value)
    }
    if (tableDeckReference.value) {
        dropZones.value.push(tableDeckReference.value)
    }
    if (playerDeckReference.value) {
        dropZones.value.push(playerDeckReference.value)
    }


    console.log(dropZones.value);

})

interface TableCardTest {
    id: number,
    hidden: false,
    rotate: number,
    turn: number,
    position_x: number,
    position_y: number,
    table_deck: number,
    card: string,
    z_index: number,
}

const addDeckToDropZone = (reference: HTMLElement | null) => {
    if (reference) {
        dropZones.value.unshift(reference);
    }
    console.log(dropZones.value);
}

const cards = ref<TableCardTest[]>([
    {
        id: 1,
        hidden: false,
        rotate: 0,
        turn: 0,
        position_x: 0,
        position_y: 0,
        table_deck: 0,
        card: 'http://localhost:3000/1673792348036-277216194.png',
        z_index: 1,
    },
    {
        id: 2,
        hidden: false,
        rotate: 0,
        turn: 0,
        position_x: 0,
        position_y: 0,
        table_deck: 0,
        card: 'http://localhost:3000/1673792403779-798018874.png',
        z_index: 1,
    },
    {
        id: 3,
        hidden: false,
        rotate: 0,
        turn: 1,
        position_x: 0,
        position_y: 0,
        table_deck: 1,
        card: 'http://localhost:3000/1678443351351-251978164.png',
        z_index: 1,
    },
    {
        id: 4,
        hidden: false,
        rotate: 0,
        turn: 0,
        position_x: 0,
        position_y: 0,
        table_deck: 1,
        card: 'http://localhost:3000/1678443362847-485217346.png',
        z_index: 2,
    },
    {
        id: 5,
        hidden: false,
        rotate: 0,
        turn: 1,
        position_x: 0,
        position_y: 0,
        table_deck: 2,
        card: 'http://localhost:3000/1678443351351-251978164.png',
        z_index: 1,
    },
    {
        id: 6,
        hidden: false,
        rotate: 0,
        turn: 0,
        position_x: 0,
        position_y: 0,
        table_deck: 2,
        card: 'http://localhost:3000/1678443362847-485217346.png',
        z_index: 2,
    },
    {
        id: 7,
        hidden: false,
        rotate: 0,
        turn: 0,
        position_x: 0,
        position_y: 0,
        table_deck: 3,
        card: 'http://localhost:3000/1678443362847-485217346.png',
        z_index: 2,
    },
    {
        id: 8,
        hidden: false,
        rotate: 0,
        turn: 0,
        position_x: 0,
        position_y: 0,
        table_deck: 4,
        card: 'http://localhost:3000/1678443362847-485217346.png',
        z_index: 2,
    },
])

const getCards = ((id: number) => {
    return cards.value.filter(card => card.table_deck === id).sort((a, b) => a.turn - b.turn);
})

// DRAG EVENTS
const zIndex = ref(2);
const onDragLeave = (event: any) => {
    console.log('\x1b[32m%s\x1b[0m', 'onDragLeave');
}
const onDragEnter = (event: any) => {
    console.log('\x1b[31m%s\x1b[0m', 'onDragEnter');
}

const onDragStart = (event: any, item: HTMLElement, card: TableCardTest) => {

    console.log('\x1b[34m%s\x1b[0m', 'onDragStart');
    console.log(item);
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('card', JSON.stringify(card));
    event.dataTransfer.setData('cardHeight', item.offsetHeight);
    event.dataTransfer.setData('cardWidth', item.offsetWidth);
    event.dataTransfer.setData('top', event.y - item.getBoundingClientRect().top);
    event.dataTransfer.setData('left', event.x - item.getBoundingClientRect().left);
}

const onDrop = (event: DragEvent, drop: number) => {
    console.log('\x1b[34m%s\x1b[0m', 'onDrop');
    if (event.dataTransfer) {
        const card: TableCardTest = JSON.parse(event.dataTransfer.getData('card'));
        const dragCardIndex = cards.value.map(c => c.id).indexOf(card.id);
        if (card.table_deck !== drop) {
            cards.value[dragCardIndex].table_deck = drop;
        }
        const topBox = parseInt(event.dataTransfer.getData('top'), 10);
        const leftBox = parseInt(event.dataTransfer.getData('left'), 10);
        const cardWidth = parseInt(event.dataTransfer.getData('cardWidth'), 10);
        const cardHeight = parseInt(event.dataTransfer.getData('cardHeight'), 10);

        const dropZoneRect = dropZones.value[drop].getBoundingClientRect();
        const offsetY = event.y - dropZoneRect.y - topBox;
        const offsetX = event.x - dropZoneRect.x - leftBox;
        const { offsetHeight, offsetWidth } = dropZones.value[drop];
        // Update the top position of the dropped box
        if (offsetY > offsetHeight - cardHeight) {
            // Card is too big, adjust it to fit inside the drop zone
            // boxes1.value[id].top = offsetHeight - cardHeight;
            cards.value[dragCardIndex].position_x = offsetHeight - cardHeight;
        } else if (offsetY < 0) {
            // Card is partially outside the drop zone at the top, adjust it to fit inside
            cards.value[dragCardIndex].position_x = 0;
        } else {
            // Card is fully inside the drop zone, position it at the current y coordinate
            cards.value[dragCardIndex].position_x = offsetY;
        }
        // Update the left position of the dropped box
        if (offsetX > offsetWidth - cardWidth) {
            // Card is too big, adjust it to fit inside the drop zone
            cards.value[dragCardIndex].position_y = offsetWidth - cardWidth
        } else if (offsetX < 0) {
            // Card is partially outside the drop zone at the left, adjust it to fit inside
            cards.value[dragCardIndex].position_y = 0;
        } else {
            // Card is fully inside the drop zone, position it at the current x coordinate
            cards.value[dragCardIndex].position_y = offsetX;
        }
        cards.value[dragCardIndex].z_index = zIndex.value++
    }
}

// END DRAG



watch(() => playerStore.table?.game?.grid_rows,
    () => {
        if (playerStore.table?.game) {
            heightCell.value = parseFloat((height.value / playerStore.table?.game.grid_rows).toFixed(1));
        }
    })

</script>