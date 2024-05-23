<template>
    <div class="flex flex-col items-center card">
        <img :src="apiStore.url + '/public/users/' + props.employee.avatar" alt="Employee Avatar" class="w-[100px] h-[100px] rounded-full mb-4 object-cover">
        <h4 class="text-xl font-bold mb-2">{{ props.employee.first_name }} {{ props.employee.last_name }}</h4>
        <p class="text-gray-600 text-sm mb-1">Email: {{ props.employee.email }}</p>
        <p class="text-gray-600 text-sm mb-1">Position: {{ props.employee.position }}</p>
    </div>
</template>

<script setup>
import { useApiStore } from '../../stores/Api';

const apiStore = useApiStore()

const props = defineProps({
  employee: Object 
})

</script>