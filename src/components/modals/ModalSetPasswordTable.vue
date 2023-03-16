<template>
    <Modal :modalOpen="isModalOpen" @closeModal="$emit('closeModal')" class="z-[2147483645]">
        <template v-slot:modal_header>
            Password Table
        </template>

        <template v-slot:body>
            <Flex>
                <InputField title="Table Password" :input="table.password" @change="(value) => table.password = value"
                    :errors="v$.password.$errors" />
            </Flex>
        </template>

        <template v-slot:modal_footer>
            <button
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-400 px-8 py-3 text-base font-medium text-white hover:bg-secondary hover:text-white md:py-3 md:px-10 md:text-lg ml-2"
                @click="$emit('closeModal')">
                Close
            </button>
            <button @click="setPasswordTable()"
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-secondary hover:text-white md:py-3 md:px-10 md:text-lg ml-2">
                Submit
            </button>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import Modal from '../Modal.vue';
import { computed, ref } from 'vue';
import Flex from '../wrappers/Flex.vue';
import InputField from '../ui/InputField.vue';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

const table = ref({
    password: ''
});
const props = defineProps({
    isModalOpen: { type: Boolean, required: true },
});
const emits = defineEmits(['closeModal', 'setPasswordTable']);

const rules = computed(() => {
    return {
        password: { required }
    }
});

const v$ = useVuelidate(rules, table);
const setPasswordTable = () => {
    v$.value.$validate();
    if (!v$.value.$error) {
        emits('setPasswordTable', table.value.password);
    }
}
</script>
