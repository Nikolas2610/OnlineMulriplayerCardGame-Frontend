<template>
    <div class="bg-red-200 flex justify-center w-1/2 mx-auto rounded-lg shadow-md shadow-red-300 py-10 px-8">
        <div class="block">
            <div class="logo text-4xl font-bold py-4 text-center">
                OMCD
            </div>
            <div class="text-2xl font-semibold py-4 text-center text-red-500">
                This token is not exists. <br>If you want to login, please create an account!
            </div>
            <div class="flex justify-center py-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-x-circle w-1/4 fill-red-500" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </div>
            <div class="flex justify-center py-4">
                <RouterLink :to="{ name: 'register'}" type="button"
                    class="text-white bg-red-500 hover:bg-red-900 w-2/3 transition duration-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0">
                    Register
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>