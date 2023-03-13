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
                        class="cursor-pointer text-2xl border h-10 w-10 border-transparent rounded-3xl px-2 transition duration-300 text-white hover:text-primary hover:bg-white"
                        @click="$emit('closeModal')">
                        x
                    </button>
                </Flex>
                <Flex class="h-full text-white">
                    <Flex class="border-r w-60 p-4" :column="true" :gap="2">
                        <div v-for="(item) in menuItems" :key="item.id"
                            class="px-4 py-3 hover:bg-primary rounded-lg border-gray-500 border cursor-pointer hover:border-primary transition duration-300"
                            @click="selectedMenuItem = item.id"
                            :class="selectedMenuItem === item.id ? 'bg-primary' : 'bg-transparent'">{{ item.name }}</div>
                    </Flex>
                    <Flex class="w-full">
                        <div class="container my-10">
                            <div v-if="selectedMenuItem === 0">
                                Tables
                            </div>
                            <div v-if="selectedMenuItem === 1">
                                <Flex class="text-2xl underline underline-offset-4 mb-6">
                                    Actions
                                </Flex>
                                <Flex :column="true" :gap="4">
                                    <PrimaryButton :title="'Pause Game'" :disable="true" />
                                    <PrimaryButton :title="'End Game'" @click="$emit('stopGame')" />
                                    <PrimaryButton :title="'New Game'" @click="$emit('newGame'); emit('closeModal');" />
                                    <PrimaryButton :title="'Leave Game'" @click="$emit('leaveGame')" />
                                    <PrimaryButton :title="'Undo Movement'" :disable="true" />
                                    <PrimaryButton :title="'Redo Movement'" :disable="true" />
                                    <PrimaryButton :title="'Show Cards'" :disable="true" />
                                </Flex>


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
                                                    class="w-1/6 text-red-500 cursor-pointer hover:text-red-600 transition duration-300">
                                                    Remove User</div>
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
import { ref, type PropType } from 'vue';
import { onClickOutside } from '@vueuse/core'
import Flex from '../wrappers/Flex.vue';
import { VueDraggableNext } from 'vue-draggable-next'
import PrimaryButton from '../buttons/PrimaryButton.vue';
import type { TableUsers } from '@/types/lobby/TableUsers'
import SelectField from '../ui/SelectField.vue';
import type { Table } from '@/types/tables/Table'
const emit = defineEmits([
    'closeModal',
    'updateTurnTableUsers',
    'updateRole',
    'updateStatus',
    'updateTeam',
    'stopGame',
    'leaveGame',
    'newGame'
]);
const props = defineProps({
    modalOpen: { type: Boolean },
    tableUsers: { type: Array as PropType<TableUsers[] | null | undefined>, required: true },
    table: { type: Object as PropType<Table | undefined> }
})

const modal = ref(null)
const menuItems = ref([
    { id: 0, name: 'Table' },
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