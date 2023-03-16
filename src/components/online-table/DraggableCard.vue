<template>
    <img ref="cardRef" :src="showCardImage(card)" alt="" :id="(card.id).toString()"
        class="card-box cursor-pointer transition duration-300"
        @click="playerStore.clickCardId === card.id ? playerStore.clickCardId = null : playerStore.clickCardId = card.id"
        @dragstart="(event) => $emit('onDragStart', event, cardRef)" :class="[absolute ? 'absolute' : '', playerStore.clickCardId === card.id ? 'border-2 border-red-500' : 'hover:border hover:border-dark', rotate ? getRotateCardPosition(card.rotate) : '',
        playerDeck ? card.hidden ? 'opacity-50' : '' : '']" draggable="true">
</template>

<script setup lang="ts">
import type { TableCard } from '@/types/tables/TableCard';
import { onMounted, ref, type PropType, watch } from 'vue';
import backCardImage from '@/assets/images/close-card.png'
import { loadImage } from '@/utils/Function';
import { usePlayerStore } from '@/stores/PlayerStore';
import { RotateCard } from '@/types/online-table/RotateCard.enum';

const clicked = ref(false);
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

const getRotateCardPosition = (rotate: number) => {
    switch (rotate) {
        case RotateCard.ZERO:
            return ''
            break;
        case RotateCard.NINETY:
            return ' rotate-90'
            break;
        case RotateCard.ONE_EIGHTY:
            return ' rotate-180'
            break;
        case RotateCard.TWO_SEVENTY:
            return ' -rotate-90'
            break;
        default:
            return ''
            break;
    }
}

const showCardImage = (card: TableCard) => {
    if (props.hiddenCards) {
        return backCardImage;
    }

    if (props.showCards) {
        return loadImage(card.card.image);
    }

    return card.hidden ? backCardImage : loadImage(card.card.image);
}

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