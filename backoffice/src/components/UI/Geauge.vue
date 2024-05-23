<template>
  <div class="relative text-center h-[150px]">

    <div class="center">
      {{ props.data.done_tasks }} / {{ props.data.total_tasks }}
    </div>

    <div class="absolute bottom-2 w-full">
      {{ props.data.name }}
    </div>

    <div>
      <svg :width="size" :height="size">
        <!-- Background circle -->
        <path :d="backgroundPath" fill="none" stroke="#e6e6e6" stroke-width="10" stroke-linecap="round" />
        <!-- Value circle -->
        <path :d="valuePath" fill="none" stroke="#00d827" stroke-width="10" stroke-linecap="round" />
      </svg>
    </div>

  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';

// Define props
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    default: 150
  }
});

const radius = computed(() => props.size / 2);
const strokeWidth = 10;
const center = computed(() => radius.value);
const effectiveRadius = computed(() => radius.value - strokeWidth / 2);

// Function to calculate the SVG path for the circles
function calculatePath(value, isBackground = false) {
  const endAngle = isBackground ? Math.PI * 2 + 0.5 : Math.PI - 0.5 + value * (Math.PI + 1);
  const largeArcFlag = endAngle - (Math.PI - 0.5) > Math.PI ? 1 : 0;

  // Start point
  const startX = center.value + effectiveRadius.value * Math.cos(Math.PI - 0.5);
  const startY = center.value + effectiveRadius.value * Math.sin(Math.PI - 0.5);

  // End point
  const endX = center.value + effectiveRadius.value * Math.cos(endAngle);
  const endY = center.value + effectiveRadius.value * Math.sin(endAngle);

  return `M ${startX},${startY} A ${effectiveRadius.value},${effectiveRadius.value} 0 ${largeArcFlag} 1 ${endX},${endY}`;
}

const backgroundPath = computed(() => calculatePath(props.value, true));
const valuePath = computed(() => calculatePath(props.value));

</script>

<style scoped>
.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    font-weight: bold;
    color: #4a5568;
}
</style>

