<template>
  <main class="w-full">
    <div class="mb-6 flex justify-end">
      <CreateCompany />
    </div>
    <div class="text-center">

      <template v-for="company in companyStore.companies">
        <button @click="goToCompany(company.id)"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1">
          <p>{{ company.name }}</p>
          <p>{{ company.email }}</p>
        </button>
      </template>

    </div>
  </main>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useCompanyStore } from '@/stores/company'
import CreateCompany from '../components/companys/CreateCompany.vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const companyStore = useCompanyStore()

companyStore.getCompanies()

const goToCompany = (id) => {
  console.log(id);
  router.push('/company/' + id);
}



</script>



