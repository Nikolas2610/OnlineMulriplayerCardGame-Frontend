<template>
    <div class="mx-auto mt-4">
        <div class="flex flex-col">
            <div class="overflow-x-auto shadow-md sm:rounded-lg">
                <div class="inline-block min-w-full align-middle">
                    <div class="overflow-hidden ">
                        <table class="min-w-full divide-y table-fixed divide-gray-700">
                            <thead class="bg-gray-700">
                                <tr>
                                    <th scope="col" v-for="(title, index) in tableHeaders" :key="index"
                                        class="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-gray-400">
                                        {{ title }}
                                    </th>
                                    <th scope="col" class="p-4" v-if="actions">
                                        <span class="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y bg-dark divide-gray-700">
                                <slot></slot>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    tableHeaders: { type: Array<String>, required: true },
    actions: { type: Boolean, default: false },
})
</script>