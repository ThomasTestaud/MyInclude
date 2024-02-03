<template>
    <aside class="bg-white w-2/12 h-full absolute top-0 pt-12">
        <nav class="flex flex-col border-r p-2 h-full">
          <RouterLink class="mr-4 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg m-1 p-2 flex flex-col items-center" to="/dashboard">
            <i class="fa-solid fa-gauge text-4xl"></i>
            <p>
              Dashboard
            </p>
          </RouterLink>
          <RouterLink class="mr-4 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg m-1 p-2 flex flex-col items-center" to="/objectifs">
            <i class="fa-solid fa-check text-4xl"></i>
            <p>
              Objectifs
            </p>
          </RouterLink>
          <RouterLink class="mr-4 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg m-1 p-2 flex flex-col items-center" to="/liens">
            <i class="fa-solid fa-link text-4xl"></i>
            <p>
              Liens
            </p>
          </RouterLink>
        </nav>
      </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router';

</script>
