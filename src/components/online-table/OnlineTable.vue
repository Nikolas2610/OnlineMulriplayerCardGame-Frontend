<template>
    <!-- Decks -->
    <Flex :justify="'center'">
        <Flex :class="`w-[${width}px] h-[120px]`" class="bg-secondary border px-4 divide-x-2 h-full" items="center"
            justify="center">
            <Flex v-if="playerStore.cards">
                <TableDecks
                    :deck="{ tableDeckId: deck.tableDeckId, index, cards: playerStore.getCards(deck.tableDeckId), deckName: playerStore.table?.table_decks?.find(d => d.id === deck.tableDeckId)?.deck?.name, deckType: playerStore.table?.table_decks?.find(d => d.id === deck.tableDeckId)?.deck?.type }"
                    :index="index" v-for="(deck, index) in playerStore.dropZones.deck" :key="deck.tableDeckId"
                    @deck-create="(reference) => addDeckToDropZone(reference, index)"
                    @on-drag-start="(event, cardRef, card) => onDragStart(event, cardRef, card)"
                    @on-drag-enter="(event) => onDragEnter(event)" @on-drag-leave="(event) => onDragLeave(event)"
                    @on-drop="(event, index) => onDrop(event, index, 'deck')" />
            </Flex>
            <Flex class="h-full px-4" :column="true" justify="center" items="center" :gap="1" v-if="playerStore.cards">
                <div class="card-box cursor-pointer relative dropZone" ref="tableDeckTrashReference" id="junkDeck"
                    :class="playerStore.getCards(playerStore.getJunkTableDeckId)?.length ? '' : 'border'"
                    @drop="(event) => onDrop(event, playerStore.getJunkTableDeckId, 'junk')" @dragover.prevent
                    @dragleave="(event) => onDragLeave(event)" @dragenter.prevent="(event) => onDragEnter(event)">
                    <DraggableCard :card="card"
                        v-for="(card, index) in playerStore.getCards(playerStore.getJunkTableDeckId)" :key="index"
                        @on-drag-start="(event, cardRef) => onDragStart(event, cardRef, card)" />
                </div>
                <div class="text-sm text-center">Junk Deck</div>
                <div v-if="playerStore.getCards(playerStore.getJunkTableDeckId)" class="text-primary text-sm">
                    {{ playerStore.getCards(playerStore.getJunkTableDeckId)?.length }}
                </div>
            </Flex>
        </Flex>
    </Flex>

    <!-- Table -->
    <Flex :justify="'center'" v-if="playerStore.cards && playerStore.getTableExist">
        <div id="tableDeck" class="grid bg-dark relative dropZone" :class="`grid-cols-${playerStore.table?.game?.grid_cols} grid-rows-${playerStore.table?.game?.grid_rows} h-[${height}px] w-[${width}px]`
            " ref="tableDeckReference" @drop="(event) => onDrop(event, playerStore.getTableDeckId, 'table')"
            @dragover.prevent @dragleave="(event) => onDragLeave(event)" @dragenter.prevent="(event) => onDragEnter(event)">
            <div class="col-span-1" v-for="index in playerStore.table?.game?.grid_cols">
                <div class="row-span-1 bg-primary border w-full" :class="`h-[${heightCell}px]`"
                    v-for="index in playerStore.table?.game?.grid_rows"></div>
            </div>
            <DraggableCard :card="card" v-for="(card, index) in playerStore.getCards(playerStore.getTableDeckId)"
                :key="index" @on-drag-start="(event, cardRef) => onDragStart(event, cardRef, card)" :absolute="true"
                :rotate="true" />
        </div>
    </Flex>

    <!-- Player Deck -->
    <Flex :justify="'center'" v-if="playerStore.cards">
        <div :class="`w-[${width}px] h-[150px]`" class="bg-secondary border relative dropZone" id="playerDeck"
            ref="playerDeckReference" @drop="(event) => onDrop(event, playerStore.getExistPlayerTableDeckId, 'user')"
            @dragover.prevent @dragleave="(event) => onDragLeave(event)" @dragenter.prevent="(event) => onDragEnter(event)">
            <div>
                <Flex class="border w-full h-full">
                    <DraggableCard :card="card"
                        v-for="(card, index) in playerStore.getCards(playerStore.getExistPlayerTableDeckId)" :key="index"
                        @on-drag-start="(event, cardRef) => onDragStart(event, cardRef, card)" :absolute="true"
                        :rotate="true" :show-cards="true" :player-deck="true" />
                </Flex>
            </div>
        </div>
    </Flex>

    <PlayerSettings />

    <!-- Modal Zoom Card -->
    <Modal :modal-open="playerStore.isCardDetailsModalOpen" @close-modal="playerStore.isCardDetailsModalOpen = false">
        <template v-slot:modal_header>
            <div class="text-black">
                Card Details
            </div>
        </template>

        <template v-slot:body>
            <Flex justify="center">
                <img
                    :src="loadImage(playerStore.cards?.find(card => card.id === playerStore.clickCardId)?.card.image || '')">
            </Flex>
        </template>

        <template v-slot:modal_footer>
            <button
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-400 px-8 py-3 text-base font-medium text-white hover:bg-secondary hover:text-white md:py-3 md:px-10 md:text-lg ml-2"
                @click="playerStore.isCardDetailsModalOpen = false">
                Close
            </button>
        </template>
    </Modal>

    <!-- Modal View Player Rank -->
    <Modal :modal-open="playerStore.rank.isRankModalOpen" @close-modal="playerStore.rank.isRankModalOpen = false"
        class="z-[2147483641]">
        <template v-slot:modal_header>
            <div class="text-black">
                Rank Table
            </div>
        </template>

        <template v-slot:body>
            <DarkTable :table-headers="rankStore.tableHeaders" class="border border-gray-700 rounded-lg overflow-y-auto"
                v-if="rankStore.rankPoints.length > 0">
                <DarkTableRow v-for="(row, index) in rankStore.rankPoints" :key="`rankRow-${row}`">
                    <DarkTableCell v-for="rank in row" :key="rank.id">
                        {{ rank.type === RankType.TITLE ? rank.title : rank.points }}
                    </DarkTableCell>
                </DarkTableRow>
            </DarkTable>
            <div class="bg-red-500 p-4 my-4 rounded italic" v-else>
                The rank table is empty
            </div>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/PlayerStore';
