<template>
    <img ref="cardRef" :src="card.card" alt="" class="w-[50px] h-[75px] cursor-pointer hover:border hover:border-dark transition duration-300" @click="clicked = !clicked"
        @dragstart="(event) => $emit('onDragStart', event, cardRef)" :class="[absolute ? 'absolute' : '', clicked ? 'bg-red-500' : '']" draggable="true">
</template>

<script setup lang="ts">
import type { TableCard } from '@/types/tables/TableCard';
import { onMounted, ref, type PropType, watch } from 'vue';

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

const clicked = ref(false);

const props = defineProps({
    card: { type: Object as PropType<TableCardTest>, required: true },
    absolute: { type: Boolean, default: true }
})
const emits = defineEmits(['onDragStart']);
const cardRef = ref<HTMLElement | null>(null)

onMounted(() => {
    if (props.card && cardRef.value) {
        cardRef.value.style.top = `${props.card.position_x}px`
        cardRef.value.style.left = `${props.card.position_y}px`
        cardRef.value.style.zIndex = `${props.card.z_index}px`
    }
})

watch(
    [() => props.card.position_x, () => props.card.position_y, () => props.card.z_index],
    ([newTop, newLeft], [oldTop, oldLeft]) => {
        if (cardRef.value) {
            cardRef.value.style.top = `${props.card.position_x}px`
            cardRef.value.style.left = `${props.card.position_y}px`
            cardRef.value.style.zIndex = props.card.z_index.toString()
        }
    }
);
</script>