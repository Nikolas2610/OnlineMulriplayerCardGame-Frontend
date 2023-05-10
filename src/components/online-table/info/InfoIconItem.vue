<template>
    <Flex items="center" :gap="8" :class="reverse ? '' : ''" class="mb-4 border-l-4 border-primary pl-4">
        <div class="row"></div>
        <slot></slot>
    </Flex>
</template>

<script setup lang="ts">
import Flex from '@/components/wrappers/Flex.vue';

const props = defineProps({
    reverse: { type: Boolean, default: false }
})

</script>