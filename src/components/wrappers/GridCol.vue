<template>
    <div class="grid grid-cols-2" :class="[
        sm ? `sm:grid-cols-${sm}` : '',
        md ? `md:grid-cols-${md}` : '',
        lg ? `lg:grid-cols-${lg}` : '',
        xl ? `xl:grid-cols-${xl}` : '',
        xs ? `grid-cols-${xs}` : '',
        all ? grid : '',
        gap ? getGap(gap) : '', 
        gap_x ? getGapX(gap_x) : '', 
        gap_y ? getGapY(gap_y) : '', 
    ]">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
    xs: { type: Number },
    sm: { type: Number },
    md: { type: Number },
    lg: { type: Number },
    xl: { type: Number },
    all: { type: Number }, 
    gap: { type: Number },
    gap_x: { type: Number },
    gap_y: { type: Number },
})
const grid = ref('');
if (props.all) {
    grid.value = `sm:grid-cols-${props.all} md:grid-cols-${props.all} lg:grid-cols-${props.all} xl:grid-cols-${props.all} grid-cols-${props.all}`
}
const getGapX = (gapX: number | undefined) => {
    if (gapX) {
        return `gap-x-${gapX}`
    }
    return ''
}
const getGapY = (gapY: number | undefined) => {
    if (gapY) {
        return `gap-y-${gapY}`
    }
    return ''
}
const getGap = (gap: number | undefined) => {
    if (gap) {
        return `gap-${gap}`
    }
    return ''
}
</script>