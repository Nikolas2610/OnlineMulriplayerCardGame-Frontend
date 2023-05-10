<template>
    <div class="w-full overflow-x-auto px-4">
        <!-- Title -->
        <MyTitle>My Personal Info</MyTitle>

        <!-- Username -->
        <div class="flex justify-center mt-10">
            <div class="lg:w-6/12 w-10-12 bg-dark rounded-lg p-4">
                <div class="text-white text-center">
                    Username:
                    <span class="text-primary">
                        {{ user.username }}
                    </span>
                </div>
                <div class="text-white text-center mt-4">
                    Email:
                    <span class="text-primary">
                        {{ user.email }}
                    </span>
                </div>
                <div class="text-white text-center mt-4">
                    Password:
                    <span class="text-primary">
                        *************
                    </span>
                </div>
                <div class="mt-4 flex">
                    <button @click="activateChangeUsernameModal"
                        class="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-secondary hover:text-white md:py-2 md:px-10">
                        Change Username
                    </button>
                    <button @click="changePasswordModal = true"
                        class="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-secondary hover:text-white md:py-2 md:px-10 ml-2">
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    </div>

    <Modal :modalOpen="changeUsernameModal" @closeModal="deactivateChangeUsernameModal">
        <template v-slot:modal_header>
            Change Username
        </template>
        <template v-slot:body>
            <div class="mb-3">
                <label for="username" class="block text-sm font-medium">Username</label>
                <div class="mt-1">
                    <input id="username" type="text" v-model="tempUsername.username"
                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm" />
                </div>
                <div v-for="error in u$.username.$errors" :key="error.$uid"
                    class="text-rose-700 text-base font-medium mt-1 px-2">
                    {{ error.$message }}
                </div>
            </div>
        </template>
        <template v-slot:modal_footer>
            <ModalSecondaryButton @click="changeUsernameModal = false">
                Close
            </ModalSecondaryButton>
            <ModalPrimaryButton @click="updateUsername">
                Update Username
            </ModalPrimaryButton>
        </template>
    </Modal>

    <Modal :modalOpen="changePasswordModal" @closeModal="deactivateChangePasswordModal">
        <template v-slot:modal_header>
            Change Password
        </template>
        <template v-slot:body>
            <div class="mb-3">
                <label for="old_password" class="block text-sm font-medium">Old Password</label>
                <div class="mt-1">
                    <input id="old_password" type="password" v-model="changePassword.old_password"
                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm" />
                </div>
                <div v-for="error in v$.old_password.$errors" :key="error.$uid"
                    class="text-rose-700 text-base font-medium mt-1 px-2">
                    {{ error.$message }}
                </div>
            </div>
            <div class="mb-3">
                <label for="new_password" class="block text-sm font-medium">New Password</label>
                <div class="mt-1">
                    <input id="new_password" type="password" v-model="changePassword.new_password"
                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm" />
                </div>
                <div v-for="error in v$.new_password.$errors" :key="error.$uid"
                    class="text-rose-700 text-base font-medium mt-1 px-2">
                    {{ error.$message }}
                </div>
            </div>
            <div class="mb-3">
                <label for="confirm_password" class="block text-sm font-medium">Confirm Password</label>
                <div class="mt-1">
                    <input id="confirm_password" type="password" v-model="changePassword.confirm_password"
                        class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm" />
                </div>
                <div v-for="error in v$.confirm_password.$errors" :key="error.$uid"
                    class="text-rose-700 text-base font-medium mt-1 px-2">
                    {{ error.$message }}
                </div>
            </div>
        </template>
        <template v-slot:modal_footer>
            <ModalSecondaryButton @click="changePasswordModal = false">
                Close
            </ModalSecondaryButton>
            <ModalPrimaryButton @click="updatePassword">
                Update Password
            </ModalPrimaryButton>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import MyTitle from '@/components/MyTitle.vue';
import { useUserStore } from '@/stores/UserStore';
import { computed, ref } from 'vue';
import Modal from '@/components/Modal.vue';
import { helpers, required, minLength, email, sameAs } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import axiosUser from '@/plugins/axiosUser';
import type { AxiosResponse } from 'axios';
import { useToast } from "vue-toastification";
import ModalSecondaryButton from '@/components/buttons/ModalSecondaryButton.vue';
import ModalPrimaryButton from '@/components/buttons/ModalPrimaryButton.vue';

const toast = useToast();
const changeUsernameModal = ref(false);
const changePasswordModal = ref(false);
const userStore = useUserStore();
const user = computed(() => userStore.$state.user);
const tempUsername = ref({
    username: '' as string | null
});
const changePassword = ref({
    old_password: '',
    new_password: '',
    confirm_password: ''
})

const deactivateChangeUsernameModal = () => {
    changeUsernameModal.value = false;
}

const activateChangeUsernameModal = () => {
    tempUsername.value.username = user.value.username;
    changeUsernameModal.value = true;
}

const updateUsername = async () => {
    await u$.value.$validate();
    if (!u$.value.$error) {
        try {
            const response: AxiosResponse = await axiosUser.patch('user/edit/username', {
                username: tempUsername.value.username
            })
            if (response.status === 200) {
                userStore.decodeToken(response.data.token);
                toast.success('Username updated successfully');
                deactivateChangeUsernameModal();
                return
            }
            toast.error('Something went wrong.');
        } catch (err: any) {
            toast.error(err.response.data.error)
        }
    }
}

// Change Password Section

const deactivateChangePasswordModal = () => {
    resetPassword();
    changePasswordModal.value = false;
}

// Strong Password functions - Uppercase / Lowercase / Number / Special character 
const passwordUppercase = helpers.regex(/^(?=.*[A-Z]).*$/);
const passwordLowercase = helpers.regex(/^(?=.*[a-z])/);
const passwordDigit = helpers.regex(/^(?=.*[0-9])/);
const passwordSpecialCharacter = helpers.regex(/[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/);
// Registration Form rules
const rulesPassword = computed(() => {
    return {
        old_password: { required },
        new_password: {
            required, minLength: minLength(6),
            // Strong Password - Uppercase / Lowercase / Number / Special character 
            passwordUppercase: helpers.withMessage('The Password must contain at least one Uppercase character.', passwordUppercase),
            passwordLowercase: helpers.withMessage('The Password must contain at least one Lowercase character.', passwordLowercase),
            passwordDigit: helpers.withMessage('The Password must contain at least one digit.', passwordDigit),
            passwordSpecialCharacter: helpers.withMessage('The Password must have at least one Special Symbol.', passwordSpecialCharacter),
        },
        confirm_password: { required, sameAs: sameAs(changePassword.value.new_password) },
    }
});

const rulesUsername = computed(() => {
    return {
        username: { required }
    }
})
// Create Validation with rules
const v$ = useVuelidate(rulesPassword, changePassword);
const u$ = useVuelidate(rulesUsername, tempUsername.value);

const updatePassword = async () => {
    await v$.value.$validate();

    if (!v$.value.$error) {
        const passwords = {
            old_password: changePassword.value.old_password,
            new_password: changePassword.value.new_password
        }
        try {
            const response: AxiosResponse = await axiosUser.patch('user/edit/password', passwords);
            resetPassword();
            response.data.affected === 1 ? toast.success('Password updated successfully') : toast.error('Something went wrong.');
        } catch (err: any) {
            toast.error(err.response.data.error)
        }
        deactivateChangePasswordModal()
    }
}

const resetPassword = () => {
    changePassword.value.confirm_password = '';
    changePassword.value.new_password = '';
    changePassword.value.old_password = '';
}

</script>

<style scoped></style>