<template>
    <button @click="openForm" class="btn-1">
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
                    <button type="submit" class="btn-1">
                        Assigner la tâche
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
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
  const repsonse = await apiStore.get('/task/company/' + dashboardStore.user.company_id);
  //console.log(repsonse)
  data.value = repsonse.tasks
}

watchEffect(() => {
    if(dashboardStore.user.company_id) {
        getGroupTasks()
    }
})

const sendForm = async () => {
    const object = {
        task_id: chosenTask.value.map(task => task.id),
        due_date: dueDate.value
    };
    console.log(object);
    const response = await apiStore.post('/task/assign/' + dashboardStore.user.id, object);
    dashboardStore.getDashboard(dashboardStore.user.id);
    
    //console.log(response);
    closeForm();
}

</script>
