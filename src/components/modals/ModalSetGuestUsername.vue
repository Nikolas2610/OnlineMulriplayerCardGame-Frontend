<template>
    <Modal :modalOpen="isModalOpen" @closeModal="$emit('closeModal')" class="z-[2147483645]">
        <template v-slot:modal_header>
            Set Nickname
        </template>

        <template v-slot:body>
            <Flex>
                <InputField title="Nickname" :input="user.username" @change="(value) => user.username = value"
                    :errors="v$.username.$errors" @keyup.enter="registerGuest()" />
            </Flex>
        </template>

        <template v-slot:modal_footer>
            <ModalSecondaryButton @click="$emit('closeModal')">
                Close
            </ModalSecondaryButton>
            <ModalPrimaryButton  @click="registerGuest()">
                Submit
            </ModalPrimaryButton>
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
import ModalSecondaryButton from '@/components/buttons/ModalSecondaryButton.vue';
import ModalPrimaryButton from '@/components/buttons/ModalPrimaryButton.vue';

const user = ref({
    username: ''
});
const props = defineProps({
    isModalOpen: { type: Boolean, required: true },
    username: { type: String, default: ''}
});
if (props.username) {
    user.value.username = props.username;
}
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
