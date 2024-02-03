<template>
    <header class="border-b p-2 sticky top-0 bg-white z-20">
        <div class="flex justify-between items-center">
            <div class="flex items-center">
                <RouterLink class="mr-4 text-gray-800" to="/">
                    <h1 class="font-bold text-xl">MyInclude</h1>
                </RouterLink>
                <!--
                    <nav>
                        <RouterLink class="mr-4 text-gray-600 hover:text-gray-800" to="/dashboard">Dashboard</RouterLink>
                        <RouterLink class="mr-4 text-gray-600 hover:text-gray-800" to="/objectifs">Objectifs</RouterLink>
                        <RouterLink class="mr-4 text-gray-600 hover:text-gray-800" to="/liens">Liens</RouterLink>
                    </nav>
                -->
            </div>
            <RouterLink to="/profile" class="bg-indigo-600 hover:bg-indigo-500 p-1 rounded-2xl text-white flex justify-center items-center">
                <i class="fa-regular fa-circle-user p-0 custom-size"></i>
            </RouterLink>
        </div>
    </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

</script>

<style>
  .custom-size {
    font-size: 24px;
  }
</style>