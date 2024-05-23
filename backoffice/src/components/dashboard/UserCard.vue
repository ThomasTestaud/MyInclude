<template>
    <div :class="'user-card ' + props.type">
        <div class="img-container">
            <img :src="apiStore.url + '/public/users/' + props.data.avatar" alt="avatar"
                class="w-full h-full object-cover" />
            <UploadAvatar v-if="props.type === 'main-user'" :route="'/user/avatar/' + props.data.id" />
        </div>
        <div class="content">
            <h2>{{ props.data.first_name }} {{ props.data.last_name }}</h2>
            <p>{{ props.data.position || "Poste non renseigné" }}</p>
            <p>{{ props.data.email || "Mail non renseigné" }}</p>
            <!--
            <p>{{ props.data.first_day ? formatDate(props.data.first_day) : "Début cursus non renseigné" }}</p>
                <p v-if="props.data.role && props.data.role !== 'employee'">{{ props.data.role }}</p>
            -->
            <p class="status">{{ props.status === 'associate' ? 'Nouvel arrivant' : props.status === 'mentor' ? 'Manager' : 'Captain' }}</p>
        </div>
    </div>
</template>

<script setup>
import { useApiStore } from '../../stores/Api';
import { useDashboardStore } from '../../stores/Dashboard';
import UploadAvatar from '../UI/UploadAvatar.vue';

const dashboardStore = useDashboardStore();
const apiStore = useApiStore();

const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
};

const props = defineProps({
    data: Object,
    status: String,
    type: String
});

</script>


<style scoped>

.user-card {
    display: flex;
    align-items: center;
    margin: 1em 0;
    position: relative;
    padding: 2em 0em 0em 4em;
}

.img-container {
    width: 10em;
    height: 10em;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 1em;
    position: absolute;
    top: 0;
    left: 0;
}

.content {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--third-bg-color);
    padding: 1em 3em 1em 7em;
    border-radius: 1.5em;
    height: 10em;
    color: var(--black);
    text-align: left;
}

h2 {
    font-size: 1.2em;
    font-weight: bold;
}

.status {
    margin-top: 1em;
    font-size: 1.2em;
    font-weight: bold;
    color: var(--third-bg-color);
}

.main-user .status {
    color: var(--secondary-text-color);
}

.main-user .content {
    border-color: var(--secondary-text-color);
}
</style>
