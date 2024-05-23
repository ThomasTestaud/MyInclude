<template>
    <header>
        <div class="flex justify-between items-center">
            <div class="flex items-center w-full px-4">
                <RouterLink class="mr-4" to="/">
                    <img src="@/assets/logo.png" alt="">
                </RouterLink>
                <nav class="flex w-full justify-around">
                    <RouterLink :class="router.path === '/dashboard/' + userStore.user.id ? 'selected-route' : ''"
                        :to="'/dashboard/' + userStore.user.id">
                        Dashboard
                    </RouterLink>
                    <RouterLink :class="router.path === '/company/' + userStore.user.company_id ? 'selected-route' : ''"
                        :to="'/company/' + userStore.user.company_id">
                        Ma Boite
                    </RouterLink>
                    <RouterLink :class="router.path === '/objectifs' ? 'selected-route' : ''" to="/objectifs">
                        Objectifs
                    </RouterLink>
                    <RouterLink :class="router.path === '/liens' ? 'selected-route' : ''" to="/liens">
                        Ressources
                    </RouterLink>
                    <RouterLink :class="router.path === '/' ? 'selected-route' : ''" to="/">
                        Entreprises
                    </RouterLink>
                </nav>
            </div>
            <RouterLink to="/profile">
                <img src="@/assets/Bonhomme.svg">
            </RouterLink>
            <RouterLink to="/objectifs">
                <img src="@/assets/cloche.svg">
            </RouterLink>
        </div>
    </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';


const router = useRoute();
const userStore = useUserStore();

</script>

<style scoped>
header {
    background-color: var(--main-bg-color);
    padding: 1rem 5rem;
    position: sticky;
    top: 0;
    z-index: 1000;
    /*box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);*/
}

header a {
    font-weight: bold;
    transition: 0.3s all;
    border-bottom: 2px solid var(--main-bg-color);
    color: black;
}

.selected-route {
    color: var(--secondary-text-color);
    border-bottom: 2px solid var(--secondary-text-color);
}

img {
    height: 3rem;
    width: 7.5rem;
}
</style>