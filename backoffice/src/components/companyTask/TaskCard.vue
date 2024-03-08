<template>
  <div @click="show = !show" class="border rounded-lg p-4 bg-white mb-1 relative cursor-pointer">
    
    <div class="w-full flex items-center justify-center">
      <span class="text-center text-lg font-semibold">{{ task.title + " "  }}</span>
      <span> - </span>
      <span>{{ " " + task.groupName }}</span>
    </div>
    <div class="absolute right-4 top-4">
        <i class="fa-solid fa-chevron-down"></i>
    </div>

    <div v-show="show" class="bg-gray-100 rounded-lg p-4 mt-4">
      <div class="center mb-4">
        <label class="font-bold text-gray-700">Message associé :</label>
        <p class="text-gray-600">{{ task.description_1 }}</p>
      </div>
      <div class="center mb-4" v-if="task.description_2">
        <label class="font-bold text-gray-700">Message mentor :</label>
        <p class="text-gray-600">{{ task.description_2 }}</p>
      </div>
      <div class="center" v-if="task.description_3">
        <label class="font-bold text-gray-700">Message captain :</label>
        <p class="text-gray-600">{{ task.description_3 }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      show: false
    }
  }
}
</script>

<style scoped>
.center {
  text-align: center;
}
</style>
