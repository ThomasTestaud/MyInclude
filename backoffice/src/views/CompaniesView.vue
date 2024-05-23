<template>
  <main class="w-full">
    <div class="mb-6 flex justify-end">
      <CreateCompany />
    </div>
    <div class="text-center">

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <button v-for="company in companyStore.companies" @click="goToCompany(company.id)"
          class="flex flex-col items-center card p-4">
          <img :src="apiStore.url + '/public/companies/' + company.avatar" alt="company Avatar"
            class="w-[100px] h-[100px] rounded-full mb-4">
          <h4 class="text-xl font-bold mb-2">{{ company.name }}</h4>
        </button>
      </div>

    </div>
  </main>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useCompanyStore } from '@/stores/company'
import CreateCompany from '../components/companys/CreateCompany.vue';
import { useRouter } from 'vue-router'
import { useApiStore } from '@/stores/api';

const router = useRouter()

const companyStore = useCompanyStore()
const apiStore = useApiStore()

companyStore.getCompanies()

const goToCompany = (id) => {
  console.log(id);
  router.push('/company/' + id);
}



</script>
