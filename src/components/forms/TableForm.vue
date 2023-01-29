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
        </div>
        <div class="flex justify-center mt-4">
            <button class="btn-green" type="submit">Submit</button>
        </div>
    </form>
</template>

<script setup lang="ts">
import { useCreateTableStore } from '@/stores/CreateTable';
import InputField from '@/components/ui/InputField.vue';
import CheckBoxField from '../ui/CheckBoxField.vue';
import { computed } from 'vue';
import { required, requiredIf, minLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

const createTableStore = useCreateTableStore();
const rules = computed(() => {
    return {
        name: { required, minLength: minLength(4) },
        password: {
            requiredIf: requiredIf(() => { return createTableStore.table.private })
        }
    }
})
const v$ = useVuelidate(rules, createTableStore.table);
const submit = async () => {
    await v$.value.$validate();
    console.log(v$.value.$error);
}
</script>