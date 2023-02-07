<template>
    <form class="mt-10 px-4 py-8" @submit.prevent="submit" v-if="true">
        <div class="grid grid-cols-2" v-if="createGameStore.game">
            <div class="col-span-2">
                <InputField :input="createGameStore.game.name" @change="(e) => createGameStore.game.name = e"
                    :title="'Name'" :errors="v$.name.$errors" />
            </div>
            <div class="col-span-1">
                <InputField :input="createGameStore.game.min_players"
                    @change="(e) => createGameStore.game.min_players = e" :title="'Min Players'" :max="10" :min="1"
                    :type="'number'" :errors="v$.min_players.$errors" />
            </div>
            <div class="col-span-1">
                <InputField :input="createGameStore.game.max_players"
                    @change="(e) => createGameStore.game.max_players = e" :title="'Min Players'" :max="10" :min="1"
                    :type="'number'" :errors="v$.max_players.$errors" />
            </div>
            <div class="col-span-1">
                <InputField :input="createGameStore.game.grid_rows" @change="(e) => createGameStore.game.grid_rows = e"
                    :title="'Grid Rows'" :max="10" :min="1" :type="'number'" :errors="v$.grid_rows.$errors" />
            </div>
            <div class="col-span-1">
                <InputField :input="createGameStore.game.grid_cols" @change="(e) => createGameStore.game.grid_cols = e"
                    :title="'Grid Columns'" :max="10" :min="1" :type="'number'" :errors="v$.grid_cols.$errors" />
            </div>
            <div class="col-span-2">
                <TextAreaFiled :title="'Description'" :input="createGameStore.game.description"
                    @change="(e) => createGameStore.game.description = e" />
            </div>
            <div class="col-span-2" v-if="publicDecks.length > 0 || userDecks.length > 0">
                <MultipleSelectField
                    :public-decks="publicDecks.map((deck: DeckReturn) => ({ value: deck.id, label: deck.name }))"
                    :user-decks="userDecks.map((deck: DeckReturn) => ({ value: deck.id, label: deck.name }))"
                    :error="deckErrors" />
            </div>
            <div class="col-span-2">
                <CheckBoxField :title="'Private'" :input="createGameStore.game.private" class="p-2"
                    @change="(e) => createGameStore.game.private = e" />
            </div>
            <div class="col-span-2">
                <CheckBoxField :title="'Rank'" :input="createGameStore.game.rank" class="p-2"
                    @change="(e) => createGameStore.game.rank = e" />
            </div>
            <div class="col-span-2">
                <ExtraItems :title="'Status Player'" :input="createGameStore.game.status_player"
                    @update="(e) => createGameStore.game.status_player = e" @addItem="createGameStore.addStatus()" />
            </div>
            <!-- More Status -->
            <MoreItems :items="createGameStore.status" :input="createGameStore.game.status_player"
                :itemsTitle="'Status name'" @update="(value, index) => createGameStore.status[index].name = value"
                @deleteItem="(index) => createGameStore.deleteStatus(index)" />

            <div class="col-span-2">
                <ExtraItems :title="'Extra Roles'" :input="createGameStore.game.extra_roles"
                    @update="(e) => createGameStore.game.extra_roles = e" @addItem="createGameStore.addRole()" />
            </div>
            <!-- More Roles -->
            <MoreItems :items="createGameStore.getRoles" :input="createGameStore.game.extra_roles"
                :itemsTitle="'Role name'" @update="(value, index) => createGameStore.roles[index].name = value"
                @deleteItem="(index) => createGameStore.deleteRole(index)" :disabled-items="true" />

            <div class="col-span-2">
                <ExtraItems :title="'Teams'" :input="createGameStore.game.extra_teams"
                    @update="(e) => createGameStore.game.extra_teams = e" @addItem="createGameStore.addTeam()" />
            </div>
            <!-- More Teams -->
            <MoreItems :items="createGameStore.teams" :input="createGameStore.game.extra_teams"
                :itemsTitle="'Team name'" @update="(value, index) => createGameStore.teams[index].name = value"
                @deleteItem="(index) => createGameStore.deleteTeam(index)" />

            <div class="col-span-2">
                <CheckBoxField :title="'Set starting cards'" :input="createGameStore.game.hand_start_cards" class="p-2"
                    @change="(e) => createGameStore.game.hand_start_cards = e" />
            </div>
            <div class="col-span-2">
                <CreateHandStartCardsForm v-if="createGameStore.game.hand_start_cards" />
            </div>
        </div>
        <div class="flex justify-center mt-4">
            <button class="btn-green" type="submit">Submit</button>
        </div>
    </form>
    <form class="mt-10 px-4 py-8" @submit.prevent="submit">
        <StepForm :active-item="createGameStore.stepForm.value" @decrease="(value) => createGameStore.stepForm.value = value"
            @increase="(value) => createGameStore.stepForm.value = value">
            <div v-if="createGameStore.stepForm.value === 1">Form 1</div>
            <div v-if="createGameStore.stepForm.value === 2">Form 2</div>
            <div v-if="createGameStore.stepForm.value === 3">Form 3</div>
            <div v-if="createGameStore.stepForm.value === 4">Form 4</div>
            <div v-if="createGameStore.stepForm.value === 5">Form 5</div>
        </StepForm>
    </form>
