<script setup>
import Header from './components/Header.vue'
import Aside from './components/Aside.vue'
import { RouterLink, RouterView } from 'vue-router'
import router from './router'
import axios from 'axios'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
/*
const token = ref(localStorage.getItem("token") || sessionStorage.getItem("token"));

if (token.value) {
  userStore.token = token.value;
}*/

userStore.refreshToken();
</script>

<template>

    <Header />
    <div class="flex w-full">
      <Aside class="" />
      <RouterView class="p-6 w-full"/>
    </div>
  
</template>

