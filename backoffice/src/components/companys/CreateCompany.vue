<template>
  <button @click="openForm"
    class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    Créer une nouvelle entreprise
  </button>

  <div v-if="isFormOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="w-10/12 mx-auto bg-white p-6 rounded-md shadow-md">
      <div class="flex justify-end">
        <button @click="closeForm" class="text-gray-400 hover:text-gray-500">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <form @submit.prevent="createCompany" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Nom</label>
          <input type="text" v-model="newCompany.name" id="name" name="name" required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" v-model="newCompany.email" id="email" name="email" required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>

        <div>
          <label for="address" class="block text-sm font-medium text-gray-700">Adresse</label>
          <input type="text" v-model="newCompany.address" id="address" name="address" required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>

        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700">Téléphone</label>
          <input type="text" v-model="newCompany.phone" id="phone" name="phone" required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>

        <div>
          <button type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Créer l'entreprise
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useCompanyStore } from '@/stores/company'

const companyStore = useCompanyStore()

const newCompany = ref({
  name: '',
  email: '',
  address: '',
  phone: '',
})

const isFormOpen = ref(false)

const openForm = () => {
  isFormOpen.value = true
}

const closeForm = () => {
  isFormOpen.value = false
}

const createCompany = async () => {
  console.log(newCompany.value)
  companyStore.createCompany(newCompany.value);
  isFormOpen.value = false
}

</script>
