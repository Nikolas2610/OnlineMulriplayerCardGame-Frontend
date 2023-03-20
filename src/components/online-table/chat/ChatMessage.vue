<template>
    <Flex :justify="isActiveUserMessage ? 'start' : 'end'">
        <Flex class="py-2 px-4 rounded-3xl w-96" :class="isActiveUserMessage ? 'bg-primary' : 'bg-light-blue'" :column="true">
            <span class="font-bold text-dark">{{ data?.user.username }}:</span> 
            <div>
                {{ data?.message }}
            </div>
            <div class="text-gray-800 text-sm text-right">
                {{ data?.created_at }}
            </div>
        </Flex>
    </Flex>
</template>

<script setup lang="ts">
import Flex from '@/components/wrappers/Flex.vue';
import type { Message } from '@/types/online-table/Message';
import type { PropType } from 'vue';

const props = defineProps({
    isActiveUserMessage: { type: Boolean, default: false },
    data: { type: Object as PropType<Message>}
})
</script>
