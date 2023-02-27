<template>
    <label class="block text-sm font-medium mb-1">Decks</label>
    <Multiselect v-model="gameStore.createGame.selectedDecks" mode="tags" :close-on-select="false" :searchable="true" @change="gameStore.stepFormChange()"
        :create-option="true" :groups="true" :options="options" />
    <div class="text-rose-700 text-base font-medium mt-1 px-2" v-if="errorMessage">
        {{ errorMessage }}
    </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/GameStore';
import Multiselect from '@vueform/multiselect'
import { ref, watch } from 'vue';

const gameStore = useGameStore();
const props = defineProps({
    publicDecks: { type: Array, require: true },
    userDecks: { type: Array, require: true },
    error: { Type: String || null, required: false }
})
const errorMessage = ref(props.error);
const submitted = ref(false);

const options = ref([
    {
        label: 'User',
        options: props.userDecks,
    },
    {
        label: 'Public',
        options: props.publicDecks,
    },
])
watch(() => gameStore.createGame.selectedDecks,
    () => {
        if (errorMessage.value) {
            errorMessage.value = null;
            return
        }
        if (submitted.value && !gameStore.validateEmptyDecks) {
            errorMessage.value = 'You have to choose at lease one deck'
        }

    })
watch(() => props.error,
    () => {
        errorMessage.value = props.error
        submitted.value = true;
    })
</script>

<style src="@vueform/multiselect/themes/default.css">

</style>