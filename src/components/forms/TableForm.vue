<template>
    <form class="mt-10 px-4 py-8" @submit.prevent="submit" v-if="!tableStore.loadingStatus">
        <div class="grid grid-cols-2" v-if="table">
            <div class="col-span-2">
                <InputField :input="table.name" :title="'Name'" :errors="v$.name.$errors"
                    @change="(e) => table.name = e" />
            </div>
            <div class="col-span-2">
                <CheckBoxField :title="'Private'" :input="table.private" class="mb-3"
                    @change="(e) => table.private = e" />
            </div>
            <div class="col-span-2" v-if="table.private">
                <InputField :input="table.password ? table.password : ''" :type="'password'" :title="'Password'"
                    :errors="v$.password.$errors" @change="(e) => table.password = e" />
            </div>
            <div class="col-span-2 mb-3" v-if="tableStore.games">
                <SelectField :title="'Game'"
                    :input="tableStore.editTable ? { value: tableStore.edit.game?.id } : { value: tableStore.table.game }"
                    :options="tableStore.games.map((game) => ({ id: game.id, name: game.name }))"
                    @update="(value) => tableStore.updateSelectedGame(value)" />
            </div>
            <div class="col-span-2 mb-3" v-if="tableStore.editTable">
                <SelectField :title="'Status'" :input="{ value: tableStore.edit.status }" :options="statusTable"
                    @update="(value) => tableStore.edit.status = value" />
            </div>
        </div>
        <div class="flex justify-center mt-8">
            <button class="mr-2 btn-grey" type="button" v-if="tableStore.editTable"
                @click="tableStore.editTable = false">Back</button>
            <button class="btn-green" type="submit">Submit</button>
        </div>
    </form>
    <div v-else>
        <PreLoader />
    </div>
</template>

<script setup lang="ts">
import SelectField from '../ui/SelectField.vue';
import { useTableStore } from '@/stores/TableStore';
import InputField from '@/components/ui/InputField.vue';
import CheckBoxField from '../ui/CheckBoxField.vue';
import { computed, ref } from 'vue';
import { required, requiredIf, minLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import PreLoader from '../PreLoader.vue';

const tableStore = useTableStore();
const table = computed(() => {
    return tableStore.editTable ? tableStore.edit : tableStore.table;
})
const emits = defineEmits(['submit']);
const statusTable = ref([
    { id: 'close', name: 'Close' },
    { id: 'waiting', name: 'Waiting' },
    { id: 'finish', name: 'Finish' },
]);

const rules = computed(() => {
    return {
        name: { required, minLength: minLength(4) },
        password: {
            requiredIf: requiredIf(() => { return tableStore.table.private })
        },
        game: { required }
    }
})
const v$ = useVuelidate(rules, tableStore.editTable ? tableStore.edit : tableStore.table);

const submit = async () => {
    await v$.value.$validate();
    if (!v$.value.$error) {
        v$.value.$reset();
        emits('submit');
    }
}
</script>