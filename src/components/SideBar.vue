<template>
    <div class="flex flex-no-wrap" style="height: calc(100vh - 3.8rem)">
        <div class="w-64 absolute sm:relative bg-dark shadow md:h-full flex-col justify-between hidden sm:flex">
            <div class="px-8">
                <div class="w-full flex items-center text-white text-lg mt-12">
                    {{ user.username }}
                </div>
                <div class="w-full flex items-center text-white text-base mt-1">
                    {{ user.email }}
                </div>
                <ul class="mt-12">
                    <RouterLink :to="{ name: item.router }" v-for="(item, index) in menuItems" :key="index" class="w-full focus:outline-none focus:ring-0 flex justify-between cursor-pointer items-center py-4 px-3  rounded-lg
                        hover:bg-primary hover:text-white transition duration-300rounded-xl"
                        :class="router.currentRoute.value.name === item.router ? 'bg-primary text-white' : 'text-gray-400'">
                        <li class="flex">
                            <img :src="item.icon">
                            <span class="text-sm ml-2">{{ item.name }}</span>
                        </li>
                    </RouterLink>
                </ul>
            </div>
        </div>
        <!-- Mobile Sidebar -->
        <div class="w-64 z-40 absolute bg-dark shadow md:h-full flex-col justify-between sm:hidden transition duration-150 ease-in-out"
            style="height: calc(100vh - 3.8rem)" id="mobile-nav">
            <button aria-label="toggle sidebar" id="openSideBar"
                class="h-10 w-10 bg-dark absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 rounded focus:ring-dark"
                @click="sidebarHandler(true)">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-adjustments" width="20"
                    height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <circle cx="6" cy="10" r="2" />
                    <line x1="6" y1="4" x2="6" y2="8" />
                    <line x1="6" y1="12" x2="6" y2="20" />
                    <circle cx="12" cy="16" r="2" />
                    <line x1="12" y1="4" x2="12" y2="14" />
                    <line x1="12" y1="18" x2="12" y2="20" />
                    <circle cx="18" cy="7" r="2" />
                    <line x1="18" y1="4" x2="18" y2="5" />
                    <line x1="18" y1="9" x2="18" y2="20" />
                </svg>
            </button>
            <button aria-label="Close sidebar" id="closeSideBar"
                class="hidden h-10 w-10 bg-dark absolute right-0 mt-16 flex -mr-10 items-center shadow rounded-tr rounded-br justify-center cursor-pointer text-white"
                @click="sidebarHandler(false)">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="20" height="20"
                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
            <div class="px-8">
                <div class="w-full flex items-center text-white text-lg mt-12">
                    {{ user.username }}
                </div>
                <div class="w-full flex items-center text-white text-base mt-1">
                    {{ user.email }}
                </div>
                <ul class="mt-12">
                    <RouterLink :to="{ name: item.router }" v-for="(item, index) in menuItems" :key="index" class="w-full focus:outline-none focus:ring-0 flex justify-between cursor-pointer items-center py-4 px-3  rounded-lg
                        hover:bg-primary hover:text-white transition duration-300rounded-xl"
                        :class="router.currentRoute.value.name === item.router ? 'bg-primary text-white' : 'text-gray-400'">
                        <li class="flex">
                            <img :src="item.icon">
                            <span class="text-sm ml-2">{{ item.name }}</span>
                        </li>
                    </RouterLink>
                </ul>
            </div>
        </div>
        <!-- Sidebar ends -->
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/UserStore'
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
const userStore = useUserStore();

const router = useRouter();
console.log(router.currentRoute.value.name);

const user = computed(() => userStore.$state.user);

// Menu list items
const menuItems = ref([
    { name: 'Dashboard', icon: '/src/assets/icons/sidebar/dashboard.svg', router: 'overview' },
    { name: 'Games', icon: '/src/assets/icons/sidebar/games.svg', router: 'games' },
    { name: 'Tables', icon: '/src/assets/icons/sidebar/tables.svg', router: 'tables' },
    { name: 'Decks', icon: '/src/assets/icons/sidebar/decks.svg', router: 'decks' },
    { name: 'Cards', icon: '/src/assets/icons/sidebar/cards.svg', router: 'cards' },
    { name: 'Settings', icon: '/src/assets/icons/sidebar/settings.svg', router: 'settings' },
])

// Open Sidebar at mobile
const sidebarHandler = (flag: any) => {
    const sideBar = document.getElementById("mobile-nav");
    const openSidebar = document.getElementById("openSideBar");
    const closeSidebar = document.getElementById("closeSideBar");

    if (flag) {
        if (sideBar) {
            sideBar.style.transform = "translateX(0px)";
        }
        if (openSidebar) {
            openSidebar.classList.add("hidden");
        }
        if (closeSidebar) {
            closeSidebar.classList.remove("hidden");
        }
    } else {
        if (sideBar) {
            sideBar.style.transform = "translateX(-260px)";
        }
        if (openSidebar) {
            openSidebar.classList.remove("hidden");
        }
        if (closeSidebar) {
            closeSidebar.classList.add("hidden");
        }
    }
}

</script>

<style lang="scss" scoped>
#mobile-nav {
    transform: translateX(-260px);
}
</style>