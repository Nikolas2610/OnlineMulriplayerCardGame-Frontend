<template>
    <label class="block text-sm font-medium mb-1">Game</label>
    <Multiselect v-model="selectedGame" mode="tag" :close-on-select="true" :searchable="true" :create-option="true"
        :groups="true" :options="options" @change="$emit('update', selectedGame)" />
    <div v-for="error in errors" :key="error.$uid" class="text-rose-700 text-base font-medium mt-1 px-2">
        {{ error.$message }}
    </div>
</template>

<script setup lang="ts">
import Multiselect from '@vueform/multiselect'
import { ref, onMounted, type StyleValue } from 'vue';

const props = defineProps({
    input: { required: false },
    publicGames: { type: Array<{ value: Number, label: String }>, require: true },
    userGames: { type: Array<{ value: Number, label: String }>, require: true },
    errors: { type: Object, required: false }
});
const emits = defineEmits(['update'])
const selectedGame = ref();
onMounted(() => {
    if (props.input) {
        selectedGame.value = props.input;
    } else {
        if (props.userGames) {
            selectedGame.value = props.userGames[0]?.value
        }
    }
})

const options = ref([
    {
        label: 'User',
        options: props.userGames,
    },
    {
        label: 'Public',
        options: props.publicGames,
    },
])
</script>

<style src="@vueform/multiselect/themes/default.css">

</style>