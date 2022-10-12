<template>
    <section class="bg-dark">
        <!-- Success Email confirmation -->
        <div class="container py-40">
            <div class="bg-light flex justify-center w-1/2 mx-auto rounded-lg shadow-md shadow-light py-10">
                <div class="block">
                    <div class="logo text-4xl font-bold py-4 text-center">
                        OMCD
                    </div>
                    <div class="text-2xl font-semibold py-4 text-center text-primary">
                        Your registration is complete. <br> Are you ready to create your own game?
                    </div>
                    <div class="flex justify-center py-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-check-circle w-1/4 fill-primary"
                            viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path
                                d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                        </svg>
                    </div>
                    <div class="flex justify-center py-4">
                        <RouterLink :to="{ name: 'login'}" type="button"
                            class="text-white bg-primary hover:bg-secondary w-2/3 transition duration-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0">
                            Login
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
        <!-- Token Expire -->
        <div class="container py-40">
            <div class="bg-white flex justify-center w-1/2 mx-auto rounded-lg shadow-md shadow-gray-500 py-10 px-8">
                <div class="block">
                    <div class="logo text-4xl font-bold py-4 text-center">
                        OMCD
                    </div>
                    <div class="text-2xl font-semibold py-4 text-center text-cyan-400">
                        Your Token has expired. <br>A new email has send to your email activate your account.
                    </div>
                    <div class="flex justify-center py-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-info-circle w-1/4 fill-cyan-400"
                            viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path
                                d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <!-- Email not exists | Wrong Token -->
        <div class="container py-40">
            <div class="bg-red-200 flex justify-center w-1/2 mx-auto rounded-lg shadow-md shadow-red-300 py-10 px-8">
                <div class="block">
                    <div class="logo text-4xl font-bold py-4 text-center">
                        OMCD
                    </div>
                    <div class="text-2xl font-semibold py-4 text-center text-red-500">
                        This token is not exists. <br>If you want to login, please create an account!
                    </div>
                    <div class="flex justify-center py-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-x-circle w-1/4 fill-red-500"
                            viewBox="0 0 16 16">
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
        </div>
        <!-- Server error -->
        <div class="container py-40">
            <div class="bg-red-200 flex justify-center w-1/2 mx-auto rounded-lg shadow-md shadow-red-300 py-10 px-8">
                <div class="block">
                    <div class="logo text-4xl font-bold py-4 text-center">
                        OMCD
                    </div>
                    <div class="text-2xl font-semibold py-4 text-center text-red-500">
                        Something went wrong. <br>Please try again in a few minutes.
                    </div>
                    <div class="flex justify-center py-4">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="bi bi-server fill-red-500 w-1/4" viewBox="0 0 16 16">
                            <path
                                d="M1.333 2.667C1.333 1.194 4.318 0 8 0s6.667 1.194 6.667 2.667V4c0 1.473-2.985 2.667-6.667 2.667S1.333 5.473 1.333 4V2.667z" />
                            <path
                                d="M1.333 6.334v3C1.333 10.805 4.318 12 8 12s6.667-1.194 6.667-2.667V6.334a6.51 6.51 0 0 1-1.458.79C11.81 7.684 9.967 8 8 8c-1.966 0-3.809-.317-5.208-.876a6.508 6.508 0 0 1-1.458-.79z" />
                            <path
                                d="M14.667 11.668a6.51 6.51 0 0 1-1.458.789c-1.4.56-3.242.876-5.21.876-1.966 0-3.809-.316-5.208-.876a6.51 6.51 0 0 1-1.458-.79v1.666C1.333 14.806 4.318 16 8 16s6.667-1.194 6.667-2.667v-1.665z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>

</style>