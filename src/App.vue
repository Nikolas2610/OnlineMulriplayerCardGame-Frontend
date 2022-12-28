<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { onMounted, ref } from 'vue';
import { useUserStore } from './stores/UserStore'
import Modal from '@/components/Modal.vue'

const userStore = useUserStore();
const isModalOpen = ref<Boolean>(false);

// Get the JWT token from localstage if user close the browser 
onMounted(() => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    if (token) {
      userStore.decodeToken(token);
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
  <RouterView @openModal="activeModal()" />
  <Teleport to="#modal">
    <Modal :modalOpen="isModalOpen" @closeModal="deactiveteModal" />
  </Teleport>
</template>

<style scoped>

</style>
