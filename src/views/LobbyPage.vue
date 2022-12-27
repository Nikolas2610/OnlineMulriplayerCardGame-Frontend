<template>
    <!-- <div class="text-7xl text-center my-10">
        This is a Lobby Page
    </div>
    <div class="text-primary text-4xl text-center">
        Hello <span class="capitalize font-semibold">{{ userStore.user.username }}</span>
    </div> -->
    <Sidebar />
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/UserStore'
import Sidebar from '@/components/SideBar.vue'
const userStore = useUserStore();

const sidebarHandler = (flag: any) => {
    const sideBar = document.getElementById("mobile-nav");
    const openSidebar = document.getElementById("openSideBar");
    const closeSidebar = document.getElementById("closeSideBar");
    console.log(sideBar);

    if (flag) {
        if (sideBar) {
            console.log(sideBar);

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