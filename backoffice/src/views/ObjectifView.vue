<template>
  <div class="flex">
    <div class="w-7/12 flex justify-around p-6 flex-wrap">
      <GeaugeVue class="pr-2" v-for="score in data.groupTasks" :value="score.done_tasks / score.total_tasks" :data="score" />
    </div>
    <TasksCard class="w-5/12 p-6" :tasks="data.tasks" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApiStore } from '../stores/Api';
import GeaugeVue from '../components/UI/Geauge.vue';
import TasksCard from '../components/UI/TasksCard.vue';

const apiStore = useApiStore();
const data = ref([]);

onMounted(async () => {
  data.value = await apiStore.get('/goals');
});

</script>
