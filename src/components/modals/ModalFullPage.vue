<template>
    <Transition name="modal">
        <div class="bg-dark bg-opacity-90 fixed top-0 left-0 w-full h-full flex justify-center items-center z-20"
            v-if="modalOpen">
            <div class="bg-dark relative rounded-sm shadow h-full w-full" ref="modal">
                <Flex class="border-b-2 px-8" :justify="'between'" :items="'center'">
                    <div class="p-4 text-xl text-white">
                        Game Master Dashboard
                    </div>
                    <button
                        class="cursor-pointer text-2xl border h-10 w-10 border-transparent rounded-3xl px-2 transition duration-300 text-white hover:text-primary hover:bg-white"
                        @click="$emit('closeModal')">
                        x
                    </button>
                </Flex>
                <Flex class="border h-full text-white" >
                    <Flex class="border w-60 p-4" :column="true" :gap="2">
                        <div v-for="(item) in menuItems" :key="item.id" class="px-4 py-3 hover:bg-primary rounded-lg border-gray-500 border cursor-pointer hover:border-primary transition duration-300" @click="selectedMenuItem = item.id" :class="selectedMenuItem === item.id ? 'bg-primary' : 'bg-transparent'">{{ item.name }}</div>
                    </Flex>
                    <Flex>
                        <div class="container">
                            <div v-if="selectedMenuItem === 0">Table</div>
                            <div v-if="selectedMenuItem === 1">Game</div>
                            <div v-if="selectedMenuItem === 2">Players</div>
                        </div>
                    </Flex>
                </Flex>
                <div class="container">

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
import Flex from '../wrappers/Flex.vue';

const emit = defineEmits(['closeModal']);

const props = defineProps<{
    modalOpen: Boolean
}>()

const modal = ref(null)
const menuItems= ref([
    {id: 0, name: 'Table'},
    {id: 1, name: 'Game'},
    {id: 2, name: 'Players'},
])
const selectedMenuItem = ref(0);

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