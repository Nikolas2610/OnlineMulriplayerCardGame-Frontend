<template>
    <div class="flex" :class="getClasses()">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    justify: { type: String, default: 'start' },
    items: { type: String },
    gap: { type: Number },
    column: { type: Boolean }, 
    columnReverse: { type: Boolean, default: false }, 
    wrap: { type: Boolean, default: false }
})

const getClasses = () => {
    let classes = '';
    if (props.gap) {
        classes += `gap-${props.gap} `
    }
    if (props.justify) {
        classes += `justify-${props.justify} `
    }
    if (props.items) {
        classes += `items-${props.items} `
    }
    if (props.column) {
        classes += `flex-col `
    }
    if (props.wrap) {
        classes += `flex-wrap `
    }
    if (props.columnReverse) {
        classes += `flex-col-reverse `
    }
    return classes;
}
</script>