import TableDecks from '@/components/online-table/TableDecks.vue'
import Flex from '../wrappers/Flex.vue';
import { ref, watch, onMounted } from 'vue';
import type { TableCard } from '@/types/tables/TableCard';
import DraggableCard from './DraggableCard.vue';
import PlayerSettings from './PlayerSettings.vue';
import Modal from '../Modal.vue';
import { useRankStore } from '@/stores/RankStore';
import { RankType } from '@/types/online-table/RankType.enum';
import DarkTable from '../table/DarkTable.vue';
import DarkTableRow from '../table/DarkTableRow.vue';
import DarkTableCell from '../table/DarkTableCell.vue';
import { loadImage } from '@/utils/helpers';

const playerStore = usePlayerStore();
const height = ref(import.meta.env.VITE_GAME_HEIGHT);
const width = ref(import.meta.env.VITE_GAME_WIDTH);
const heightCell = ref(import.meta.env.VITE_GAME_HEIGHT);
const rankStore = useRankStore();

if (playerStore.table?.game) {
    heightCell.value = parseFloat((height.value / playerStore.table?.game.grid_rows).toFixed(1));
}

const playerDeckReference = ref<HTMLElement | null>(null);
const tableDeckReference = ref<HTMLElement | null>(null);
const tableDeckTrashReference = ref<HTMLElement | null>(null);

onMounted(() => {
    // Set the decks div elements as card dropdowns
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
// TODO: Add colors on the dropzone
const onDragLeave = (event: any) => {
    // console.log('\x1b[32m%s\x1b[0m', 'onDragLeave');
    // if (event.target.className.includes("dropZone")) {
    //     event.target.classList.remove('opacity-50');
    //     console.log('\x1b[31m%s\x1b[0m', '1');
    //     return 
    // }
    // if (event.target.parentElement.className.includes("dropZone")) {
    //     event.target.parentElement.classList.remove('opacity-50');
    //     console.log('\x1b[31m%s\x1b[0m', '2');
    //     return 
    // }
    // if (event.target.parentElement.parentElement.className.includes("dropZone")) {
    //     event.target.parentElement.parentElement.classList.remove('opacity-50');
    //     console.log('\x1b[31m%s\x1b[0m', '3');
    //     return 
    // }
}
const onDragEnter = (event: any) => {
    // console.log('\x1b[31m%s\x1b[0m', 'onDragEnter');
    // if (event.target.className.includes("dropZone")) {
    //     event.target.classList.add('opacity-50');
    //     return 
    // }
    // if (event.target.parentElement.className.includes("dropZone")) {
    //     event.target.parentElement.classList.add('opacity-50');
    //     return 
    // }
    // if (event.target.parentElement.parentElement.className.includes("dropZone")) {
    //     event.target.parentElement.parentElement.classList.add('opacity-50');
    //     return 
    // }

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
    playerStore.onDrop(event, tableDeckId, type);
}
// END DRAG

// TODO: For Debug 
watch(() => playerStore.table?.game?.grid_rows,
    () => {
        if (playerStore.table?.game) {
            heightCell.value = parseFloat((height.value / playerStore.table?.game.grid_rows).toFixed(1));
        }
    })
</script>