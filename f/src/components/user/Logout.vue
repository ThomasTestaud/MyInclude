<template>
    <div class="border rounded-lg lg:w-4/12 md:w-6/12 w-8/12 m-auto p-4 flex flex-col mt-4">
        <h2 class="text-center pb-2">Log out on this device</h2>
        <hr>
        <button class="bg-indigo-600 hover:bg-indigo-700 rounded-lg my-4 text-white py-1" @click="disconnect">Log out</button>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import router from '../../router'

const disconnect = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    router.push('/login');
}
</script>