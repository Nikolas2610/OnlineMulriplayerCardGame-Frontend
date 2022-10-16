<template>
    <Transition name="modal">
        <div class="bg-dark fixed top-0 left-0 w-full h-full flex justify-center items-center" v-if="modalOpen">
            <div class="bg-white relative p-10 rounded-sm shadow" ref="modal">
                <button class="absolute top-1 right-3 cursor-pointer" @click="$emit('closeModal')">x</button>
                Click outside this modal to close it
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