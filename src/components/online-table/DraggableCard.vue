<template>
    <img ref="cardRef" :src="hiddenCards ? backCardImage : loadImage(card.card.image)" alt="" :id="(card.id).toString()"
        class="card-box cursor-pointer hover:border hover:border-dark transition duration-300"
        @click="clicked = !clicked" @dragstart="(event) => $emit('onDragStart', event, cardRef)"
        :class="[absolute ? 'absolute' : '', clicked ? 'border-red-500' : '']" draggable="true">
</template>

<script setup lang="ts">
import type { TableCard } from '@/types/tables/TableCard';
import { onMounted, ref, type PropType, watch } from 'vue';
import backCardImage from '@/assets/images/close-card.png'
import { loadImage } from '@/utils/Function';

const clicked = ref(false);

const props = defineProps({
    card: { type: Object as PropType<TableCard>, required: true },
    absolute: { type: Boolean, default: true },
    hiddenCards: { type: Boolean, default: false }
})
const emits = defineEmits(['onDragStart']);
const cardRef = ref<HTMLElement | null>(null)

onMounted(() => {
    if (props.card && cardRef.value) {
        cardRef.value.style.top = `${props.card.position_x}px`
        cardRef.value.style.left = `${props.card.position_y}px`
        cardRef.value.style.zIndex = `${props.card.z_index}`
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