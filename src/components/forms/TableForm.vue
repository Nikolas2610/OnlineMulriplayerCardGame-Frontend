<template>
    <form class="mt-10 px-4 py-8" @submit.prevent="submit">
        <div class="grid grid-cols-2" v-if="createTableStore.table">
            <div class="col-span-2">
                <InputField :input="createTableStore.table.name" :title="'Name'" :errors="v$.name.$errors"
                    @change="(e) => createTableStore.table.name = e" />
            </div>
            <div class="col-span-2">
                <CheckBoxField :title="'Private'" :input="createTableStore.table.private" class="mb-3"
                    @change="(e) => createTableStore.table.private = e" />
            </div>
            <div class="col-span-2" v-if="createTableStore.table.private">
                <InputField :input="createTableStore.table.password" :type="'password'" :title="'Password'"
                    :errors="v$.password.$errors" @change="(e) => createTableStore.table.password = e" />
            </div>
            <div class="col-span-2" v-if="publicGames.length > 0 || userGames.length > 0">
                <GroupSelectField :input="createTableStore.table.game" :public-games="publicGames.map((game: GameReturn) => ({ value: game.id, label: game.name}))" :errors="v$.game.$errors"
                    :user-games="userGames.map((game: GameReturn) => ({ value: game.id, label: game.name}))" @update="(value) => createTableStore.table.game = value" />
            </div>
        </div>
        <div class="flex justify-center mt-8">
            <button class="btn-green" type="submit">Submit</button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { useCreateTableStore } from '@/stores/CreateTable';
import InputField from '@/components/ui/InputField.vue';
import CheckBoxField from '../ui/CheckBoxField.vue';
import { computed, ref } from 'vue';
import { required, requiredIf, minLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import GroupSelectField from '../ui/GroupSelectField.vue';
import axiosUser from '@/plugins/axiosUser';
import type { GameReturn } from '@/types/games/GameReturn';
import { useUserStore } from '@/stores/UserStore';

const createTableStore = useCreateTableStore();
const userStore = useUserStore();
const userGames = ref([]);
const publicGames = ref([]);
const emits = defineEmits(['submit']);
const getGames = async () => {
    const { data: games } = await axiosUser.get("game/private-public");
    createTableStore.games = games;
    userGames.value = games.filter((game: GameReturn) => game.creator === userStore.user.username);
    publicGames.value = games.filter((game: GameReturn) => game.creator !== userStore.user.username);
};
const rules = computed(() => {
    return {
        name: { required, minLength: minLength(4) },
        password: {
            requiredIf: requiredIf(() => { return createTableStore.table.private })
        },
        game: { required }
    }
})
const v$ = useVuelidate(rules, createTableStore.table);

const submit = async () => {
    await v$.value.$validate();
    if (!v$.value.$error) {
        v$.value.$reset();
        emits('submit');
    }
}
getGames();
</script>