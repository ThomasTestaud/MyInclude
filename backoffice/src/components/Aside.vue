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
          <RouterLink class="text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg m-1 p-2 flex flex-col items-center" :to="'/dashboard/' + userStore.user.id">
            <i class="fa-solid fa-gauge text-4xl"></i>
            <p>
              Dashboard
            </p>
          </RouterLink>
          <RouterLink class="text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg m-1 p-2 flex flex-col items-center" :to="'/company/' + userStore.user.company_id">
            <i class="fa-solid fa-building text-4xl"></i>
            <p>
              Ma Boite
            </p>
          </RouterLink>
          <!--
            <RouterLink class="text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg m-1 p-2 flex flex-col items-center" to="/objectifs">
              <i class="fa-solid fa-check text-4xl"></i>
              <p>
                Objectifs
              </p>
            </RouterLink>
          -->
          <RouterLink class="text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg m-1 p-2 flex flex-col items-center" :to="'/company/tasks/' + userStore.user.company_id">
            <i class="fa-solid fa-check text-4xl"></i>
            <p>
              Tâches
            </p>
          </RouterLink>
          <RouterLink class="text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg m-1 p-2 flex flex-col items-center" to="/liens">
            <i class="fa-solid fa-link text-4xl"></i>
            <p>
              Liens
            </p>
          </RouterLink>

          <hr>
          <h2 class="my-4">

            /BACKOFFICE/
          </h2>
          <RouterLink class="text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg m-1 p-2 flex flex-col items-center" to="/">
            <i class="fa-solid fa-building text-4xl"></i>
            <p>
              Entreprises
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
import { useUserStore } from '../stores/User';

const userStore = useUserStore();

</script>
