<template>
    <div class="bg-dark">
        <div class="container flex justify-center items-center" style="height: 93.3vh;">
            <div class="block shadow-2xl p-10 rounded-3xl bg-opacity-5 bg-slate-900">
                <div class="text-9xl text-white mb-8 text-center font-extrabold">
                    4 <span class="text-primary">0</span> 4
                </div>
                <div class="text-6xl text-white  mb-8 text-center">
                    Sorry, page not found
                </div>
                <div class="text-xl text-white  mb-8 text-center">
                    This is a 404 error, which means you 've clicked on a bad link or entered an invalid URL
                </div>
                <div class="flex justify-center">
                    <RouterLink :to="{ name: 'home' }"
                        class="flex items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-secondary md:py-4 md:px-10 md:text-lg w-1/2 text-center">
                    Go to Home Page
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>