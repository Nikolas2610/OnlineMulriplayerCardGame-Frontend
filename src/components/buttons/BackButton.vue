<template>
    <button
        class="flex items-center justify-center rounded-md border border-transparent bg-dark text-white px-4 py-2 text-base font-medium hover:bg-primary hover:text-white mt-10 md:px-4 md:text-md transition duration-150"
        :class="[disable ? 'cursor-not-allowed' : 'cursor-pointer']"
        :type="type === 'button' ? 'button' : 'submit'" :disabled="disable">
        <svg class="animate-spin -ml-1 h-7 w-7 text-white" v-if="loading" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
        </svg>
        <template v-else>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill"
                viewBox="0 0 16 16">
                <path
                    d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
            </svg>
            <span class="ml-2">
                {{ title }}
            </span>
        </template>
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
    type: { type: String, default: 'button' },
    title: { type: String, required: true },
    loading: { type: Boolean, default: false },
    disable: { type: Boolean, default: false }
})
</script>


