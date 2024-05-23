<template>
    <div class="flex flex-col px-6 container card">
        <h2>Mes prochaines tâches</h2>
        <ul class="scroll">
            <li v-for="task in props.tasks">
                <div class="w-1/12">
                    <input type="checkbox" v-if="task.done_date" checked/>
                    <input type="checkbox" v-else/>
                </div>
                <div class="w-9/12">
                    <h3>{{ task.title }}</h3>
                    <p>{{ task.description }}</p>
                </div>

                <div>
                    <!--
                            <p>As: {{ task.as }}</p>
                        -->
                    <p class="date w-2/12">
                        {{ formatDate(task.due_date) }}
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const formatDate = (date) => {
    const options = { weekday: 'long', day: '2-digit', month: '2-digit' };
    let formattedDate = new Date(date).toLocaleDateString('fr-FR', options);
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1).toLowerCase();
};

const props = defineProps({
    tasks: {
        type: Array,
        required: true
    }
});
</script>

<style scoped>
* {
    box-sizing: border-box;
    color: var(--black);
}

.container {
    /*max-height: 55vh;*/
}

h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--main-text-color);
}

h3 {
    font-weight: 600;
}

li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.scroll {
    overflow-y: auto;
    height: 100%;
    margin-bottom: 1rem;
}

.date {
    text-align: right;
    min-width: 100px;
}
</style>