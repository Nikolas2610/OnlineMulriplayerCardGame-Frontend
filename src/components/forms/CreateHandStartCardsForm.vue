<template>
    <div class="mx-auto my-4">
        <div class="flex flex-col">
            <div class="overflow-x-auto shadow-md sm:rounded-lg">
                <div class="inline-block min-w-full align-middle">
                    <div class="overflow-hidden ">
                        <table class="min-w-full divide-y table-fixed divide-gray-700"
                            v-for="(item, index) in gameStore.createGame.hand_start_cards" :key="`start_cards_${index}`"
                            v-if="gameStore.createGame.hand_start_cards.length !== 0">
                            <thead class="bg-gray-700">
                                <tr>
                                    <th scope="col" v-for="(title, i) in tablesFields" :key="i"
                                        :class="`w-${widthColumns[i]}/12`"
                                        class="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-gray-400">
                                        {{ gameStore.createGame.hand_start_cards[index].type === HandStartCardsRuleType.DECK
                                            && i === 2
                                            ? 'TO DECK'
                                            : title }}
                                    </th>
                                    <th scope="col" class="p-4 w-1/12">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y bg-dark divide-gray-700">
                                <tr class="hover:bg-gray-800 transition duration-300">
                                    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                        <SelectField :options="[
                                            { id: HandStartCardsRuleType.ROLE, name: 'Role' },
                                            { id: HandStartCardsRuleType.DECK, name: 'Deck' },]"
                                            @update="(value) => { gameStore.createGame.hand_start_cards[index].type = value; gameStore.stepFormChange() }"
                                            :dark="true"
                                            :input="{ value: gameStore.createGame.hand_start_cards[index].type }"
                                            :empty-value="false" />
                                    </td>
                                    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                        <SelectField
                                            :options="gameStore.createGame.game.deck?.filter(d => d.type === DeckType.DECK).map((deck) => ({ id: deck.id, name: deck.name }))"
                                            :disable="decks.length === 0" :dark="true"
                                            @update="(value) => { gameStore.createGame.hand_start_cards[index].deck = value; gameStore.stepFormChange() }"
                                            :input="{ value: gameStore.createGame.hand_start_cards[index].deck }"
                                            :empty-value="false" />
                                    </td>
                                    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                        <SelectField
                                            :options="gameStore.createGame.hand_start_cards[index].type === HandStartCardsRuleType.ROLE
                                                ? gameStore.createGame.game.roles?.map((role) => ({ id: role.id, name: role.name }))
                                                : gameStore.createGame.game.deck?.filter(d => d.type === DeckType.EXTRA_DECK).map((deck) => ({ id: deck.id, name: deck.name }))"
                                            :dark="true" @update="(value) => {
                                                gameStore.createGame.hand_start_cards[index].type === HandStartCardsRuleType.ROLE
                                                    ? gameStore.createGame.hand_start_cards[index].role = value
                                                    : gameStore.createGame.hand_start_cards[index].toDeck = value; gameStore.stepFormChange()
                                                                                            }" :input="{
                                                    value: gameStore.createGame.hand_start_cards[index].type === HandStartCardsRuleType.ROLE
                                                        ? gameStore.createGame.hand_start_cards[index].role
                                                        : gameStore.createGame.hand_start_cards[index].toDeck
                                                }" :empty-value="false" />
                                    </td>
                                    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                        <CheckBoxField :title-show="false" :input="item.hidden"
                                            @change="(value) => { gameStore.createGame.hand_start_cards[index].hidden = value; gameStore.stepFormChange() }" />
                                    </td>
                                    <td class="py-4 px-6 text-sm font-medium whitespace-nowrap text-white">
                                        <InputField :title-show="false" :input="item.count_cards" :type="'number'" :min="1"
                                            @change="(value) => { item.count_cards = value; gameStore.stepFormChange() }" />
                                    </td>
                                    <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap mb-2">
                                        <Flex :gap="2">
                                            <AddButton
                                                @click="{ gameStore.addHandStartCardsRow(); gameStore.stepFormChange() }" />
                                            <RemoveButton
                                                @click="{ gameStore.deleteHandStartCardsRow(index); gameStore.stepFormChange() }" />
                                        </Flex>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                        <div class="bg-dark p-4 text-center w-full text-white" v-else>
                            <div class="p-2 shadow-lg">No rules. <span class="underline cursor-pointer hover:text-primary"
                                    @click="{ gameStore.addHandStartCardsRow(); gameStore.stepFormChange() }">
                                    Click here to add a role
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useGameStore } from '@/stores/GameStore'
import InputField from '@/components/ui/InputField.vue';
import SelectField from '../ui/SelectField.vue';
import CheckBoxField from '../ui/CheckBoxField.vue';
import type { DeckReturn } from '@/types/decks/DeckReturn';
import AddButton from '../buttons/AddButton.vue';
import RemoveButton from '../buttons/RemoveButton.vue';
import Flex from '../wrappers/Flex.vue';
import { DeckType } from "@/types/decks/DeckType.enum";
import { HandStartCardsRuleType } from '@/types/games/HandStartCardsRuleType.enum'

const gameStore = useGameStore();
const tablesFields = ref([
    'RULE TYPE', 'FROM DECK', 'TO ROLE', 'HIDDEN', 'CARDS'
]);
const widthColumns = ref([
    '2', '3', '3', '1', '2', '1'
])
const decks = ref<DeckReturn[]>([]);

const getSelectedDecks = () => {
    decks.value = gameStore.decks.filter((deck: DeckReturn) => {
        return gameStore.createGame.selectedDecks.includes(deck.id);
    });
}

watch(() => gameStore.createGame.selectedDecks,
    () => {
        getSelectedDecks();
    })
getSelectedDecks();
</script>