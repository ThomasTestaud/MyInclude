<template>
    <div class="min-w-28 border border-red-500">
      <nav class="flex flex-col p-1 h-full">
          <RouterLink class="m-1 p-2 flex flex-col items-center" to="/">
            <i class="fa-solid fa-gauge text-4xl"></i>
            <p>
              Home
            </p>
          </RouterLink>
        </nav>
    </div>
    <!--
    -->
      
      <aside class="bg-white w-28 h-full fixed pt-12 top-0 text-sm">
        <nav class="flex flex-col border-r p-1 h-full">
          <RouterLink class="text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg m-1 p-2 flex flex-col items-center" to="/">
            <i class="fa-solid fa-gauge text-4xl"></i>
            <p>
              Home
            </p>
          </RouterLink>
          <RouterLink class="text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg m-1 p-2 flex flex-col items-center" to="/liens">
            <i class="fa-solid fa-link text-4xl"></i>
            <p>
              Ressources
            </p>
          </RouterLink>
        </nav>
      </aside>
    </template>

<script setup>
import { RouterLink } from 'vue-router';

</script>
