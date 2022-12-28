<template>
    <Transition name="modal">
        <div class="bg-dark bg-opacity-90 fixed top-0 left-0 w-full h-full flex justify-center items-center z-20"
            v-if="modalOpen">
            <div class="bg-white relative rounded-sm shadow border max-w-5xl w-5/6 min-w-[300px]" ref="modal">
                <button
                    class="absolute top-1 right-3 cursor-pointer text-2xl border border-transparent hover:border-primary rounded-lg px-2 transition duration-300"
                    @click="$emit('closeModal')">
                    x
                </button>
                <div class="container">
                    <div class="p-4 text-xl border-b-2">
                        <slot name="modal_header"></slot>
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