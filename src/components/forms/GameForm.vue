<template>
    <form class="mt-10 px-4 py-8" @submit.prevent="submit">
        <div class="grid grid-cols-2" v-if="createGameStore.game">
            <div class="col-span-2">
                <InputField :input="createGameStore.game.name" @change="(e) => createGameStore.game.name = e"
                    :title="'Name'" />
            </div>
            <div class="col-span-1">
                <InputField :input="createGameStore.game.min_players"
                    @change="(e) => createGameStore.game.min_players = e" :title="'Min Players'" :max="10" :min="1"
                    :type="'number'" />
            </div>
            <div class="col-span-1">
                <InputField :input="createGameStore.game.max_players"
                    @change="(e) => createGameStore.game.max_players = e" :title="'Min Players'" :max="10" :min="1"
                    :type="'number'" />
            </div>
            <div class="col-span-1">
                <InputField :input="createGameStore.game.grid_rows" @change="(e) => createGameStore.game.grid_rows = e"
                    :title="'Grid Rows'" :max="10" :min="1" :type="'number'" />
            </div>
            <div class="col-span-1">
                <InputField :input="createGameStore.game.grid_cols" @change="(e) => createGameStore.game.grid_cols = e"
                    :title="'Grid Columns'" :max="10" :min="1" :type="'number'" />
            </div>
            <div class="col-span-2">
                <TextAreaFiled :title="'Description'" :input="createGameStore.game.description"
                    @change="(e) => createGameStore.game.description = e" />
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
            <MoreItems :items="createGameStore.roles" :input="createGameStore.game.extra_roles"
                :itemsTitle="'Role name'" @update="(value, index) => createGameStore.roles[index].name = value"
                @deleteItem="(index) => createGameStore.deleteRole(index)" />

            <div class="col-span-2">
                <ExtraItems :title="'Teams'" :input="createGameStore.game.extra_teams"
                    @update="(e) => createGameStore.game.extra_teams = e" @addItem="createGameStore.addTeam()" />
            </div>
            <!-- More Teams -->
            <MoreItems :items="createGameStore.teams" :input="createGameStore.game.extra_teams"
                :itemsTitle="'Team name'" @update="(value, index) => createGameStore.teams[index].name = value"
                @deleteItem="(index) => createGameStore.deleteTeam(index)" />
        </div>
        <div class="flex justify-center mt-4">
            <button class="btn-green" type="submit">Submit</button>
        </div>
    </form>
</template>

<script setup lang="ts">
import MoreItems from './MoreItems.vue';
import ExtraItems from './ExtraItems.vue';
import CheckBoxField from '../ui/CheckBoxField.vue';
import TextAreaFiled from '../ui/TextAreaFiled.vue';
import InputField from '@/components/ui/InputField.vue';
import { useCreateGameStore } from '@/stores/GameStore'
import { computed } from 'vue';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

const createGameStore = useCreateGameStore();
const validationGameRules = computed(() => {
    return {
        name: { required }
    }
});
const v$ = useVuelidate(validationGameRules, createGameStore.game);

const submit = () => {
    let validateExtraItems = createGameStore.validateExtraItems();
    console.log(validateExtraItems);
}

</script>
