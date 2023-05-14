<template>
    <form class="px-4 py-8" @submit.prevent="submit" v-if="!tableStore.loadingStatus">
        <GridCol :all="2" v-if="table" :gap="2">
            <GridColItem :all="2">
                <InputField :input="table.name" title="Name" :errors="v$.name.$errors" @change="(e) => table.name = e" />
            </GridColItem>
            <GridColItem :all="2">
                <CheckBoxField :title="'Private'" :input="table.private" class="mb-3" @change="(e) => table.private = e" />
            </GridColItem>
            <GridColItem v-if="table.private" :all="2">
                <InputField :input="table.password ? table.password : ''" title="Password"
                    :errors="v$.password.$errors" @change="(e) => table.password = e" />
            </GridColItem>
            <GridColItem v-if="tableStore.games" :all="2">
                <SelectField title="Game"
                    :input="tableStore.editTable ? { value: tableStore.edit.game?.id } : { value: tableStore.table.game }"
                    :options="tableStore.games.map((game) => ({ id: game.id, name: game.name }))"
                    @update="(value) => tableStore.updateSelectedGame(value)" :errors="v$.game.$errors" />
            </GridColItem>
            <GridColItem v-if="tableStore.editTable" :all="2">
                <SelectField title="Status" :input="{ value: tableStore.edit.status }"
                    :options="StatusTable.map(value => ({ id: value.id, name: value.name }))"
                    @update="(value) => tableStore.edit.status = value" />
            </GridColItem>
        </GridCol>
        <div v-if="tableStore.editTable">
            <button :title="'Delete Table Settings'" v-if="tableStore.role === 'admin'"
                class="text-red-500 cursor-pointer hover:text-red-700" @click="tableStore._deleteTableDetails()">Delete
                table data (users, decks, cards) expect the table</button>
            <div class="flex justify-center mt-8">
                <PrimaryButton title="Submit" type="submit" />
            </div>
        </div>
        <Flex class="mt-8" v-else>
            <ModalSecondaryButton @click="$emit('closeModal')">
                Close
            </ModalSecondaryButton>
            <ModalPrimaryButton type="submit">
                Submit
            </ModalPrimaryButton>
        </Flex>
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
import { computed } from 'vue';
import { required, requiredIf, minLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import PreLoader from '../PreLoader.vue';
import PrimaryButton from '../buttons/PrimaryButton.vue';
import { StatusTable } from '@/utils/StatusTable'
import Flex from '../wrappers/Flex.vue';
import GridCol from '../wrappers/GridCol.vue';
import GridColItem from '../wrappers/GridColItem.vue';
import ModalSecondaryButton from '@/components/buttons/ModalSecondaryButton.vue';
import ModalPrimaryButton from '@/components/buttons/ModalPrimaryButton.vue';

const tableStore = useTableStore();
const table = computed(() => {
    return tableStore.editTable ? tableStore.edit : tableStore.table;
})
const emits = defineEmits(['submit', 'closeModal']);


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
    if (tableStore.editTable) {
        tableStore._update();
    } else {
        await v$.value.$validate();
        if (!v$.value.$error) {
            v$.value.$reset();
            tableStore._submit();
        }
    }
}
</script>