<template>
    <form class="px-4 py-8" @submit.prevent="submit" v-if="!createGameStore.loading">
        <StepForm :active-item="createGameStore.stepForm.value" :loading="createGameStore.stepForm.loading"
            @decrease="(value) => createGameStore.stepForm.value = value"
            @increase="(value) => createGameStore.stepForm.value = value">
            <div v-if="createGameStore.stepForm.value === 1">
                <GridCol :all="2" :gap_x="2" class="mt-8" v-if="createGameStore.createGame.game">
                    <GridColItem :xs="2">
                        <InputField :input="createGameStore.createGame.game.name"
                            @change="(e) => { createGameStore.createGame.game.name = e; createGameStore.stepFormChange() }"
                            :title="'Name'" :errors="v$.name.$errors" />
                    </GridColItem>
                    <GridColItem :xs="1">
                        <InputField :input="createGameStore.createGame.game.min_players"
                            @change="(e) => { createGameStore.createGame.game.min_players = e; createGameStore.stepFormChange() }"
                            :title="'Min Players'" :max="10" :min="1" :type="'number'" :errors="v$.min_players.$errors" />
                    </GridColItem>
                    <GridColItem :xs="1">
                        <InputField :input="createGameStore.createGame.game.max_players"
                            @change="(e) => { createGameStore.createGame.game.max_players = e; createGameStore.stepFormChange() }"
                            :title="'Max Players'" :max="10" :min="1" :type="'number'" :errors="v$.max_players.$errors" />
                    </GridColItem>
                    <GridColItem :xs="1">
                        <InputField :input="createGameStore.createGame.game.grid_rows"
                            @change="(e) => { createGameStore.createGame.game.grid_rows = e; createGameStore.stepFormChange() }"
                            :title="'Grid Rows'" :max="10" :min="1" :type="'number'" :errors="v$.grid_rows.$errors" />
                    </GridColItem>
                    <GridColItem :xs="1">
                        <InputField :input="createGameStore.createGame.game.grid_cols"
                            @change="(e) => { createGameStore.createGame.game.grid_cols = e; createGameStore.stepFormChange() }"
                            :title="'Grid Columns'" :max="10" :min="1" :type="'number'" :errors="v$.grid_cols.$errors" />
                    </GridColItem>
                    <GridColItem :xs="2">
                        <TextAreaFiled :title="'Description'" :input="createGameStore.createGame.game.description"
                            @change="(e) => { createGameStore.createGame.game.description = e; createGameStore.stepFormChange() }" />
                    </GridColItem>
                    <GridColItem :xs="2" v-if="publicDecks.length > 0 || userDecks.length > 0">
                        <MultipleSelectField
                            :public-decks="publicDecks.map((deck: DeckReturn) => ({ value: deck.id, label: deck.name }))"
                            :user-decks="userDecks.map((deck: DeckReturn) => ({ value: deck.id, label: deck.name }))"
                            :error="deckErrors" />
                    </GridColItem>
                    <GridColItem :xs="2">
                        <CheckBoxField :title="'Private'" :input="createGameStore.createGame.game.private" class="py-2"
                            @change="(e) => { createGameStore.createGame.game.private = e; createGameStore.stepFormChange() }" />
                    </GridColItem>
                    <GridColItem :xs="2">
                        <CheckBoxField :title="'Rank'" :input="createGameStore.createGame.game.rank" class="py-2"
                            @change="(e) => { createGameStore.createGame.game.rank = e; createGameStore.stepFormChange() }" />
                    </GridColItem>
                </GridCol>
            </div>
            <div v-if="createGameStore.stepForm.value === 2">
                <MoreItems :items="createGameStore.createGame.roles" :title="'Roles'" :button-title="'Add a Role'"
                    :message="'No roles'" @add-item="createGameStore.addRole()" :itemsTitle="'Role name'"
                    @update="(value, index) => { createGameStore.createGame.roles[index].name = value; createGameStore.stepFormChange() }"
                    @deleteItem="(index) => createGameStore.deleteRole(index)" :disabled-items="true" />
                <MoreItems :items="createGameStore.createGame.teams" :title="'Teams'" :button-title="'Add a Team'"
                    :message="'No teams'" @add-item="createGameStore.addTeam()" :itemsTitle="'Team name'"
                    @update="(value, index) => { createGameStore.createGame.teams[index].name = value; createGameStore.stepFormChange() }"
                    @deleteItem="(index) => createGameStore.deleteTeam(index)" />
                <MoreItems :items="createGameStore.createGame.status" :title="'Status'" :button-title="'Add a Status'"
                    :message="'No status'" @add-item="createGameStore.addStatus()" :itemsTitle="'Status name'"
                    @update="(value, index) => { createGameStore.createGame.status[index].name = value; createGameStore.stepFormChange() }"
                    @deleteItem="(index) => createGameStore.deleteStatus(index)" />
            </div>
            <div v-if="createGameStore.stepForm.value === 3">
                <CreateHandStartCardsForm />
            </div>
            <div v-if="createGameStore.editGame" class="mt-6 italic text-red-500">Note: If you edit the game settings the
                cards roles will be erase</div>
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
import { useCreateGameStore } from '@/stores/GameStore'
import { computed, ref } from 'vue';
import { required, numeric, minLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import axiosUser from '@/plugins/axiosUser';
import { useUserStore } from '@/stores/UserStore';
import type { DeckReturn } from "@/types/decks/DeckReturn";
import GridCol from '../wrappers/GridCol.vue';
import GridColItem from '../wrappers/GridColItem.vue';
import PreLoader from '../PreLoader.vue';

const createGameStore = useCreateGameStore();
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
const v$ = useVuelidate(validationGameDetailsRules, createGameStore.createGame.game);

const submit = async () => {
    switch (createGameStore.stepForm.value) {
        case 1:
            // Validation form step 1
            v$.value.$validate()
            const validateDecks = createGameStore.validateEmptyDecks;
            !validateDecks ? deckErrors.value = 'You have to choose at lease one deck' : deckErrors.value = null;
            if (validateDecks && !v$.value.$error) {
                emits('submit');
            }
            break;
        case 2:
            // Validation form step 2
            if (createGameStore.validateMoreSettings()) {
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

const getDecks = async () => {
    const { data: decks } = await axiosUser.get("deck/private-public");
    createGameStore.decks = decks;

};
createGameStore.fetchDecks().then(decks => {
    userDecks.value = decks.filter((deck: DeckReturn) => deck.creator === userStore.user.username);
    publicDecks.value = decks.filter((deck: DeckReturn) => deck.creator !== userStore.user.username);
})
</script>
