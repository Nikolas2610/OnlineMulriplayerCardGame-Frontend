<template>
    <Flex>
        <div class="bg-info w-full px-8 py-3 text-white italic rounded-lg">
            <slot></slot>
        </div>
    </Flex>
</template>

<script setup lang="ts">
import Flex from '../wrappers/Flex.vue';
</script>
