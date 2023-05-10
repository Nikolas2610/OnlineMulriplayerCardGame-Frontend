<template>
    <button
        class="flex w-full items-center justify-center rounded-md border border-transparent px-8 py-2 text-base text-white transition duration-300 hover:text-white md:py-2 md:px-10 md:text-lg ml-2"
        :class="deleteButton ? 'bg-red-500 hover:bg-red-700' : 'bg-primary hover:bg-secondary'" :type="type === 'button' ? 'button' : 'submit'" >
        <slot></slot>
    </button>
</template>

<script lang="ts" setup>
const props = defineProps({
    deleteButton: { type: Boolean, default: false },
    type: { type: String, default: 'button' }
})
</script>
