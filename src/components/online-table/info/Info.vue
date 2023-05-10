<template>
    <!-- Info Icon -->
    <div class="absolute top-10 left-10">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
            class="w-6 h-6 hover:text-primary transition duration-300 cursor-pointer hover:scale-110"
            @click="$emit('openModal')" viewBox="0 0 16 16">
            <path
                d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </svg>
    </div>

    <!-- Info Modal -->
    <Modal :modalOpen="modalOpen" @closeModal="$emit('closeModal')" class="text-black z-[2147483640]">
        <template v-slot:modal_header>
            Info
        </template>
        <template v-slot:body>
            <!-- Tab menu -->
            <Flex justify="between" items="center">
                <div class="cursor-pointer py-3 px-2 border-b hover:text-secondary hover:border-secondary transition duration-300"
                    @click="selectedTab = 0" :class="selectedTab === 0 ? 'border-primary' : 'border-transparent'">
                    <span class="text-primary">Game</span> description
                </div>
                <div class="cursor-pointer py-3 px-2 hover:text-secondary hover:border-secondary border-b  transition duration-300"
                    @click="selectedTab = 1" :class="selectedTab === 1 ? 'border-primary' : 'border-transparent'">
                    How to<span class="text-primary"> play</span>
                </div>
                <div class="cursor-pointer py-3 px-2 hover:text-secondary hover:border-secondary border-b transition duration-300"
                    @click="selectedTab = 2" :class="selectedTab === 2 ? 'border-primary' : 'border-transparent'">
                    How to be the <span class="text-primary"> Game Master </span>
                </div>
            </Flex>

            <div class=" max-h-[450px] h-[450px] overflow-y-auto p-2 pt-10">
                <!-- Game Description -->
                <div v-if="selectedTab === 0" class="h-full">
                    <Flex class="h-full" :column="true" justify="between">
                        <div v-if="gameDescription">
                            {{ gameDescription }}
                        </div>
                        <Flex justify="between" v-if="gameDesigner && gameMaster">
                            <Flex>
                                Game Master of the game<span class="text-primary ml-1"> {{ gameDesigner.name }}</span>
                            </Flex>
                            <Flex>
                                Game Designer of the game<span class="text-primary ml-1">{{ gameMaster.name }}</span>
                            </Flex>
                        </Flex>
                    </Flex>
                </div>

                <!-- How to play -->
                <div v-if="selectedTab === 1">
                    <HowToPlay />
                </div>

                <!-- How to be the Game Master -->
                <div v-if="selectedTab === 2">
                    <HowToBeTheGameMaster />
                </div>
            </div>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Modal from '@/components/Modal.vue';
import Flex from '@/components/wrappers/Flex.vue';
import HowToPlay from '@/components/online-table/info/HowToPlay.vue';
import HowToBeTheGameMaster from '@/components/online-table/info/HowToBeTheGameMaster.vue';
import type { PropType } from 'vue';

interface Name {
    name: string | undefined | null;
}

const props = defineProps({
    gameDescription: { type: String },
    gameDesigner: { type: Object as PropType<Name>, required: true },
    gameMaster: { type: Object as PropType<Name>, required: true },
    modalOpen: { type: Boolean, required: true }
})

const emits = defineEmits(['closeModal', 'openModal'])
const selectedTab = ref(0);

</script>
