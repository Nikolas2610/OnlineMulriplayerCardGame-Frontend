<template>
    <button
        class="flex items-center justify-center rounded-md border border-transparent bg-black text-white px-8 py-2 text-base font-medium hover:bg-opacity-80 hover:text-white md:px-10 md:text-base transition duration-150"
        :class="[`w-${width}`, disable ? 'cursor-not-allowed bg-opacity-50' : 'cursor-pointer']" :type="type === 'button' ? 'button' : 'submit'" :disabled="disable">
        <svg class="animate-spin -ml-1 h-7 w-7 text-white" v-if="loading" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
        </svg>
        <template v-else>
            {{ title }}
        </template>
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
    type: { type: String, default: 'button' },
    width: { type: String, default: '52' },
    title: { type: String, required: true },
    loading: { type: Boolean, default: false },
    disable: { type: Boolean, default: false }
})
</script>


