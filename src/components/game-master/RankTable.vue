<template>
    <div v-if="rankStore.tableHeaders.length > 1">
        <Flex justify="between">
            <div class="text-2xl underline underline-offset-4 w-full">
                Rank Table
            </div>
            <PrimaryButtonVue title="Add Points" @click="rankStore.addNewPoints()"
                :disable="rankStore.form.showStoreForm" />
        </Flex>
        <DarkTable :table-headers="rankStore.tableHeaders" class="border border-gray-700 rounded-lg overflow-y-auto"
            :actions="true" v-if="rankStore.rankPoints">
            <DarkTableRow v-for="(row, index) in rankStore.rankPoints" :key="`rankRow-${row}`">
                <DarkTableCell v-for="rank in row" :key="rank.id">
                    <div v-if="index === rankStore.editRow">
                        <InputField :input="rank.title" v-if="rank.title && rank.type === RankType.TITLE"
                            @change="(value) => rank.title = value" :dark-theme="true" />
                        <InputField :input="rank.points ?? 0" v-else type="number"
                            @change="(value: number) => rank.points = value" :dark-theme="true" />
                    </div>
                    <div v-else>
                        {{ rank.type === RankType.TITLE ? rank.title : rank.points }}
                    </div>
                </DarkTableCell>
                <DarkTableCell>
                    <Flex v-if="index === rankStore.editRow">
                        <div class="text-blue-500 cursor-pointer" @click="rankStore._update(index)">Update</div>
                    </Flex>
                    <Flex :gap="4" v-else>
                        <div class="text-blue-500 cursor-pointer" @click="rankStore.editRow = index">Edit</div>
                        <div class="text-red-500 cursor-pointer" @click="rankStore._delete(index)">Delete</div>
                    </Flex>
                </DarkTableCell>
            </DarkTableRow>
            <DarkTableRow v-if="rankStore.form.showStoreForm" class="bg-gray-700">
                <DarkTableCell>
                    <InputField :input="rankStore.form.header.title"
                        @change="(value) => rankStore.form.header.title = value" placeholder="Row title e.g. Round 1"
                        :dark-theme="true" />
                </DarkTableCell>
                <DarkTableCell v-for="item in rankStore.form.newPoints" :key="`new-item-${item.table_user}`">
                    <InputField :input="item.points" type="number" :dark-theme="true"
                        @change="(value) => item.points = value" placeholder="Points" />
                </DarkTableCell>
                <DarkTableCell class="text-red-500 cursor-pointer" @click="rankStore.form.showStoreForm = false">Cancel
                </DarkTableCell>
            </DarkTableRow>
        </DarkTable>
        <Flex justify="center" class="mt-8" :gap="4">
            <PrimaryButtonVue title="Save Changes" :disable="!rankStore.form.showStoreForm" @click="rankStore._store()" />
        </Flex>
    </div>
    <div v-else>
        <div class="text-2xl underline underline-offset-4 w-full">
            Rank Table
        </div>
        <div class="bg-red-500 p-4 my-4 rounded italic">
            The rank table is available when the game start
        </div>
    </div>
</template>

<script setup lang="ts">
import DarkTable from '../table/DarkTable.vue';
import DarkTableRow from '../table/DarkTableRow.vue';
import DarkTableCell from '../table/DarkTableCell.vue';
import PrimaryButtonVue from '../buttons/PrimaryButton.vue';
import Flex from '../wrappers/Flex.vue';
import { useRankStore } from '@/stores/RankStore';
import InputField from '../ui/InputField.vue';
import { RankType } from '@/types/online-table/RankType.enum';

const rankStore = useRankStore();
</script>