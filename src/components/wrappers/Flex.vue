<template>
    <div class="flex" :class="[
    getJustify(justify),
    items ? `items-${items}` : '',
    gap ? `gap-${gap}` : '']">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    justify: { type: String },
    items: { type: String },
    gap: { type: Number }
})

const getJustify = (rule:string | undefined) => {
    switch(rule) {
        case "center":
            return 'justify-center'
        case "end":
            return 'justify-end'
        case "around":
            return 'justify-around'
        case "between":
            return 'justify-between'
        default:
            return 'justify-start'
    }
}
</script>
