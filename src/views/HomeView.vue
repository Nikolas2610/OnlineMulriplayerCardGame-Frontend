<template>
  <section class="bg-dark" style="height: calc(100vh - 3.8rem)">
    <div class="container h-full">
      <div class="grid lg:grid-cols-2 grid-cols-1 h-full">
        <div class="col-span-1 h-100 flex items-center justify-center mt-10 lg:mt-0">
          <div class="box pr-15">
            <div class="text-white text-7xl mb-2">Online Multiplayer</div>
            <div class="text-primary text-6xl mb-10">Card Game</div>
            <p class="text-gray-400 text-xl mb-10">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil ea
              quasi
              laboriosam
              aspernatur fugit voluptas. Tenetur nam, natus a!</p>
            <div class="sm:flex sm:justify-center lg:justify-start">
              <div class="rounded-md shadow">
                <RouterLink :to="{ name: userStore.authToken ? 'lobby' : 'register' }"
                  class="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-secondary md:py-4 md:px-10 md:text-lg">
                  Get started
                </RouterLink>
              </div>
              <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <RouterLink :to="{ name: userStore.authToken ? 'lobby' : 'login' }"
                  class="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-primary hover:bg-secondary hover:text-white md:py-4 md:px-10 md:text-lg">
                  Play
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-1 flex items-center justify-center h-full">
          <img class="h-4/5" src="@/assets/images/cards.svg" alt="">
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/UserStore';

const userStore = useUserStore();
</script>

<style lang="scss" scoped>

</style>