</template>

<script setup lang="ts">
import StepForm from '../wrappers/StepForm.vue';
import MultipleSelectField from '../ui/MultipleSelectField.vue';
import CreateHandStartCardsForm from './CreateHandStartCardsForm.vue';
import MoreItems from './MoreItems.vue';
import ExtraItems from './ExtraItems.vue';
import CheckBoxField from '../ui/CheckBoxField.vue';
import TextAreaFiled from '../ui/TextAreaFiled.vue';
import InputField from '@/components/ui/InputField.vue';
import { useCreateGameStore } from '@/stores/GameStore'
import { computed, watch, ref } from 'vue';
import { required, numeric, minLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import axiosUser from '@/plugins/axiosUser';
import { useUserStore } from '@/stores/UserStore';
import type { DeckReturn } from "@/types/decks/DeckReturn";

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
const v$ = useVuelidate(validationGameDetailsRules, createGameStore.game);

const submit = async () => {
    const validateExtraItems = createGameStore.validateExtraItems();
    const validateDecks = createGameStore.validateEmptyDecks;
    v$.value.$validate()

    !validateDecks ? deckErrors.value = 'You have to choose at lease one deck' : deckErrors.value = null;
    if (validateExtraItems && validateDecks && !v$.value.$error) {
        emits('submit');
    }
}

watch(() => createGameStore.game.extra_roles,
    (newVal) => {
        if (newVal) {
            createGameStore.addRole();
        } else {
            createGameStore.roles = createGameStore.roles.filter(role => role.name !== '')
        }
    }
)
watch(() => createGameStore.game.extra_teams,
    (newVal) => {
        if (newVal) {
            createGameStore.addTeam();
        } else {
            createGameStore.teams = createGameStore.teams.filter(team => team.name !== '')
        }
    }
)
watch(() => createGameStore.game.status_player,
    (newVal) => {
        if (newVal) {
            createGameStore.addStatus();
        } else {
            createGameStore.status = createGameStore.status.filter(s => s.name !== '')
        }
    }
)

const getDecks = async () => {
    const { data: decks } = await axiosUser.get("deck/private-public");
    createGameStore.decks = decks;
    userDecks.value = decks.filter((deck: DeckReturn) => deck.creator === userStore.user.username);
    publicDecks.value = decks.filter((deck: DeckReturn) => deck.creator !== userStore.user.username);
};

getDecks();
</script>

<style>
.multiselect-tag.is-user {
    padding: 5px 8px;
    border-radius: 22px;
    background: #35495e;
    margin: 3px 3px 8px;
}

.multiselect-tag.is-user img {
    width: 18px;
    border-radius: 50%;
    height: 18px;
    margin-right: 8px;
    border: 2px solid #ffffffbf;
}

.multiselect-tag.is-user i:before {
    color: #ffffff;
    border-radius: 50%;
    ;
}

.user-image {
    margin: 0 6px 0 0;
    border-radius: 50%;
    height: 22px;
}
</style>
