<template>
    <button @click="openForm"
        class="btn-1">
        Ajouter un Mentor et un Capt'M à cet employé 
    </button>

    <div v-if="isFormOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
        <div class="w-10/12 mx-auto bg-white p-6 rounded-md shadow-md">
            <div class="flex justify-end">
                <button @click="closeForm" class="text-gray-400 hover:text-gray-500">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>
            <form @submit.prevent="createRelation" class="space-y-6">
                <div>
                    <label for="entity1" class="block text-sm font-medium text-gray-700">Le Mentor :</label>
                    <select v-model="newRelation.entity1" id="entity1" name="entity1" required
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option v-for="user in users1" :value="user.id">{{ user.first_name + " " + user.last_name + " - " + user.position }}</option>
                    </select>
                </div>

                <div>
                    <label for="entity2" class="block text-sm font-medium text-gray-700">Le Capt'M</label>
                    <select v-model="newRelation.entity2" id="entity2" name="entity2" required
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option v-for="user in users2" :value="user.id">{{ user.first_name + " " + user.last_name + " - " + user.position }}</option>
                    </select>
                </div>

                <div>
                    <button type="submit"
                        class="btn-1">
                        Create Relation
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useUserStore } from '../../stores/User';
import { useDashboardStore } from '../../stores/Dashboard';
import { useApiStore } from '../../stores/Api';

const users = ref([]);
const users1 = ref([]);
const users2 = ref([]);
const userStore = useUserStore();
const dashboardStore = useDashboardStore();
const apiStore = useApiStore();
const props = defineProps({
    id: Number
})


const getUsers = async () => {
    users.value = await userStore.getAllUsers(dashboardStore.user.company_id)
    users.value = users.value.filter(item => item.id !== dashboardStore.user.id);
    users1.value = users.value;
    users2.value = users.value;
}


const newRelation = ref({
    entity1: '',
    entity2: '',
})

watchEffect(() => {
    if (newRelation.value.entity1 !== '') {
        users2.value = users.value.filter(item => item.id !== newRelation.value.entity1);
    }
    if (newRelation.value.entity2 !== '') {
        users1.value = users.value.filter(item => item.id !== newRelation.value.entity2);
    }
})


const isFormOpen = ref(false)

const openForm = () => {
    getUsers();
    isFormOpen.value = true
}

const closeForm = () => {
    isFormOpen.value = false
}

const createRelation = async () => {
    isFormOpen.value = false
    const relation = {
        associate_id: dashboardStore.user.id,
        mentor_id: newRelation.value.entity1,
        captain_id: newRelation.value.entity2,
    }
    const responce = await apiStore.post('/relations', relation)
    console.log(relation)
    console.log(responce)
    //dashboardStore.relations = [...dashboardStore.relations, responce];
    dashboardStore.getDashboard(dashboardStore.user.id)
}
</script>