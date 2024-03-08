<template>
    <div class="flex justify-around flex-wrap w-full">
        <div v-for="score in dashboardStore.scores" class="relative text-center">
            <div class="center">
                {{ score.done_tasks }} / {{ score.total_tasks }}
            </div>
            <div class="">
                <GeaugeVue :value="score.done_tasks/score.total_tasks" />
            </div>
            <div class="absolute bottom-2 w-full">
                {{ score.name }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDashboardStore } from '../../stores/Dashboard';
import GeaugeVue from './Geauge.vue';


const dashboardStore = useDashboardStore();
</script>

<style scoped>

.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    font-weight: bold;
    color: #4a5568;
}

</style>

