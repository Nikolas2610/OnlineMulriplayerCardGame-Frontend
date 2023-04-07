<template>
    <Transition name="modal">
        <div class="bg-dark bg-opacity-90 fixed top-0 left-0 w-full h-full flex justify-center items-center z-[2147483647]"
            v-if="modalOpen">
            <div class="bg-dark relative rounded-sm shadow h-full w-full" ref="modal">
                <Flex class="border-b-2 px-8" :justify="'between'" :items="'center'">
                    <div class="p-4 text-xl text-white">
                        Game Master Dashboard
                    </div>
                    <button
                        class="cursor-pointer border h-10 w-10 border-transparent rounded-3xl px-2 transition duration-300 text-lg text-white hover:text-primary hover:bg-white"
                        @click="$emit('closeModal')">
                        x
                    </button>
                </Flex>
                <Flex class="h-full text-white">
                    <Flex class="border-r w-60 p-4" :column="true" :gap="2">
                        <div v-for="(item) in menuItems" :key="item.id"
                            class="px-4 py-3 hover:bg-primary rounded-lg border-gray-500 border cursor-pointer hover:border-primary transition duration-300 text-lg"
                            @click="selectedMenuItem = item.id"
                            :class="selectedMenuItem === item.id ? 'bg-primary' : 'bg-transparent'">{{ item.name }}</div>
                    </Flex>
                    <Flex class="w-full">
                        <div class="container my-10">
                            <div v-if="selectedMenuItem === 1">
                                <Flex class="text-2xl underline underline-offset-4 mb-6 w-full" justify="between">
                                    <div>
                                        Actions
                                    </div>
                                    <div>
                                        <CheckBoxField :title="'Close settings on click an action'" :input="closeOnClick"
                                            @change="(value) => closeOnClick = value" />
                                    </div>
                                </Flex>
                                <div class="bg-dark-smooth p-4">
                                    <div class="text-2xl text-white mb-4">Game Status</div>
                                    <Flex class="w-full text-center cursor-pointer" :gap="8">
                                        <button @click="$emit('newGame'); closeOnClick ? emit('closeModal') : '';"
                                            class="p-3 w-1/4 transition duration-300 text-lg bg-primary rounded-3xl text-white hover:bg-dark-smooth border border-primary">
                                            <Flex :justify="'center'" :items="'center'">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="w-6 h-6 mr-3" viewBox="0 0 16 16">
                                                    <path
                                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                                                </svg>
                                                New Game
                                            </Flex>
                                        </button>
                                        <button
                                            class="p-3 w-1/4 transition duration-300 text-lg bg-primary rounded-3xl text-white hover:bg-dark-smooth border border-primary"
                                            :class="tableStatus?.status === TableStatus.WAITING || tableStatus?.status === TableStatus.FINISH ? 'cursor-not-allowed' : ''"
                                            :disable="tableStatus?.status === TableStatus.WAITING || tableStatus?.status === TableStatus.FINISH"
                                            @click="tableStatus?.status === TableStatus.PLAYING ? $emit('updateTableGameStatus', TableStatus.PAUSE) : $emit('updateTableGameStatus', TableStatus.PLAYING); closeOnClick ? emit('closeModal') : ''">
                                            <Flex :justify="'center'" :items="'center'">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="w-6 h-6 mr-3" viewBox="0 0 16 16">
                                                    <path
                                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z" />
                                                </svg>
                                                {{ tableStatus?.status === TableStatus.PAUSE ? 'Resume Game' : 'Pause Game'
                                                }}
                                            </Flex>
                                        </button>
                                        <button @click="$emit('stopGame'); closeOnClick ? emit('closeModal') : ''"
                                            class="p-3 w-1/4 transition duration-300 text-lg bg-primary rounded-3xl text-white hover:bg-dark-smooth border border-primary">
                                            <Flex :justify="'center'" :items="'center'">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="w-6 h-6 mr-3" viewBox="0 0 16 16">
                                                    <path
                                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5h-3z" />
                                                </svg>
                                                End Game
                                            </Flex>
                                        </button>
                                        <button
                                            class="p-3 w-1/4 transition duration-300 text-lg bg-primary rounded-3xl text-white hover:bg-dark-smooth border border-primary"
                                            @click="$emit('leaveGame')">
                                            <Flex :justify="'center'" :items="'center'">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="w-6 h-6 mr-3" viewBox="0 0 16 16">
                                                    <path
                                                        d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
                                                </svg>
                                                Leave Game
                                            </Flex>
                                        </button>
                                    </Flex>
                                </div>
                                <div class="bg-dark-smooth p-4 mt-6">
                                    <div class="text-2xl text-white mb-4">Cards</div>
                                    <Flex class="w-full text-center cursor-pointer" :gap="8">
                                        <div class="p-3 transition duration-300 text-lg w-1/3 bg-primary rounded-3xl text-white hover:bg-dark-smooth border border-primary"
                                            @click="$emit('setNextPlayer', false)">
                                            <Flex :justify="'center'" :items="'center'">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="w-6 h-6 mr-3" viewBox="0 0 16 16">
                                                    <path
                                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.79-2.907L8.5 7.028V5.5a.5.5 0 0 0-.79-.407L5 7.028V5.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0V8.972l2.71 1.935a.5.5 0 0 0 .79-.407V8.972l2.71 1.935A.5.5 0 0 0 12 10.5v-5a.5.5 0 0 0-.79-.407z" />
                                                </svg>
                                                Previous Player
                                            </Flex>
                                        </div>
                                        <div class="p-3 transition duration-300 text-lg w-1/3 bg-primary rounded-3xl text-white hover:bg-dark-smooth border border-primary"
                                            @click="$emit('setNextPlayer', true)">
                                            <Flex :justify="'center'" :items="'center'">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="w-6 h-6 mr-3" viewBox="0 0 16 16">
                                                    <path
                                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.79 5.093A.5.5 0 0 0 4 5.5v5a.5.5 0 0 0 .79.407L7.5 8.972V10.5a.5.5 0 0 0 .79.407L11 8.972V10.5a.5.5 0 0 0 1 0v-5a.5.5 0 0 0-1 0v1.528L8.29 5.093a.5.5 0 0 0-.79.407v1.528L4.79 5.093z" />
                                                </svg>
                                                Next Player
                                            </Flex>
                                        </div>
                                        <div @click="$emit('showAllCards'); closeOnClick ? emit('closeModal') : '';"
                                            class="p-3 transition duration-300 text-lg w-1/3 bg-primary rounded-3xl text-white hover:bg-dark-smooth border border-primary"
                                            :disable="tableStatus?.status === TableStatus.WAITING"
                                            :class="tableStatus?.status === TableStatus.WAITING ? 'cursor-not-allowed' : ''">
                                            <Flex :justify="'center'" :items="'center'">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="w-6 h-6 mr-3" viewBox="0 0 16 16">
                                                    <path
                                                        d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
                                                </svg>
                                                Show all cards
                                            </Flex>
                                        </div>
                                        <div class="p-3 transition duration-300 text-lg w-1/3 bg-primary rounded-3xl text-white hover:bg-dark-smooth border border-primary"
                                            :disable="tableStatus?.status === TableStatus.WAITING"
                                            :class="tableStatus?.status === TableStatus.WAITING ? 'cursor-not-allowed' : ''">
                                            <Flex :justify="'center'" :items="'center'">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="w-6 h-6 mr-3"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16ZM7.729 5.055A.5.5 0 0 1 8 5.5v1.886l3.21-2.293A.5.5 0 0 1 12 5.5v5a.5.5 0 0 1-.79.407L8 8.614V10.5a.5.5 0 0 1-.79.407l-3.5-2.5a.5.5 0 0 1 0-.814l3.5-2.5a.5.5 0 0 1 .519-.038Z" />
                                                </svg>
                                                Undo
                                            </Flex>
                                        </div>
                                        <div class="p-3 transition duration-300 text-lg w-1/3 bg-primary rounded-3xl text-white hover:bg-dark-smooth border border-primary"
                                            :disable="tableStatus?.status === TableStatus.WAITING"
                                            :class="tableStatus?.status === TableStatus.WAITING ? 'cursor-not-allowed' : ''">
                                            <Flex :justify="'center'" :items="'center'">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="w-6 h-6 mr-3"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16ZM4.79 5.093 8 7.386V5.5a.5.5 0 0 1 .79-.407l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 8 10.5V8.614l-3.21 2.293A.5.5 0 0 1 4 10.5v-5a.5.5 0 0 1 .79-.407Z" />
                                                </svg>
                                                Redo
                                            </Flex>
                                        </div>
                                    </Flex>
                                </div>
                            </div>

                            <div v-if="selectedMenuItem === 2">
                                <Flex disabled
                                    class="list-group-item bg-dark-smooth m-1 p-3 rounded-md text-center border border-primary mb-6"
                                    :justify="'center'">
                                    <div class="w-1/6">Turn</div>
                                    <div class="w-1/6">Name</div>
                                    <div class="w-1/6">Team</div>
                                    <div class="w-1/6">Status</div>
                                    <div class="w-1/6">Role</div>
                                    <div class="w-1/6">Actions</div>
                                </Flex>
                                <Flex class="w-full">
                                    <VueDraggableNext v-if="tableUsers" class="dragArea list-group w-full"
                                        :list="tableUsers" @change="updateTurn" :disabled="false"
                                        :group="{ name: 'people' }" ghost-class="ghost">
                                        <transition-group>
                                            <Flex :items="'center'" :gap="8"
                                                class="list-group-item bg-dark-smooth m-1 p-3 rounded-md text-center mb-3"
                                                v-for="user in tableUsers" :key="user.id">
                                                <div class="w-1/6">{{ user.turn }}</div>
                                                <div class="w-1/6">{{ user.user.username }}</div>
                                                <div class="w-1/6">
                                                    <SelectField :options="table?.game?.teams" :dark="true"
                                                        :input="user.team?.id ? { value: user.team?.id } : null"
                                                        @update="(value) => $emit('updateTeam', value, user)" />
                                                </div>
                                                <div class="w-1/6">
                                                    <SelectField :options="table?.game?.status" :dark="true"
                                                        :input="user.status?.id ? { value: user.status?.id } : null"
                                                        @update="(value) => $emit('updateStatus', value, user)" />
                                                </div>
                                                <div class="w-1/6">
                                                    <SelectField :options="table?.game?.roles" :dark="true"
                                                        :input="user.role?.id ? { value: user.role?.id } : null"
                                                        @update="(value) => $emit('updateRole', value, user)" />
                                                </div>
                                                <div
                                                    class="w-1/6 text-red-500 cursor-pointer hover:text-red-600 transition duration-300 text-lg">
                                                    <button @click="$emit('removePlayer', user.user.id)">Remove
                                                        User</button>
                                                </div>
                                            </Flex>
                                        </transition-group>
                                    </VueDraggableNext>
                                </Flex>
                            </div>
                        </div>
                    </Flex>
                </Flex>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, watch, type PropType } from 'vue';
