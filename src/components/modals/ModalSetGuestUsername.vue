<template>
    <Modal :modalOpen="isModalOpen" @closeModal="$emit('closeModal')" class="z-[2147483645]">
        <template v-slot:modal_header>
            Set Nickname
        </template>

        <template v-slot:body>
            <Flex>
                <InputField title="Nickname" :input="user.username" @change="(value) => user.username = value"
                    :errors="v$.username.$errors" />
            </Flex>
        </template>

        <template v-slot:modal_footer>
            <button
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-400 px-8 py-3 text-base font-medium text-white hover:bg-secondary hover:text-white md:py-3 md:px-10 md:text-lg ml-2"
                @click="$emit('closeModal')">
                Close
            </button>
            <button @click="registerGuest()"
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

const user = ref({
    username: ''
});
const props = defineProps({
    isModalOpen: { type: Boolean, required: true },
});
const emits = defineEmits(['closeModal', 'registerGuest']);

const rules = computed(() => {
    return {
        username: { required }
    }
});

const v$ = useVuelidate(rules, user);
const registerGuest = () => {
    v$.value.$validate();
    if (!v$.value.$error) {
        emits('registerGuest', user.value.username);
    }
}
</script>
