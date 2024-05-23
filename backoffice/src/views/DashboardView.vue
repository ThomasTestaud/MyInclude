<template>
  <div v-if="dashboardStore.loading" class="text-lg text-center">
    <span class="visually-hidden">Loading...</span>
  </div>
  <main v-else class="flex parent mt-4">
    <div class="div1 flex flex-col items-center pr-4">
      <div class="card w-full p-4">
        <ProfileCard />
      </div>
      <RouterLink :to="'/company/' + userStore.user.company_id" class="btn-1 mt-4">Plus d'infos sur mon entreprise</RouterLink>
    </div>
    <div class="div3 flex flex-col items-center">
      <div class="card h-full p-4">
        <TasksCard />
      </div>
      <RouterLink :to="'/company/tasks/' + userStore.user.company_id" class="btn-1 mt-4">Poursuivre mon cursus</RouterLink>
    </div>
    <div class="div2 card mt-4 p-4">
      <ProgressCardVue />
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, watchEffect, onBeforeUnmount } from "vue";
import ProfileCard from "../components/dashboard/profileCard.vue";
import TasksCard from "../components/dashboard/TasksCard.vue";
import ProgressCardVue from "../components/dashboard/ProgressCard.vue";
import { useApiStore } from "../stores/Api";
import { useDashboardStore } from "../stores/Dashboard";
import { useUserStore } from "../stores/User";

const dashboardStore = useDashboardStore();
const userStore = useUserStore();
const props = defineProps({
  id: Number,
});

watchEffect(() => {
  if (props.id) {
    dashboardStore.getDashboard(props.id);
  }
});

onBeforeUnmount(() => {
  dashboardStore.loading = true;
});
</script>

<style scoped>
.parent {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
}

.div1 {
  grid-area: 1 / 1 / 4 / 5;
}
.div2 {
  grid-area: 4 / 1 / 6 / 7;
}
.div3 {
  grid-area: 1 / 5 / 4 / 7;
}
</style>
