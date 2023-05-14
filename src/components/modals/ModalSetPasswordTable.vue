<template>
    <Modal :modalOpen="isModalOpen" @closeModal="$emit('closeModal')" class="z-[2147483645]">
        <template v-slot:modal_header>
            Password Table
        </template>

        <template v-slot:body>
            <Flex>
                <InputField title="Table Password" :input="table.password" @change="(value) => table.password = value"
                    :errors="v$.password.$errors" @keyup.enter="setPasswordTable()" />
            </Flex>
        </template>

        <template v-slot:modal_footer>
            <ModalSecondaryButton @click="$emit('closeModal')">Close</ModalSecondaryButton>
            <ModalPrimaryButton @click="setPasswordTable()">Submit</ModalPrimaryButton>
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
import ModalSecondaryButton from '../buttons/ModalSecondaryButton.vue';
import ModalPrimaryButton from '../buttons/ModalPrimaryButton.vue';

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
