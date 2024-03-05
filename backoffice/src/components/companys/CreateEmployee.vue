<template>
        <!-- Button to open the form modal -->
        <div class="flex justify-end mb-4">
            <button @click="showModal = true" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Créer un employé pour {{ companyStore.company.name }}
            </button>
        </div>

        <!-- Modal -->
        <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
            <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <!-- Close Button -->
                <div class="flex justify-end">
                    <button @click="showModal = false" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form @submit.prevent="createEmployee">
                    <!-- Form fields -->
                    <div class="mb-4">
                        <label for="first_name" class="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                        <input v-model="newEmployee.first_name" type="text" id="first_name" name="first_name"
                            class="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500">
                    </div>

                    <div class="mb-4">
                        <label for="last_name" class="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                        <input v-model="newEmployee.last_name" type="text" id="last_name" name="last_name"
                            class="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500">
                    </div>

                    <div class="mb-4">
                        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input v-model="newEmployee.email" type="email" id="email" name="email"
                            class="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500">
                    </div>

                    <div class="mb-4">
                        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Poste</label>
                        <input v-model="newEmployee.position" type="position" id="position" name="position"
                            class="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500">
                    </div>

                    <div class="mb-4">
                        <label for="role" class="block text-gray-700 text-sm font-bold mb-2">Role</label>
                        <select v-model="newEmployee.role_id" id="role" name="role"
                            class="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500">
                            <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
                        </select>
                    </div>

                    <div class="text-center">
                        <button type="submit"
                            class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600">
                            Créer l'employer
                        </button>
                    </div>
                </form>
            </div>
        </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCompanyStore } from '@/stores/company'
import { useApiStore } from '@/stores/api'

const apiStore = useApiStore()
const showModal = ref(false) // Define showModal as a reactive state
const companyStore = useCompanyStore()
const roles = ref([])

const newEmployee = ref({
    first_name: '',
    last_name: '',
    position: '',
    email: '',
    phone: '',
    role_id: '',
})

const createEmployee = () => {
    companyStore.createEmployee(newEmployee.value)
    showModal.value = false
}

apiStore.get('/role').then((response) => {
    roles.value = response
})


</script>
