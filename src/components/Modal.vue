<template>
    <Transition name="modal">
        <div class="bg-dark bg-opacity-90 fixed top-0 left-0 w-full h-full flex justify-center items-center z-20"
            v-if="modalOpen">
            <div class="bg-white relative rounded-sm shadow border max-w-5xl w-5/6 min-w-[300px]" ref="modal">
                <div class="container">
                    <div class="p-4 text-xl border-b-2">
                        <Flex justify="between" items="center">
                            <slot name="modal_header"></slot>
                            <button
                                class="cursor-pointer transition duration-300 hover:text-white rounded-3xl hover:bg-black"
                                @click="$emit('closeModal')">
                                <svg fill="currentColor" class="w-7 h-7" viewBox="0 0 16 16">
                                    <path
                                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                </svg>
                            </button>
                        </Flex>
                    </div>
                    <div class="body p-4">
                        <slot name="body"></slot>
                    </div>
                    <div class="flex p-4">
                        <slot name="modal_footer"></slot>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core'
import Flex from './wrappers/Flex.vue';

const emit = defineEmits(['closeModal']);

const props = defineProps<{
    modalOpen: Boolean
}>()

const modal = ref(null)

onClickOutside(modal, () => {
    emit('closeModal')
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: all .5s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(1.1);
}
</style>