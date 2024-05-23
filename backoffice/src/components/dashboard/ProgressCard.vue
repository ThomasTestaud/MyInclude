<template>
    <div class="flex justify-around flex-wrap w-full">
        <GeaugeVue v-for="score in dashboardStore.scores" :value="score.done_tasks / score.total_tasks" :data="score" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDashboardStore } from '../../stores/Dashboard';
import GeaugeVue from '../UI/Geauge.vue';


const dashboardStore = useDashboardStore();
</script>

