<template>

  <main class="p-6 w-full min-h-screen bg-gray-100">

    <div v-if="data !== null" class="border rounded-lg bg-white p-4 mb-4">
      <div class="flex w-full justify-between pb-4 items-center">
        <h2 class="text-lg font-semibold">Toutes les tâches de l'entreprise</h2>
        <CreateTask :id="props.id" />
      </div>
      <div class="bg-gray-200 rounded-lg p-1 border max-h-80 overflow-y-auto">
        <TaskCard v-for="task in data.tasks" :task="task" />
      </div>
    </div>

    <div v-if="data !== null" class="border rounded-lg bg-white p-4">
      <div class="flex w-full justify-between pb-4 items-center">
        <h2 class="text-lg font-semibold">Toutes les groupes de tâches</h2>
      </div>
      <div class="bg-gray-200 rounded-lg p-1 border max-h-80 overflow-y-auto">
        <div v-for="group in data.groupTasks" class="border rounded-lg p-4 bg-white mb-1 relative cursor-pointer">
          <div class="w-full flex items-center justify-center">
            <span>{{ group.name }}</span>
          </div>
        </div>
      </div>
    </div>

  </main>

</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import CreateTask from '../components/companyTask/CreateTask.vue';
import TaskCard from '../components/companyTask/TaskCard.vue';
import { useCompanyStore } from '@/stores/company'
import { useApiStore } from '@/stores/api';
import { useRouter } from 'vue-router'

const router = useRouter()
const companyStore = useCompanyStore()
const apiStore = useApiStore()

const props = defineProps({
  id: Number
})

const data = ref(null)

const getGroupTasks = async () => {
  const repsonse = await apiStore.get('/task/company/' + props.id);
  console.log(repsonse)
  data.value = repsonse
}

onMounted(() => {
  getGroupTasks()
})

</script>
