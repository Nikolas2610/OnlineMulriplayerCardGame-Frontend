<template>
    <div
        class="px-4 py-3 rounded-lg hover:border-primary transition duration-300" :class="playing ? 'bg-primary' : 'bg-dark-smooth'">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
    playing: { type: Boolean, default: false }
})
</script>