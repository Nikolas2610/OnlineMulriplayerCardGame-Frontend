<template>
    <div ref="box" class="h-10 w-10 absolute" draggable="true" :class="bgColor"
        @dragstart="(event) => $emit('onDragStart', event, box)">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type PropType, watch } from 'vue'

interface Card {
    id: number, top: number, left: number, deckId: number, zIndex: number
}

const props = defineProps({
    box: { type: Object as PropType<Card>, required: true },
    bgColor: { type: String, default: 'bg-primary' }
})
const emits = defineEmits(['onDragStart'])
const box = ref<HTMLElement | null>(null)

onMounted(() => {
    if (props.box && box.value) {
        box.value.style.top = `${props.box.top}px`
        box.value.style.left = `${props.box.left}px`
        box.value.style.zIndex = `${props.box.zIndex}px`
    }
})

watch(
    [() => props.box.top, () => props.box.left, () => props.box.zIndex],
    ([newTop, newLeft], [oldTop, oldLeft]) => {
        if (box.value) {
            box.value.style.top = `${props.box.top}px`
            box.value.style.left = `${props.box.left}px`
            
            box.value.style.zIndex = props.box.zIndex.toString()
            console.log(box.value.style.zIndex);
            
        }
    }
);

</script>