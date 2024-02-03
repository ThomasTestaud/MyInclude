<script setup>
import Header from './components/Header.vue'
import Aside from './components/Aside.vue'
import { RouterLink, RouterView } from 'vue-router'
import router from './router'
import axios from 'axios'
import { ref } from 'vue'


const token = localStorage.getItem("token") || sessionStorage.getItem("token");

if (token) {
  axios.get(import.meta.env.VITE_API_URL + "/user/refresh-token", {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      //console.log(response.data);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        sessionStorage.setItem("token", response.data.token);
      }
    })
    .catch((error) => {
      //console.log(error.response.status);
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
      }
    })
}

</script>

<template>

    <Header />
    <div class="flex w-full">
      <div class="w-2/12"></div>
      <Aside />
      <RouterView :auth="userAuth" class="w-10/12 p-2 h-full" />
    </div>
  
</template>

