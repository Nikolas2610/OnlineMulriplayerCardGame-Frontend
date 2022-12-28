<template>
    <div class="container w-full overflow-x-auto px-2">
        <!-- Title -->
        <div class="w-3/12">
            <div class="text-2xl border-b-4 border-primary py-4 px-2">
                My Personal Info
            </div>
        </div>

        <!-- Username -->
        <div class="flex justify-center mt-10">
            <div class="w-6/12 bg-dark rounded-lg p-4">
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
                    <button @click="activeteChangeUsernameModal"
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

    <Modal :modalOpen="changeUsernameModal" @closeModal="deactiveteChangeUsernameModal">
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
            <button @click="updateUsername"
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-primary text-white px-8 py-3 text-base font-medium hover:bg-secondary hover:text-white md:py-3 md:px-10 md:text-lg">
                Update Username
            </button>
            <button
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-400 px-8 py-3 text-base font-medium text-white hover:bg-gray-600 hover:text-white md:py-3 md:px-10 md:text-lg ml-2">
                Cancel
            </button>
        </template>
    </Modal>

    <Modal :modalOpen="changePasswordModal" @closeModal="deactiveteChangePasswordModal">
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
            <button @click="updatePassword"
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-primary text-white px-8 py-3 text-base font-medium hover:bg-secondary hover:text-white md:py-3 md:px-10 md:text-lg">
                Update Password
            </button>
            <button
                class="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-400 px-8 py-3 text-base font-medium text-white hover:bg-gray-600 hover:text-white md:py-3 md:px-10 md:text-lg ml-2">
                Cancel
            </button>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/UserStore';
import { computed, ref } from 'vue';
import Modal from '@/components/Modal.vue';
import { helpers, required, minLength, email, sameAs } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import axiosUser from '@/plugins/axiosUser';
import type { AxiosResponse } from 'axios';
import { useToast } from "vue-toastification";

const toast = useToast();
const changeUsernameModal = ref(false);
const changePasswordModal = ref(false);
const userStore = useUserStore();
const user = computed(() => userStore.$state.user);
const tempUsername = ref({
    username: '' as string | null
});
const changePassword = ref({
    old_password: 'Nikolas-9',
    new_password: 'Nikolas-0',
    confirm_password: 'Nikolas-0'
})

const deactiveteChangeUsernameModal = () => {
    changeUsernameModal.value = false;
}

const activeteChangeUsernameModal = () => {
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
                toast.success('Username updated succesfully');
                deactiveteChangeUsernameModal();
                return
            }
            toast.error('Something went wrong.');
        } catch (err: any) {
            toast.error(err.response.data.error)
        }
    }
}

// Change Password Section

const deactiveteChangePasswordModal = () => {
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
            response.data.affected === 1 ? toast.success('Password updated succesfully') : toast.error('Something went wrong.');
        } catch (err: any) {
            toast.error(err.response.data.error)
        }
        deactiveteChangePasswordModal()
    }
}

const resetPassword = () => {
    changePassword.value.confirm_password = '';
    changePassword.value.new_password = '';
    changePassword.value.old_password = '';
}

</script>

<style scoped>

</style>