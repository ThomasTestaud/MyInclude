<template>
  <div v-if="companyStore.loading" class="text-lg text-center">
    <span class="visually-hidden">Loading...</span>
  </div>
  <main v-else class="p-6 w-full">
    <div class="flex justify-end mb-4">
      <RouterLink class="btn-1 mr-2" :to="'/company/tasks/' + userStore.user.company_id">
        Gérer les tâches
      </RouterLink>
      <CreateEmployee />
    </div>
    <div class="card mb-6 flex py-6 px-10">
      <div class="relative mr-6 w-32 h-32 z-10">
        <img :src="apiStore.url + '/public/companies/' + companyStore.company.avatar" alt="Company Avatar"
          class="w-full h-full rounded-full object-cover">
        <UploadAvatarCompany />
      </div>
      <div>
        <h2 class="text-2xl font-bold mb-4">{{ companyStore.company.name }}</h2>
        <p class="text-gray-600 mb-2">Email: {{ companyStore.company.email }}</p>
        <p class="text-gray-600 mb-2">Address: {{ companyStore.company.address }}</p>
        <p class="text-gray-600 mb-2">Phone: {{ companyStore.company.phone }}</p>
      </div>
    </div>
    <h3 class="text-lg font-bold mt-4 mb-4">Employés :</h3>
    <div v-if="companyStore.company.employees.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

      <button v-for="employee in companyStore.company.employees" @click="goToEmplyee(employee.id)" :key="employee.id">
        <EmployeeCard :employee="employee" class="p-6" />
      </button>

    </div>
    <div v-else>
      <p class="text-lg text-center">Aucun employés pour cette entreprise...</p>
    </div>
  </main>

</template>

<script setup>
import axios from 'axios'
import { ref, watchEffect } from 'vue'
import { useCompanyStore } from '@/stores/company'
import { useUserStore } from '../stores/User';
import CreateEmployee from '../components/companys/CreateEmployee.vue';
import UploadAvatarCompany from '../components/companys/UploadAvatarCompany.vue';
import { useApiStore } from '@/stores/api';
import { useRouter } from 'vue-router'
import EmployeeCard from '../components/UI/EmployeeCard.vue'

const router = useRouter()

const companyStore = useCompanyStore()
const apiStore = useApiStore()
const userStore = useUserStore()

const props = defineProps({
  id: String
})


const goToEmplyee = (id) => {
  router.push('/dashboard/' + Number(id));
}

watchEffect(() => {
  companyStore.loading = true;
  if (props.id) {
    companyStore.getCompany(props.id)
  }
})
</script>
