<template>
    <div class="user-info flex">
        <div class="relative mr-6 w-40 h-40 z-10 overflow-hidden rounded-lg ">
            <img :src="apiStore.url + '/public/users/' + dashboardStore.user.avatar" alt="avatar"
                class="w-full h-full object-cover" />
            <UploadAvatar :route="'/user/avatar/' + dashboardStore.user.id" />
        </div>
        <div class="ml-4">
            <h2 class="text-xl font-bold my-4">{{ dashboardStore.user.first_name }} {{ dashboardStore.user.last_name }}
            </h2>
            <p class="text-gray-600" v-if="dashboardStore.user.role !== 'employee'"><strong>Role : </strong>{{
                dashboardStore.user.role }}</p>
            <p class="text-gray-600"><strong>Poste : </strong>{{ dashboardStore.user.position || "Non renseigné" }}</p>
            <p class="text-gray-600"><strong>Mail : </strong>{{ dashboardStore.user.email || "Non renseigné" }}</p>
            <p class="text-gray-600"><strong>Début du cursus : </strong>{{ dashboardStore.user.first_day ?
                formatDate(dashboardStore.user.first_day) : "Non renseigné" }}</p>
        </div>
    </div>

    <div class="mt-4 flex justify-center">
        <ul v-if="dashboardStore.relations.length > 0" class="mt-2 flex" v-for="relation in dashboardStore.relations">
            <template v-if="relation" v-for="key in Object.keys(relation)">
                <button @click="goToEmplyee(relation[key].id)"
                    v-if="relation[key].id !== dashboardStore.user.id"
                    class="text-gray-600 border rounded-lg p-2 w-6/12 mr-2">
                    <li class="flex">
                        <img :src="apiStore.url + '/public/users/' + relation[key].avatar" alt="avatar"
                            class="rounded-lg w-20 h-20" />
                        <div class="ml-4">
                            <h4 class="font-semibold py-2">
                                {{ relation[key].first_name }} {{ relation[key].last_name }}
                            </h4>
                            <p class="text-sm"><strong>Profile : {{ key }}</strong>
                            </p>
                        </div>
                    </li>
                </button>
            </template>
        </ul>
        
        <CreateRelation v-else/>
    </div>
    <!--
-->
</template>

<script setup>
import { ref } from 'vue';
import { useApiStore } from '../../stores/Api';
import UploadAvatar from '../UI/UploadAvatar.vue';
import { useDashboardStore } from '../../stores/Dashboard';
import { useRouter } from 'vue-router';
import CreateRelation from './CreateRelation.vue';

const router = useRouter();
const apiStore = useApiStore();
const dashboardStore = useDashboardStore();

const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
};

const goToEmplyee = (id) => {
    router.push('/dashboard/' + id);
    dashboardStore.getDashboard(id)
};
</script>
