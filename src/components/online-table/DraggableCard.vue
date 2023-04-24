<template>
    <div ref="cardRef" :id="(card.id).toString()" class="card-box cursor-pointer"
        @click="playerStore.clickCardId === card.id ? playerStore.clickCardId = null : playerStore.clickCardId = card.id"
        @dragstart="(event) => $emit('onDragStart', event, cardRef)"
        :class="[absolute ? 'absolute' : '', rotate ? getRotateCardPosition(card.rotate) : '']" draggable="true">
        <div class="relative w-full h-full">
            <img ref="cardRef" :src="showCardImage(card)" class="card-box"
                :class="[playerDeck ? card.hidden ? '' : 'opacity-50' : '', playerStore.clickCardId === card.id ? 'border-2 border-red-500' : 'hover:border hover:border-dark']">
            <div class="absolute top-[27.5px] left-[13.5px] text-black" v-if="playerDeck && !card.hidden">
                <svg width="16" height="16" fill="currentColor" class="w-5 h-5" viewBox="0 0 16 16">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TableCard } from '@/types/tables/TableCard';
import { onMounted, ref, type PropType, watch } from 'vue';
import backCardImage from '@/assets/images/close-card.png'
import { loadImage } from '@/utils/helpers';
import { usePlayerStore } from '@/stores/PlayerStore';
import { RotateCard } from '@/types/online-table/RotateCard.enum';

const playerStore = usePlayerStore();
const props = defineProps({
    card: { type: Object as PropType<TableCard>, required: true },
    absolute: { type: Boolean, default: true },
    hiddenCards: { type: Boolean, default: false },
    rotate: { type: Boolean, default: false },
    showCards: { type: Boolean, default: false },
    playerDeck: { type: Boolean, default: false }
})
const emits = defineEmits(['onDragStart']);
const cardRef = ref<HTMLElement | null>(null)

// Rotate card
const getRotateCardPosition = (rotate: number) => {
    switch (rotate) {
        case RotateCard.ZERO:
            return ''
        case RotateCard.NINETY:
            return ' rotate-90'
        case RotateCard.ONE_EIGHTY:
            return ' rotate-180'
        case RotateCard.TWO_SEVENTY:
            return ' -rotate-90'
        default:
            return ''
    }
}

// Load image
const showCardImage = (card: TableCard) => {
    if (props.hiddenCards) {
        return backCardImage;
    }

    if (props.showCards) {
        return loadImage(card.card.image);
    }

    return card.hidden ? backCardImage : loadImage(card.card.image);
}

// Set position card
onMounted(() => {
    if (props.card && cardRef.value) {
        cardRef.value.style.top = `${props.card.position_x}px`
        cardRef.value.style.left = `${props.card.position_y}px`
        cardRef.value.style.zIndex = `${props.card.z_index}`
    }
})

// Watching the changes of the card
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