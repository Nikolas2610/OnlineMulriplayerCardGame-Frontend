<template>
    <Flex :gap="4" class="my-2 mx-8">
        <Flex :column="true" :items="'center'" :gap="1">
            <div class="relative border w-[50px] h-[75px]" ref="deckReference"
            @drop="(event) => $emit('onDrop', event, index)" @dragover.prevent @dragleave="(event) => $emit('onDragLeave', event)"
                    @dragenter.prevent="(event) => $emit('onDragEnter', event)">
                    <DraggableCard :card="card" v-for="(card, index) in cards" :key="index"
                        @on-drag-start="(event, cardRef) => $emit('onDragStart', event, cardRef, card)" />
            </div>
            <div>Deck {{ (index + 1) }}</div>
        </Flex>
    </Flex>
</template>

<script setup lang="ts">
import { ref, onMounted, type PropType } from 'vue';
import Flex from '../wrappers/Flex.vue';
import DraggableCard from './DraggableCard.vue';

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

const deckReference = ref<HTMLElement | null>(null);


const props = defineProps({
    index: { type: Number, required: true },
    tableDeckId: { type: Number, required: true },
    cards: { type: Array as PropType<TableCardTest[]>}
})
const emits = defineEmits(['deckCreate', 'onDrop', 'onDragLeave', 'onDragEnter', 'onDragStart'])

onMounted(() => {
    if (deckReference.value) {
        emits('deckCreate', deckReference.value);
    }
})

</script>