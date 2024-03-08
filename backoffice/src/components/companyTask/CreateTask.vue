<template>
    <button @click="openForm" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Créer une tâche
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
            <form @submit.prevent="createTask" class="space-y-6">
                <div>
                    <label :for="'title'" class="block text-sm font-medium text-gray-700">Titre :</label>
                    <input v-model="newTask['title_1']" :id="'title'" :name="'title'" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
                <div>
                    <div>
                        <label :for="'groupTask'" class="block text-sm font-medium text-gray-700">À quel groupe cette tache apartient-elle ?</label>
                        <select v-model="groupTaskId" :id="'groupTaskId'" :name="'groupTaskId'" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option v-for="task in groupTask" :value="task.id">{{ task.name }}</option>
                        </select>
                    </div>

                    <div>
                        <label :for="'description_1'" class="block text-sm font-medium text-gray-700">Description à destination de l'employé :</label>
                        <textarea v-model="newTask['description_1']" :id="'description_1'" :name="'description_1'" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                    </div>

                    <div>
                        <label :for="'description_2'" class="block text-sm font-medium text-gray-700">Description à destination du Mentor :</label>
                        <textarea v-model="newTask['description_2']" :id="'description_2'" :name="'description_2'" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                    </div>

                    <div>
                        <label :for="'description_3'" class="block text-sm font-medium text-gray-700">Description à destination du Capt'M :</label>
                        <textarea v-model="newTask['description_3']" :id="'description_3'" :name="'description_3'" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                    </div>
                    

                </div>

                <div>
                    <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Create Task
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

const dashboardStore = useDashboardStore();
const apiStore = useApiStore();
const isFormOpen = ref(false);
const groupTask = ref([]);
const groupTaskId = ref(0);

const props = defineProps({
    id: Number
});

const openForm = () => {
    isFormOpen.value = true;
};

const closeForm = () => {
    isFormOpen.value = false;
};

const newTask = ref({
    title_1: '',
    description_1: '',
    description_2: '',
    description_3: '',
});

const createTask = async () => {
    // Hide form first
    isFormOpen.value = false;
    // Construct task object based on newTask ref
    const task = {
        title: newTask.value.title_1,
        description_1: newTask.value.description_1,
        description_2: newTask.value.description_2,
        description_3: newTask.value.description_3,
        group_task_id: groupTaskId.value
    };
    // Add your API call here to create the task
    console.log(task);
    apiStore.post('/task', task).then((response) => {
        console.log(response);
        getGroupTasks();
    });
};

const getGroupTasks = async () => {
    console.log(props.id);
    apiStore.get('/task/group/' + props.id).then((response) => {
        console.log(response);
        groupTask.value = response;
    });
};

onMounted(() => {
    getGroupTasks();
});
</script>
