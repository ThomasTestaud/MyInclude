<template>
    <div :class="errorMsg === '' ? '' : 'bg-red-100 p-2 rounded-lg border border-red-600'">
        <div class="mt-2 flex justify-between">
            <div>
                <span class="text-sm text-gray-700 mr-2">{{ props.name }}: </span>
                <span v-if="!edit">{{ firstData || 'Loading...' }}</span>
                <input v-model="data" v-else type="text" class="bg-gray-100 rounded-lg px-2 py-1">
            </div>
            <button @click="edit = !edit" v-if="!edit" class="text-gray-400 hover:text-gray-600">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <div v-else class="flex">
                <button @click="update()" class="text-green-500 hover:text-green-600">
                    <i class="fa-solid fa-check custom-size"></i>
                </button>
                <button  @click="close()" class="text-red-600 hover:text-red-700 ml-2">
                    <i class="fa-solid fa-xmark custom-size"></i>
                </button>
            </div>
        </div>
        <p class="text-center text-xs text-red-600 mt-1">{{ errorMsg }}</p>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, watchEffect } from 'vue'

const edit = ref(false)
const data = ref("")
const errorMsg = ref("")
const firstData = ref("")

const props = defineProps({
    name: String,
    data: String,
    route: String,
    object: String,
})


const update = () => {
    errorMsg.value = ""
    //console.log(data.value)
    //patch method with authorization header
    axios.patch(import.meta.env.VITE_API_URL + props.route, {
        [props.object]: data.value,
    }, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
    })
        .then((response) => {
            console.log(response)
            edit.value = false
            firstData.value = data.value
        })
        .catch((error) => {
            console.log(error)
            if (error.response.status === 409) {
                errorMsg.value = "This " + props.object + " is already taken."
            } else {
                errorMsg.value = "Error while updating the " + props.object + "."
            }
        })
}

const close = () => {
    edit.value = false
    errorMsg.value = ""
    data.value = firstData.value
}


watchEffect(() => {
    data.value = props.data
    firstData.value = props.data
})
</script>

<style scoped>
</style>