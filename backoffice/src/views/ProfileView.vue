<template>
  <div class="flex flex-col w-full">
    <div class="pt-8"></div>

    <Logout />
    <!--
      <UserData />
    <ChangePassword />
    <DeleteAccount />
    -->
    <div class="p-8"></div>

  </div>
</template>

<script setup>
import UserData from '../components/user/UserData.vue';
import ChangePassword from '../components/user/ChangePassword.vue';
import DeleteAccount from '../components/user/DeleteAccount.vue';
import Logout from '../components/user/Logout.vue';
</script>
