<script setup>
import Header from './components/Header.vue'
import Aside from './components/Aside.vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import router from './router'
import axios from 'axios'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
userStore.refreshToken();

router.beforeEach((to, from, next) => {
  to.meta.auth = userStore.auth;
  next();
});

</script>

<template>
    <Header v-if="!$route.path.includes('/login')" />
    <div class="flex w-full">
      <Aside v-if="!$route.path.includes('/login')" class="" />
      <RouterView class="p-6 w-full" />
    </div>
</template>
