<template>
    <form class="px-4 py-8" @submit.prevent="submit" v-if="!gameStore.loading">
        <StepForm :active-item="gameStore.stepForm.value" :loading="gameStore.stepForm.loading"
            @decrease="(value) => gameStore.stepForm.value = value"
            @increase="(value) => gameStore.stepForm.value = value">
            <div v-if="gameStore.stepForm.value === 1">
                <GridCol :all="2" :gap_x="2" class="mt-8" v-if="gameStore.createGame.game">
                    <GridColItem :xs="2">
                        <InputField :input="gameStore.createGame.game.name"
                            @change="(e) => { gameStore.createGame.game.name = e; gameStore.stepFormChange() }"
                            :title="'Name'" :errors="v$.name.$errors" />
                    </GridColItem>
                    <GridColItem :xs="1">
                        <InputField :input="gameStore.createGame.game.min_players"
                            @change="(e) => { gameStore.createGame.game.min_players = e; gameStore.stepFormChange() }"
                            :title="'Min Players'" :max="10" :min="1" :type="'number'" :errors="v$.min_players.$errors" />
                    </GridColItem>
                    <GridColItem :xs="1">
                        <InputField :input="gameStore.createGame.game.max_players"
                            @change="(e) => { gameStore.createGame.game.max_players = e; gameStore.stepFormChange() }"
                            :title="'Max Players'" :max="10" :min="1" :type="'number'" :errors="v$.max_players.$errors" />
                    </GridColItem>
                    <GridColItem :xs="1">
                        <InputField :input="gameStore.createGame.game.grid_rows"
                            @change="(e) => { gameStore.createGame.game.grid_rows = e; gameStore.stepFormChange() }"
                            :title="'Grid Rows'" :max="12" :min="0" :type="'number'" :errors="v$.grid_rows.$errors" />
                    </GridColItem>
                    <GridColItem :xs="1">
                        <InputField :input="gameStore.createGame.game.grid_cols"
                            @change="(e) => { gameStore.createGame.game.grid_cols = e; gameStore.stepFormChange() }"
                            :title="'Grid Columns'" :max="12" :min="0" :type="'number'" :errors="v$.grid_cols.$errors" />
                    </GridColItem>
                    <GridColItem :xs="2">
                        <TextAreaFiled :title="'Description'" :input="gameStore.createGame.game.description"
                            @change="(e) => { gameStore.createGame.game.description = e; gameStore.stepFormChange() }" />
                    </GridColItem>
                    <GridColItem :xs="2" v-if="publicDecks.length > 0 || userDecks.length > 0">
                        <MultipleSelectField
                            :public-decks="publicDecks.map((deck: DeckReturn) => ({ value: deck.id, label: deck.name }))"
                            :user-decks="userDecks.map((deck: DeckReturn) => ({ value: deck.id, label: deck.name }))"
                            :error="deckErrors" />
                    </GridColItem>
                    <GridColItem :xs="2">
                        <CheckBoxField :title="'Private'" :input="gameStore.createGame.game.private" class="py-2"
                            @change="(e) => { gameStore.createGame.game.private = e; gameStore.stepFormChange() }" />
                    </GridColItem>
                    <GridColItem :xs="2">
                        <CheckBoxField :title="'Rank'" :input="gameStore.createGame.game.rank" class="py-2"
                            @change="(e) => { gameStore.createGame.game.rank = e; gameStore.stepFormChange() }" />
                    </GridColItem>
                </GridCol>
            </div>
            <div v-if="gameStore.stepForm.value === 2">
                <MoreItems :items="gameStore.createGame.roles" :title="'Roles'" :button-title="'Add a Role'"
                    :message="'No roles'" @add-item="gameStore.addRole()" :itemsTitle="'Role name'"
                    @update="(value, index) => { gameStore.createGame.roles[index].name = value; gameStore.stepFormChange() }"
                    @deleteItem="(index) => gameStore.deleteRole(index)" :disabled-items="true" />
                <MoreItems :items="gameStore.createGame.teams" :title="'Teams'" :button-title="'Add a Team'"
                    :message="'No teams'" @add-item="gameStore.addTeam()" :itemsTitle="'Team name'"
                    @update="(value, index) => { gameStore.createGame.teams[index].name = value; gameStore.stepFormChange() }"
                    @deleteItem="(index) => gameStore.deleteTeam(index)" />
                <MoreItems :items="gameStore.createGame.status" :title="'Status'" :button-title="'Add a Status'"
                    :message="'No status'" @add-item="gameStore.addStatus()" :itemsTitle="'Status name'"
                    @update="(value, index) => { gameStore.createGame.status[index].name = value; gameStore.stepFormChange() }"
                    @deleteItem="(index) => gameStore.deleteStatus(index)" />
            </div>
            <div v-if="gameStore.stepForm.value === 3">
                <CreateHandStartCardsForm />
            </div>
            <div v-if="gameStore.editGame && gameStore.stepForm.value !== 3" class="mt-6 italic text-red-500">Note: If you edit the game settings the
                cards rules will be erase</div>
        </StepForm>
    </form>
    <PreLoader v-else />
</template>

<script setup lang="ts">
import StepForm from '../wrappers/StepForm.vue';
import MultipleSelectField from '../ui/MultipleSelectField.vue';
import CreateHandStartCardsForm from './CreateHandStartCardsForm.vue';
import MoreItems from './MoreItems.vue';
import CheckBoxField from '../ui/CheckBoxField.vue';
import TextAreaFiled from '../ui/TextAreaFiled.vue';
import InputField from '@/components/ui/InputField.vue';
import { useGameStore } from '@/stores/GameStore'
import { computed, ref } from 'vue';
import { required, numeric, minLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { useUserStore } from '@/stores/UserStore';
import type { DeckReturn } from "@/types/decks/DeckReturn";
import GridCol from '../wrappers/GridCol.vue';
import GridColItem from '../wrappers/GridColItem.vue';
import PreLoader from '../PreLoader.vue';

const gameStore = useGameStore();
const emits = defineEmits(['submit'])
const userStore = useUserStore();
const deckErrors = ref<String | null>(null);
const validationGameDetailsRules = computed(() => {
    return {
        name: { required },
        min_players: { required, numeric, minLength: minLength(1) },
        max_players: { required, numeric, minLength: minLength(1) },
        grid_rows: { required, numeric, minLength: minLength(1) },
        grid_cols: { required, numeric, minLength: minLength(1) },
    }
});
const publicDecks = ref<DeckReturn[]>([]);
const userDecks = ref<DeckReturn[]>([]);
const v$ = useVuelidate(validationGameDetailsRules, gameStore.createGame.game);

const submit = async () => {
    switch (gameStore.stepForm.value) {
        case 1:
            // Validation form step 1
            v$.value.$validate()
            const validateDecks = gameStore.validateEmptyDecks;
            !validateDecks ? deckErrors.value = 'You have to choose at lease one deck' : deckErrors.value = null;
            if (validateDecks && !v$.value.$error) {
                emits('submit');
            }
            break;
        case 2:
            // Validation form step 2
            if (gameStore.validateMoreSettings()) {
                emits('submit');
            }
            break;
        case 3:
            emits('submit');
            break;
        default:
            break;
    }
}

gameStore.fetchDecks().then(decks => {
    userDecks.value = decks.filter((deck: DeckReturn) => deck.creator === userStore.user.username);
    publicDecks.value = decks.filter((deck: DeckReturn) => deck.creator !== userStore.user.username);
})
</script>
