<template>
    <div class="flex flex-col justify-between h-full">
        <ul class="h-full border border-gray-300 rounded-lg bg-gray-100 mb-4 pt-1">
            <li v-for="task in dashboardStore.tasks" class="mx-1 rounded-lg mb-2 bg-white">
               
                <div class="flex justify-between bg-gray-300 text-sm text-gray-500 px-1 rounded-t-lg"> 
                    <p>As: {{ task.as }}</p>
                    <p>
                        {{ formatDate(task.due_date) }}
                    </p>
                </div>
                <div class="p-2 text-center text-gray-600">
                    <h3 class="font-semibold">{{ task.title }}</h3>
                    <p class="text-sm">{{ task.description }}</p>
                </div>
            </li>
        </ul>
        <CreateTask />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDashboardStore } from '../../stores/Dashboard';
import CreateTask from './CreateTask.vue';


const dashboardStore = useDashboardStore();

const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
};

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
});
</script>

