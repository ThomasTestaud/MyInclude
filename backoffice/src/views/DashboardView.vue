<template>
  <main class="flex parent" >
      <div class="border rounded-lg p-4 div1">
        <ProfileCard />
      </div>
      <div class="border rounded-lg p-4 div2">
      </div>
      <div class="border rounded-lg p-4 div3 overflow-y-auto">
        <TasksCard />
      </div>
  </main>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import ProfileCard from '../components/dashboard/profileCard.vue'
import TasksCard from '../components/dashboard/TasksCard.vue';
import { useApiStore } from '../stores/Api';
import { useDashboardStore } from '../stores/Dashboard';

const data = ref(null)
const apiStore = useApiStore()
const dashboardStore = useDashboardStore()
const props = defineProps({
  id: Number 
})


onMounted(() => {
  /*
  apiStore.get('/dashboard/' + props.id).then((response) => {
    console.log(props.id)
    data.value = response
    console.log(data.value)
  })*/
  dashboardStore.getDashboard(props.id)
})


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
.div2 { grid-area: 4 / 1 / 6 / 5; }
.div3 { grid-area: 1 / 5 / 6 / 7; }

</style>
