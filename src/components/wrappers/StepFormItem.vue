<template>
    <li class="flex items-center" :class="active ? 'text-primary' : ''">
        <span class="flex items-center justify-center w-5 h-5 mr-2 text-xs border rounded-full shrink-0"
            :class="active ? 'border-primary' : 'border-gray-400'">
            {{ index }}
        </span>
        {{ title }}
        <svg v-if="!lastItem" aria-hidden="true" class="w-4 h-4 ml-2 sm:ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
        </svg>
    </li>
</template>

<script setup lang="ts">
const props = defineProps({
    active: { type: Boolean, require: true },
    index: { type: Number, require: true },
    title: { type: String, require: true },
    lastItem: { type: Boolean, require: false, default: false }
})
</script>
