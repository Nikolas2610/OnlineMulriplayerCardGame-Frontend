<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from './components/Footer.vue';
import { onMounted, ref } from 'vue';
import { useUserStore } from './stores/UserStore'
import { Roles } from './types/Roles.enum';

const userStore = useUserStore();
const isModalOpen = ref<Boolean>(false);

// Get the JWT token from local storage if user close the browser 
onMounted(() => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    if (token) {
      userStore.decodeToken(token);
    }
  } else {
    const id = localStorage.getItem('id')
    const username = localStorage.getItem('username')
    if (id && username) {
      userStore.user.id = parseInt(id);
      userStore.user.username = username;
      userStore.user.role = Roles.guest;
    }
  }
})

// Open Modal
const activeModal = () => {
  isModalOpen.value = true;
}

// Close modal
const deactiveteModal = () => {
  isModalOpen.value = false;
}
</script>

<template>
  <NavBar />
  <RouterView />
  <Footer v-if="userStore.isGuest" />
</template>
