<template>
    <nav class="bg-dark border-gray-200 px-2 sm:px-4 py-2.5" style="height: 3.8rem;">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
            <RouterLink :to="{ name: 'home' }" class="flex items-center">
                <span class="self-center text-xl font-semibold whitespace-nowrap text-white hover:text-primary">OMCD</span>
            </RouterLink>
            <div class="flex lg:order-2">
                <RouterLink :to="{ name: 'login' }" type="button" v-if="!userStore.isUser"
                    class="text-white border-primary border hover:bg-primary transition duration-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 lg:mr-0">
                    Login
                </RouterLink>
                <RouterLink :to="{ name: 'register' }" type="button" v-if="!userStore.isUser"
                    class="text-white bg-primary hover:bg-secondary transition duration-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 lg:mr-0 ml-2">
                    Register
                </RouterLink>
                <RouterLink :to="{ name: 'logout' }" type="button">
                    <div v-if="userStore.$state.user.token"
                        class="text-white cursor-pointer bg-primary hover:bg-secondary transition duration-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 lg:mr-0 ml-2">
                        Logout
                    </div>
                </RouterLink>


                <button data-collapse-toggle="navbar-cta" type="button" @click="openNavMenu"
                    class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100"
                    aria-controls="navbar-cta" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
            <div
                class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1 border-t border-b mt-4 lg:border-0 lg:ml-24 lg:mt-0 z-20 bg-dark">
                <ul
                    class="flex flex-col my-4 lg:my-0 rounded-lg lg:flex-row lg:space-x-8 lg:mt-0 lg:text-sm lg:font-medium lg:border-0">
                    <li v-for="{ id, title, path, registerUser } in navbar_items" :key="id" class="cursor-pointer">
                        <RouterLink :to="{ name: path }" v-if="registerUser ? (userStore.authToken ? true : false) : true"
                            class="block py-2 pr-4 pl-3 text-white text-base hover:text-primary hover:bg-white lg:hover:bg-transparent bg-dark rounded lg:bg-transparent lg:p-0"
                            aria-current="page">
                            {{ title }}
                        </RouterLink>
                    </li>
                    <li class="cursor-pointer">
                        <RouterLink :to="{ name: 'admin' }" v-if="userStore.isAdmin"
                            class="block py-2 pr-4 pl-3 text-white text-base hover:text-primary hover:bg-white lg:hover:bg-transparent bg-dark rounded lg:bg-transparent lg:p-0"
                            aria-current="page">
                            Admin
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="hidden justify-between items-center w-full lg:hidden lg:w-auto lg:order-1 border-t border-b lg:border-0 lg:ml-24 lg:mt-0 z-20 bg-dark"
        id="navbar-menu">
        <ul
            class="flex flex-col my-4 lg:my-0 rounded-lg lg:flex-row lg:space-x-8 lg:mt-0 lg:text-sm lg:font-medium lg:border-0">
            <li v-for="{ id, title, path, registerUser } in navbar_items" :key="id" class="cursor-pointer"
                @click="closeNavbar()">
                <RouterLink :to="{ name: path }" v-if="registerUser ? (userStore.authToken ? true : false) : true"
                    class="block py-2 pr-4 pl-3 text-white text-base hover:text-primary hover:bg-white lg:hover:bg-transparent bg-dark rounded lg:bg-transparent lg:p-0"
                    aria-current="page">
                    {{ title }}
                </RouterLink>
            </li>
            <li class="cursor-pointer" @click="closeNavbar()">
                <RouterLink :to="{ name: 'admin' }" v-if="userStore.isAdmin"
                    class="block py-2 pr-4 pl-3 text-white text-base hover:text-primary hover:bg-white lg:hover:bg-transparent bg-dark rounded lg:bg-transparent lg:p-0"
                    aria-current="page">
                    Admin
                </RouterLink>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/UserStore'
const userStore = useUserStore();

const navbar_items = ref([
    // { id: 1, title: 'About', path: 'about', registerUser: false },
    // { id: 2, title: 'Contact', path: 'contact', registerUser: false },
    { id: 3, title: 'Lobby', path: 'lobby', registerUser: false },
    { id: 4, title: 'Dashboard', path: 'dashboard', registerUser: true },
])

const openNavMenu = () => {
    const navbarMenu: HTMLElement | null = document.getElementById('navbar-menu');
    if (navbarMenu) {
        navbarMenu.classList.toggle('hidden');
    }
}

const closeNavbar = () => {
    openNavMenu();
}
</script>