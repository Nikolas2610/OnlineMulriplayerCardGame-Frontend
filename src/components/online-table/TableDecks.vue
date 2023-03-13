<template>
    <Flex :gap="4" class="my-2 mx-8">
        <Flex :column="true" :items="'center'" :gap="1">
            <div class="relative border card-box" ref="deckReference"
            @drop="(event) => $emit('onDrop', event, deck.tableDeckId)" @dragover.prevent @dragleave="(event) => $emit('onDragLeave', event)"
                    @dragenter.prevent="(event) => $emit('onDragEnter', event)">
                    <DraggableCard :card="card" v-for="(card, index) in deck.cards" :key="index"
                        @on-drag-start="(event, cardRef) => $emit('onDragStart', event, cardRef, card)" :hidden-cards="true" />
            </div>
            <div>Deck {{ (deck.index + 1) }}</div>
        </Flex>
    </Flex>
</template>

<script setup lang="ts">
import type { TableCard } from '@/types/tables/TableCard';
import { ref, onMounted, type PropType } from 'vue';
import Flex from '../wrappers/Flex.vue';
import DraggableCard from './DraggableCard.vue';

const deckReference = ref<HTMLElement | null>(null);

interface TableDeckId {
    tableDeckId: number | undefined;
    cards: TableCard[] | undefined;
    index: number
}

const props = defineProps({
    deck: { type: Object as PropType<TableDeckId>, required: true },
})

const emits = defineEmits(['deckCreate', 'onDrop', 'onDragLeave', 'onDragEnter', 'onDragStart'])

onMounted(() => {
    if (deckReference.value) {
        emits('deckCreate', deckReference.value);
    }
})

</script>