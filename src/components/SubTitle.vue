<template>
    <Flex :justify="'between'" :items="'center'" class="w-full mb-3 border-b-2 border-primary p-2">
        <div class="text-3xl">
            <slot></slot>
        </div>
        <slot name="button"></slot>
    </Flex>
</template>

<script setup lang="ts">
import Flex from './wrappers/Flex.vue';
import PrimaryButton from './buttons/PrimaryButton.vue';
</script>

<style scoped>

</style>