<template>
    <button @click="openForm" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Assigner une tache à cet employé
    </button>

    <div v-if="isFormOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
        <div class="w-10/12 mx-auto bg-white p-6 rounded-md shadow-md">
            <div class="flex justify-end">
                <button @click="closeForm" class="text-gray-400 hover:text-gray-500">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <form @submit.prevent="sendForm()" class="space-y-6" v-if="data">

                <div>
                    <label :for="'dueDate'" class="block text-sm font-medium text-gray-700">Date de fin :</label>
                    <input v-model="dueDate" :id="'dueDate'" :name="'dueDate'" type="date" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
                
                <div v-for="task in data">
                    <input type="checkbox" :id="task.id" v-model="chosenTask" :value="task">
                    <label :for="task.id">{{ task.title }}</label>
                </div>


                <div>
                    <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Assigner la tâche
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useDashboardStore } from '../../stores/Dashboard';
import { useApiStore } from '../../stores/Api';

const apiStore = useApiStore();
const isFormOpen = ref(false);
const data = ref(null);
const dashboardStore = useDashboardStore();
const chosenTask = ref([]);
const dueDate = ref(null);

const openForm = () => {
    isFormOpen.value = true;
}

const closeForm = () => {
    isFormOpen.value = false;
}

const getGroupTasks = async () => {
  const repsonse = await apiStore.get('/task/company/' + dashboardStore.user.id);
  console.log(repsonse)
  data.value = repsonse.tasks
}

onMounted(() => {
  getGroupTasks()
})

const sendForm = async () => {
    const object = {
        task_id: chosenTask.value.map(task => task.id),
        user_id: dashboardStore.user.id,
        due_date: dueDate.value
    };
    console.log(object);
    const response = await apiStore.post('/task/assign', object);
    
    console.log(response);
    closeForm();
}

</script>
