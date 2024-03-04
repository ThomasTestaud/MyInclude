<template>
    <div>
        <ul>
            <li v-for="task in props.data" :key="task.id" class="border rounded-lg mb-2 ">
                <p class="text-right bg-gray-100 text-sm text-gray-500 px-1 rounded-t-lg"> {{ formatDate(task.due_date) }}</p>
                <div class="p-2 text-center text-gray-600">
                    <h3>{{ task.title }}</h3>
                    <p>{{ task.description }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';

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

