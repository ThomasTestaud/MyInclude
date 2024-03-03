<template>
    <div class="border rounded-lg lg:w-4/12 md:w-6/12 w-8/12 m-auto p-4 flex flex-col">
        <h2 class="text-center pb-2">Your profile</h2>
        <hr class="mb-2">
        <EditableLine :name="'Username'" :data="userData.username" :route="'/user/'" :object="'username'"/>
        <EditableLine :name="'Email'" :data="userData.email"  :route="'/user/'" :object="'email'"/>
    </div>

</template>
  
<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { ref } from 'vue';
import EditableLine from '../UI/EditableLine.vue';

const userData = ref({}); // Initialize with an empty object

async function getUser() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        });
        userData.value = response.data;
    } catch (error) {
        console.error(error);
    }
}

onMounted(getUser);
</script>
  