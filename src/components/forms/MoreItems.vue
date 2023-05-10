<template>
    <SubTitle class="mt-4">
        {{ title }}
        <template v-slot:button>
            <PrimaryButton :title="buttonTitle" @click="$emit('addItem'); gameStore.stepFormChange();"></PrimaryButton>
        </template>
    </SubTitle>

    <Flex items="end" justify="center" :gap="4" v-for="(item, index) in items" :key="index"
        v-if="items.length > 0" class="mb-3">
        <div class="w-11/12">
            <InputField :title="itemsTitle" :input="item.name" :disabled="disableItem(index)"
                @change="(value) => $emit('update', value, index)" />
        </div>
        <div class="w-1/12 text-right">
            <RemoveButton v-if="!disableItem(index)" @click="$emit('deleteItem', index); gameStore.stepFormChange();"
                class="mt-4" />
        </div>
    </Flex>

    <Alert class="my-2" v-else>
        {{ message }}
    </Alert>
</template>

<script setup lang="ts">
import InputField from '@/components/ui/InputField.vue';
import { useGameStore } from '@/stores/GameStore';
import PrimaryButton from '../buttons/PrimaryButton.vue';
import RemoveButton from '../buttons/RemoveButton.vue';
import SubTitle from '../SubTitle.vue';
import Alert from '../ui/Alert.vue';
import Flex from '../wrappers/Flex.vue';

const props = defineProps({
    errors: { type: Object },
    items: { type: Array<{ name: string }>, required: true },
    itemsTitle: { type: String, required: true },
    disabledItems: { type: Boolean, default: false },
    countDisabledItems: { type: Number, default: 1 },
    title: { type: String },
    message: { type: String },
    buttonTitle: { type: String, required: true },
});

const gameStore = useGameStore();
const emits = defineEmits(['deleteItem', 'update', 'addItem']);
const disableItem = (index: number) => {
    return props.disabledItems && (index < props.countDisabledItems);
}
</script>