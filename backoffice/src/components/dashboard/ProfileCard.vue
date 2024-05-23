<template>
    <div class="container">

        <h2>Mon Cursus</h2>
        <div class="ml-4">
            <UserCard v-if="dashboardStore.user" :data="dashboardStore.user" :status="getUserStatus()" :type="'main-user'"/>
        </div>

        <div class="relations mt-4 flex overflow-x-auto text-xs">
            <ul v-if="dashboardStore.relations.length > 0" class="mt-2 flex" v-for="relation in dashboardStore.relations">
                <template v-if="relation" v-for="key, index in Object.keys(relation)">
                    <button @click="goToEmplyee(relation[key].id)" v-if="relation[key].id !== dashboardStore.user.id">
                        
                        <UserCard :data="relation[key]" :status="key" />
                        
                    </button>
                </template>
            </ul>
            
            <CreateRelation v-else/>
        </div>
    </div>
        
</template>

<script setup>
import { ref } from 'vue';
import { useApiStore } from '../../stores/Api';
import UploadAvatar from '../UI/UploadAvatar.vue';
import { useDashboardStore } from '../../stores/Dashboard';
import { useRouter } from 'vue-router';
import CreateRelation from './CreateRelation.vue';
import UserCard from './UserCard.vue';

const router = useRouter();
const apiStore = useApiStore();
const dashboardStore = useDashboardStore();

console.log(dashboardStore.user);
console.log(dashboardStore.relations);
const getUserStatus = () => {
    if (!dashboardStore.relations.length) return 'associate';
    return dashboardStore.relations[0].associate.id === dashboardStore.user.id ? 'associate' : dashboardStore.relations[0].mentor.id === dashboardStore.user.id ? 'mentor' : 'captain';
}
console.log(getUserStatus());

const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
};

const goToEmplyee = (id) => {
    router.push('/dashboard/' + id);
    dashboardStore.getDashboard(id)
};
</script>

<style scoped>

h2 {
    font-size: 1.5rem;
    font-weight: 700;
}

.container {
    padding: 0rem 1rem ;
    width: 100%;
}

.relations {
    font-size: 0.8rem;
}

button + button {
    margin-left: 2rem;
}

</style>