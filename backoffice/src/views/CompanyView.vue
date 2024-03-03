<template>
  <main class="p-6 w-full">
    <CreateEmployee />
    <div class="bg-white shadow rounded-lg p-6 mb-6 flex">
      <div class="relative mr-6 w-32 h-32 z-10">
        <img :src="apiStore.url + '/public/companies/' + companyStore.company.avatar" alt="Company Avatar" class="w-full h-full rounded-full">
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
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="employee in companyStore.company.employees" :key="employee.id" class="bg-white shadow rounded-lg p-4 flex flex-col items-center">
        <img :src="'../src/assets/' + employee.avatar" alt="Employee Avatar" class="w-24 h-24 rounded-full mb-4">
        <h4 class="text-xl font-bold mb-2">{{ employee.first_name }} {{ employee.last_name }}</h4>
        <p class="text-gray-600 text-sm mb-1">Email: {{ employee.email }}</p>
        <p class="text-gray-600 text-sm mb-1">Position: {{ employee.position }}</p>
      </div>
    </div>
</main>

</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useCompanyStore } from '@/stores/company'
import CreateEmployee from '../components/companys/CreateEmployee.vue';
import UploadAvatarCompany from '../components/companys/UploadAvatarCompany.vue';
import { useApiStore } from '@/stores/api';

const companyStore = useCompanyStore()
const apiStore = useApiStore()

const props = defineProps({
  id: Number 
})

companyStore.getCompany(props.id);
</script>

