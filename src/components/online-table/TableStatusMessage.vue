<template>
    <Flex class="one-page bg-dark" :items="'center'" :justify="'center'" :column="true">
        <div class="rounded-2xl bg-primary px-12 py-6  text-4xl italic">
            {{ title }}
        </div>
        <div class="mt-6 text-xl italic">
            {{ message }}
        </div>
        <div class="mt-6 text-base italic">
            *While you wait, check <span class="underline cursor-pointer hover:text-primary transition duration-300"
                @click="$emit('openInfoModal')">how you play</span> the game
        </div>
        <div class="text-red-500 text-xl mt-6" v-if="leaverUsers.length > 0">
            Waiting for: {{ leaverUsers.join(', ') }}
        </div>
    </Flex>
</template>

<script setup lang="ts">
import Flex from '../wrappers/Flex.vue';

const props = defineProps({
    title: { type: String, required: true },
    message: { type: String, required: true },
    leaverUsers: { type: Array, required: true }
})

const emits = defineEmits(['openInfoModal'])
</script>
