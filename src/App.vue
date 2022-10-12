<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { onMounted } from 'vue';
import { useUserStore } from './stores/UserStore'
import type { Store } from 'pinia';
const userStore = useUserStore();
onMounted(() => {
  if (localStorage.getItem('token')) {
    userStore.$state.user.token = localStorage.getItem('token');
    userStore.$state.user.username = localStorage.getItem('username');
  }
})
</script>

<template>
  <NavBar/>
  <RouterView />
</template>

<style scoped>

</style>
