<template>
  <main class="flex parent" v-if="data">
      <div class="border rounded-lg p-4 div1">
        <ProfileCard :data="data" />
      </div>
      <div class="border rounded-lg p-4 div2"></div>
      <div class="border rounded-lg p-4 div3"></div>
  </main>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import ProfileCard from '../components/dashboard/profileCard.vue'

const data = ref(null)

async function fetchData() {
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL + '/dashboard', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
    console.log(response.data)
    data.value = response.data
  } catch (error) {
    console.log(error)
  }
}

fetchData()


</script>


<style scoped>
.parent {
display: grid;
grid-template-columns: repeat(6, 1fr);
grid-template-rows: repeat(6, 1fr);
grid-column-gap: 10px;
grid-row-gap: 10px;
}

.div1 { grid-area: 1 / 1 / 4 / 5; }
.div2 { grid-area: 4 / 1 / 7 / 5; }
.div3 { grid-area: 1 / 5 / 7 / 7; }

</style>
