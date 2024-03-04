<template>
    <div class="user-info flex">
        <div class="relative mr-6 w-40 h-40 z-10 overflow-hidden rounded-lg ">
            <img :src="apiStore.url + '/public/users/' + dashboardStore.user.avatar" alt="avatar" class="w-full h-full" />
            <UploadAvatar :route="'/user/avatar/' + dashboardStore.user.id" />
        </div>
        <div class="ml-4">
            <h2 class="text-xl font-bold my-4">{{ dashboardStore.user.first_name }} {{ dashboardStore.user.last_name }}</h2>
            <p class="text-gray-600"><strong>Profil : </strong>{{ dashboardStore.user.Role.name }}</p>
            <p class="text-gray-600"><strong>Poste : </strong>{{ dashboardStore.user.position }}</p>
            <p class="text-gray-600"><strong>Mail : </strong>{{ dashboardStore.user.email }}</p>
            <p class="text-gray-600"><strong>Début du cursus : </strong>{{ dashboardStore.user.first_day ? formatDate(dashboardStore.user.first_day) : "Non renseigné" }}</p>
        </div>
    </div>
    <!--

        <div class="children-list mt-4">
            <ul class="mt-2 flex">
                <template v-if="data.children.length > 0">
                    <li v-for="child in data.children" :key="child.id"
                    class="text-gray-600 border rounded-lg p-2 flex w-6/12 mr-2">
                    <img :src="'src/assets/' + (data.children.avatar ?? 'default.png')" alt="avatar"
                        class="rounded-lg w-20 h-20" />
                        <div class="ml-4">
                            <h4 class="font-semibold py-2">
                                {{ child.first_name }} {{ child.last_name }}
                            </h4>
                            <p class="text-sm"><strong>Profile : </strong> {{ data.user.role === "captain" ? "Manager" :
                                data.user.role === "mentor" ? "Nouveau collaborateur" : 'other' }}</p>
                            </div>
                        </li>
                    </template>
                    <template v-if="data.parent.length > 0">
                <li v-for="parent in data.parent" :key="parent.id"
                class="text-gray-600 border rounded-lg p-2 flex w-6/12 ml-2">
                <img :src="'src/assets/' + (data.parent.avatar ?? 'default.png')" alt="avatar"
                class="rounded-lg w-20 h-20" />
                <div class="ml-4">
                    <h4 class="font-semibold py-2">
                        {{ parent.first_name }} {{ parent.last_name }}
                    </h4>
                    <p class="text-sm"><strong>Profile : </strong> {{ data.user.role === "mentor" ? "Capt'M" :
                        data.user.role === "associate" ? "Manager" : 'other' }}</p>
                    </div>
                </li>
            </template>
        </ul>
    </div>
-->
</template>

<script setup>
import { ref } from 'vue';
import { useApiStore } from '../../stores/Api';
import UploadAvatar from '../UI/UploadAvatar.vue';
import { useDashboardStore } from '../../stores/Dashboard';

const apiStore = useApiStore();
const dashboardStore = useDashboardStore();

const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
};
/*
const props = defineProps({
    data: {
        type: Object,
        required: true
    }
});
*/
</script>

