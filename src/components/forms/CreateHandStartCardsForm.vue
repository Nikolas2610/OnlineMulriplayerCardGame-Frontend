<template>
    <div class="mx-auto my-4">
        <div class="flex flex-col">
            <div class="overflow-x-auto shadow-md sm:rounded-lg">
                <div class="inline-block min-w-full align-middle">
                    <div class="overflow-hidden ">
                        <table class="min-w-full divide-y table-fixed divide-gray-700">
                            <thead class="bg-gray-700">
                                <tr>
                                    <th scope="col" v-for="(title, index) in tablesFields" :key="index"
                                        :class="`w-${widthColumns[index]}/12`"
                                        class="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-gray-400">
                                        {{ title }}
                                    </th>
                                    <th scope="col" class="p-4 w-1/12">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y bg-dark divide-gray-700">
                                <tr class="hover:bg-gray-700" v-for="(item, index) in createGameStore.hand_start_cards"
                                    :key="`start_cards_${index}`">
                                    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                        <SelectField :options="createGameStore.game.extra_roles ?
                                        roles.map((role, index) => ({ id: index, name: role.name }))
                                        : defaultRoles" :disable="roles.length === 0" :dark="true" />
                                    </td>
                                    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                        <SelectField :options="decks" :disable="decks.length === 0" :dark="true" />
                                    </td>
                                    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                        <CheckBoxField :title-show="false" :input="item.hidden" />
                                    </td>
                                    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                        <InputField :title-show="false" :input="item.count_cards" :type="'number'"
                                            :min="1" @change="(value) => item.count_cards = value" />
                                    </td>
                                    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                        <InputField :title-show="false" :input="item.repeat" :type="'number'" :min="1"
                                            @change="(value) => item.repeat = value" />
                                    </td>
                                    <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap mb-2">
                                        <button class="btn-add" @click="createGameStore.addHandStartCardsRow()">
                                            +
                                        </button>
                                        <button class="btn-delete ml-2"
                                            @click="createGameStore.deleteHandStartCardsRow(index)">
                                            -
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useCreateGameStore } from '@/stores/GameStore'
import InputField from '@/components/ui/InputField.vue';
import SelectField from '../ui/SelectField.vue';
import CheckBoxField from '../ui/CheckBoxField.vue';
import type { DeckReturn } from '@/types/decks/DeckReturn';

const createGameStore = useCreateGameStore();
const tablesFields = ref([
    'ROLE', 'DECK', 'HIDDEN', 'CARDS', 'REPEAT TIMES'
]);
const widthColumns = ref([
    '3', '3', '1', '2', '2'
])
const roles = ref(createGameStore.getRoles);
const decks = ref<DeckReturn[]>([]);

const defaultRoles = ref([
    { id: 0, name: 'Table' },
    { id: 1, name: 'Player' },
])
const getSelectedDecks = () => {
    decks.value = createGameStore.decks.filter((deck: DeckReturn) => {
        return createGameStore.selectedDecks.includes(deck.id);
    });
}

watch(() => createGameStore.selectedDecks,
    () => {
        getSelectedDecks();
    })
getSelectedDecks();
</script>