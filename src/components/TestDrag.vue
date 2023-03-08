<template>
    <div class="border w-full bg-dark mt-20 flex justify-center gap-4">
        <div class="h-80 w-80 bg-red-500 relative" @drop="(event) => onDrop(event, 0)" @dragover.prevent
            :class="hoverDrop ? 'bg-secondary' : 'bg-red-500'" ref="dropZone1" @dragleave="(event) => onDragLeave(event)"
            @dragenter.prevent="(event) => onDragEnter(event)">
            <TestDragItem :index="index" v-for="(card, index) in getCards(0)" :key="index"
                @on-drag-start="(event, item) => onDragStart(event, item, card)" :box="card">{{ card.id }}</TestDragItem>
            {{ getCards(0).length }}
        </div>
        <div class="h-80 w-80 bg-red-500 relative" @drop="(event) => onDrop(event, 1)" ref="dropZone2"
            @dragleave="(event) => onDragLeave(event)" @dragenter.prevent @dragover.prevent>
            <TestDragItem :index="index" v-for="(card, index) in getCards(1)" :key="index"
                @on-drag-start="(event, item) => onDragStart(event, item, card)" :box="card" :bg-color="'bg-secondary'">{{
                    card.id }}</TestDragItem>
            {{ getCards(1).length }}
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TestDragItem from './TestDragItem.vue';

interface Card {
    id: number, top: number, left: number, deckId: number, zIndex: number
}


const cards = ref<Card[]>([]);
const dropZones = ref<HTMLElement[]>([]);
const dropZone1 = ref<HTMLElement | null>(null);
const dropZone2 = ref<HTMLElement | null>(null);
const hoverDrop = ref(false);
const zIndex = ref(2);

onMounted(() => {
    createCards();
    if (dropZone1.value) {
        dropZones.value.push(dropZone1.value)
    }
    if (dropZone2.value) {
        dropZones.value.push(dropZone2.value)
    }
})

const getCards = ((id: number) => {
    return cards.value.filter(card => card.deckId === id)
})

const createCards = () => {
    cards.value.push({ id: 0, top: 0, left: 0, deckId: 0, zIndex: 1 })
    cards.value.push({ id: 1, top: 50, left: 50, deckId: 0, zIndex: 1 })
    cards.value.push({ id: 2, top: 100, left: 100, deckId: 0, zIndex: 1 })
    cards.value.push({ id: 3, top: 50, left: 50, deckId: 1, zIndex: 1 })
    cards.value.push({ id: 4, top: 100, left: 100, deckId: 1, zIndex: 1 })
}


const onDragLeave = (event: any) => {
    console.log('\x1b[32m%s\x1b[0m', 'onDragLeave');
}
const onDragEnter = (event: any) => {
    console.log('\x1b[31m%s\x1b[0m', 'onDragEnter');
}

const onDragStart = (event: any, item: HTMLElement, card: Card) => {
    console.log('\x1b[34m%s\x1b[0m', 'onDragStart');
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
        const card: Card = JSON.parse(event.dataTransfer.getData('card'));
        const dragCardIndex = cards.value.map(c => c.id).indexOf(card.id);
        if (card.deckId !== drop) {
            cards.value[dragCardIndex].deckId = drop;
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
            cards.value[dragCardIndex].top = offsetHeight - cardHeight;
        } else if (offsetY < 0) {
            // Card is partially outside the drop zone at the top, adjust it to fit inside
            cards.value[dragCardIndex].top = 0;
        } else {
            // Card is fully inside the drop zone, position it at the current y coordinate
            cards.value[dragCardIndex].top = offsetY;
        }
        // Update the left position of the dropped box
        if (offsetX > offsetWidth - cardWidth) {
            // Card is too big, adjust it to fit inside the drop zone
            cards.value[dragCardIndex].left = offsetWidth - cardWidth
        } else if (offsetX < 0) {
            // Card is partially outside the drop zone at the left, adjust it to fit inside
            cards.value[dragCardIndex].left = 0;
        } else {
            // Card is fully inside the drop zone, position it at the current x coordinate
            cards.value[dragCardIndex].left = offsetX;
        }
        cards.value[dragCardIndex].zIndex = zIndex.value++
    }
}

const isOverlapping = (rect1: Card, rect2: Card, cardHeight: number, cardWidth: number) => {
    // Get the position and dimensions of each element
    // const rect1 = element1.getBoundingClientRect();
    // const rect2 = element2.getBoundingClientRect();

    // Check if the elements overlap by comparing their positions
    return !(
        rect1.left + cardWidth < rect2.left ||
        rect1.left > rect2.left + cardWidth ||
        rect1.top + cardHeight < rect2.top ||
        rect1.top > rect2.top + cardHeight
    );
}

</script>
  