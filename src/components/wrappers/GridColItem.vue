<template>
    <div :class="[
        sm ? `sm:col-span-${sm}` : '',
        md ? `md:col-span-${md}` : '',
        lg ? `lg:col-span-${lg}` : '',
        xl ? `xl:col-span-${xl}` : '',
        xs ? `col-span-${xs}` : '',
        all ? grid : ''
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
    all: { type: Number }
})
const grid = ref('');
if (props.all) {
    grid.value = `sm:col-span-${props.all} md:col-span-${props.all} lg:col-span-${props.all} xl:col-span-${props.all} col-span-${props.all}`
}
</script>