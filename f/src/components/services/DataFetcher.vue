<template>
    <div v-if="data.length === 0">Loading</div>
    <div v-else>
        <slot name="content" :data="data">
            <!-- Default content here, if any -->
        </slot>
    </div>
</template>
        
<script setup>
import axios from 'axios'
import { ref } from 'vue'

const data = ref([])

defineProps({
    url: String,
})

async function fetchData() {
    try {
        const response = await axios.get(import.meta.env.VITE_API_URL + '/dashboard', {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        })
        console.log(response.data)
        data.value = response.data
    } catch (error) {
        console.log(error)
    }
}

fetchData()
</script>