import { onClickOutside } from '@vueuse/core'
import Flex from '../wrappers/Flex.vue';
import { VueDraggableNext } from 'vue-draggable-next'
import PrimaryButton from '../buttons/PrimaryButton.vue';
import type { TableUsers } from '@/types/lobby/TableUsers'
import SelectField from '../ui/SelectField.vue';
import type { Table } from '@/types/tables/Table'
import { TableStatus } from '@/types/tables/TableStatus.enum';
import CheckBoxField from '../ui/CheckBoxField.vue';

const emit = defineEmits([
    'closeModal',
    'updateTurnTableUsers',
    'updateRole',
    'updateStatus',
    'updateTeam',
    'stopGame',
    'leaveGame',
    'newGame',
    'updateTableGameStatus',
    'showAllCards',
    'removePlayer',
    'setNextPlayer'
]);
const props = defineProps({
    modalOpen: { type: Boolean },
    tableUsers: { type: Array as PropType<TableUsers[] | null | undefined>, required: true },
    table: { type: Object as PropType<Table | undefined> },
    tableStatus: { type: Object as PropType<{ status: string | undefined }> },
    menuTab: { type: Number, default: 1 }
})


const closeOnClick = ref(true);
const modal = ref(null)
const menuItems = ref([
    { id: 1, name: 'Game' },
    { id: 2, name: 'Players' },
])
const selectedMenuItem = ref(1);

const updateTurn = (event: any) => {
    emit('updateTurnTableUsers');
}

onClickOutside(modal, () => {
    emit('closeModal')
})

watch(() => props.menuTab,
    () => {
        selectedMenuItem.value = props.menuTab;
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
}</style>