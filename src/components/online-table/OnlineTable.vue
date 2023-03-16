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
                :key="index" @on-drag-start="(event, cardRef) => onDragStart(event, cardRef, card)" :absolute="true" :rotate="true" />
        </div>
    </Flex>

    <!-- Player Deck -->
    <Flex :justify="'center'" v-if="playerStore.cards">
        <div :class="`w-[${width}px] h-[150px]`" class="bg-secondary border relative" ref="playerDeckReference"
            @drop="(event) => onDrop(event, playerStore.getExistPlayerTableDeckId, 'user')" @dragover.prevent
            @dragleave="(event) => onDragLeave(event)" @dragenter.prevent="(event) => onDragEnter(event)">
            <div>
                <Flex class="border w-full h-full">
                    <DraggableCard :card="card"
                        v-for="(card, index) in playerStore.getCards(playerStore.getExistPlayerTableDeckId)" :key="index"
                        @on-drag-start="(event, cardRef) => onDragStart(event, cardRef, card)" :absolute="true" :rotate="true" :show-cards="true" :player-deck="true" />
                </Flex>
            </div>
        </div>
    </Flex>

    <PlayerSettings />
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/PlayerStore';
import TableDecks from '@/components/online-table/TableDecks.vue'
import Flex from '../wrappers/Flex.vue';
import { ref, watch, onMounted } from 'vue';
import type { TableCard } from '@/types/tables/TableCard';
import DraggableCard from './DraggableCard.vue';
import PlayerSettings from './PlayerSettings.vue';

const playerStore = usePlayerStore();
const height = ref(800);
const width = ref(1200);
const heightCell = ref(800)

if (playerStore.table?.game) {
    heightCell.value = parseFloat((height.value / playerStore.table?.game.grid_rows).toFixed(1));
}

const playerDeckReference = ref<HTMLElement | null>(null);
const tableDeckReference = ref<HTMLElement | null>(null);
const tableDeckTrashReference = ref<HTMLElement | null>(null);

onMounted(() => {
    if (tableDeckTrashReference.value) {
        playerStore.deckReferences.junk = tableDeckTrashReference.value;
        playerStore.dropZones.junk[0].element = tableDeckTrashReference.value
    }
    if (tableDeckReference.value) {
        playerStore.deckReferences.table = tableDeckReference.value;
        playerStore.dropZones.table[0].element = tableDeckReference.value
    }
    if (playerDeckReference.value) {
        playerStore.deckReferences.user = playerDeckReference.value;
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
}
// END DRAG

// For Debug 
watch(() => playerStore.table?.game?.grid_rows,
    () => {
        if (playerStore.table?.game) {
            heightCell.value = parseFloat((height.value / playerStore.table?.game.grid_rows).toFixed(1));
        }
    })
</script>