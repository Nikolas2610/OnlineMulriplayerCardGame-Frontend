<template>
    <div
        class="px-4 py-3 rounded-lg hover:border-primary transition duration-300" :class="gameMaster ? 'bg-primary' : 'bg-dark-smooth'">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
    gameMaster: { type: Boolean, default: false }
})

console.log(props.gameMaster);

// interface Item {
//     id: number;
//     name: string;
// }

</script>

<style scoped></style>