<template>
    <button @click="popup = true" class="absolute top-0 w-full h-full bg-black text-white text-4xl opacity-0 hover:opacity-70 transition-all duration-300">
        <i class="fas fa-upload"></i>
    </button>
    <div v-if="popup" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
        aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div
                class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div class="bg-white px-4 pb-5 sm:p-6 sm:pb-4 text-center">
                    <div class="flex justify-end">
                        <button @click="popup = false" class="text-gray-400 hover:text-gray-600">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <h2 class="text-lg mb-4">Modifier l'avatar</h2>
                    <input type="file" @change="upload($event)" class="px-3 py-2 text-gray-700" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useApiStore } from '@/stores/api';
import { ref } from 'vue';

const apiStore = useApiStore();
const popup = ref(false);
const props = defineProps({
    route: String,
})

const upload = (event) => {
    popup.value = false;
    apiStore.uploadPhoto(props.route, event)
}
</script>