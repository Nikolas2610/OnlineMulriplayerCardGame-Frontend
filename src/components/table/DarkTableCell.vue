<template>
    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap" :class="getClasses()">
        <slot></slot>
    </td>
</template>

<script setup lang="ts">
const props = defineProps({
    textColor: { type: String, default: 'white' }
})

const getClasses = () => {
    return `text-${props.textColor}`;
}
</script>

<style scoped></style>