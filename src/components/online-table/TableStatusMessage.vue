<template>
    <Flex class="one-page bg-dark" :items="'center'"
        :justify="'center'" :column="true">
        <div class="rounded-2xl bg-primary px-12 py-6  text-4xl italic">
            {{ title }}
        </div>
        <div class="mt-6 text-xl">
            {{ message }}
        </div>
    </Flex>
</template>

<script setup lang="ts">
import Flex from '../wrappers/Flex.vue';

const props = defineProps({
    title: { type: String, required: true },
    message: { type: String, required: true }
})
</script>
