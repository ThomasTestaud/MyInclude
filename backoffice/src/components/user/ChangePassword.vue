<template>
    <div class="border rounded-lg lg:w-4/12 md:w-6/12 w-8/12 m-auto p-4 flex flex-col mt-4 relative">

        <div v-if="form" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer" @click="toggleForm">
            <i class="fa-solid fa-xmark custom-size"></i>
        </div>

        <h2 class="text-center pb-2">Change your password</h2>
        <hr>

        <button v-if="!form" class="bg-indigo-600 hover:bg-indigo-700 rounded-lg my-4 text-white py-1" @click="toggleForm">Change my password</button>

        <template v-else>
            <label class="mt-4 text-sm text-gray-700">Old password:</label>
            <input type="password" class="bg-gray-100 rounded-lg px-2 py-1">
    
            <label class="mt-4 text-sm text-gray-700">New password:</label>
            <input type="password" class="bg-gray-100 rounded-lg px-2 py-1">
    
            <label class="mt-4 text-sm text-gray-700">Confirm your new password:</label>
            <input type="password" class="bg-gray-100 rounded-lg px-2 py-1">
    
            <button class="bg-green-500 hover:bg-green-600 rounded-lg my-4 text-white py-1">Change my password</button>
        </template>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const form = ref(false);

const toggleForm = () => {
    form.value = !form.value;
}
</script>

<style>
  .custom-size {
    font-size: 24px;
  }
</style>