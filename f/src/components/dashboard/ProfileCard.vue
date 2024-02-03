<template>
    <div class="user-info flex">
        <img :src="'src/assets/' + (data.user.avatar ?? 'default.png')" alt="avatar" class="rounded-lg w-40 h-40" />
        <div class="ml-4">
            <h2 class="text-xl font-bold my-4">{{ data.user.first_name }} {{ data.user.last_name }}</h2>
            <p class="text-gray-600"><strong>Profil : </strong>{{ data.user.role === "manager" ? "Manager" : data.user.role }}</p>
            <p class="text-gray-600"><strong>Mail : </strong>{{ data.user.email }}</p>
            <p class="text-gray-600"><strong>Début du cursus : </strong>{{ formatDate(data.user.first_day) }}</p>
        </div>
    </div>
    <div class="children-list mt-4">
        <h3 class="text-lg font-semibold">Collègues:</h3>
        <ul class="mt-2 flex">
            <template v-if="data.children.length > 0">
                <li v-for="child in data.children" :key="child.id" class="text-gray-600 border rounded-lg p-4">
                    <h4>
                        {{ child.first_name }} {{ child.last_name }}
                    </h4>
                    <p><strong>Profile : </strong> Children</p>
                </li>
            </template>
            <template v-if="data.parent.length > 0">
                <li v-for="parent in data.parent" :key="parent.id" class="text-gray-600">
                    <h4>
                        {{ parent.first_name }} {{ parent.last_name }}
                    </h4>
                    <p><strong>Profile : </strong> Children</p>
                </li>
            </template>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
};

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
});
</script>

