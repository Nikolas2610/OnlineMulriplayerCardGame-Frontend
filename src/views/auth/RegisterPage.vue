<template>
    <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-dark">
        <div class="container py-20">
            <div class="sm:mx-auto sm:w-full sm:max-w-lg">
                <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-white">Register to Join our <br><span
                        class="text-primary">Creative Gave</span></h2>
            </div>
            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="bg-primary py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form class="space-y-6" action="#" method="POST">
                        <div>
                            <label for="email" class="block text-sm font-medium text-white">Username</label>
                            <div class="mt-1">
                                <input id="username" name="username" type="text"
                                    class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm" />
                            </div>
                        </div>
                        <div>
                            <label for="email" class="block text-sm font-medium text-white">Email address</label>
                            <div class="mt-1">
                                <input id="email" name="email" type="email"
                                    class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <label for="password" class="block text-sm font-medium text-white">Password</label>
                            <div class="mt-1">
                                <input id="password" name="password" type="password"
                                    class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm" />
                            </div>
                        </div>
                        <div>
                            <label for="confirmPassword" class="block text-sm font-medium text-white">Confirm
                                Password</label>
                            <div class="mt-1">
                                <input id="confirmPassword" name="confirmPassword" type="password"
                                    class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                class="mt-14 flex w-full justify-center rounded-md border border-transparent bg-dark py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>