<template>
  <div class="">
    <svg :width="size" :height="size">
      <!-- Background circle -->
      <path
        :d="backgroundPath"
        fill="none"
        stroke="#e6e6e6"
        stroke-width="10"
        stroke-linecap="round"
      />
      <!-- Value circle -->
      <path
        :d="valuePath"
        fill="none"
        stroke="#00d827"
        stroke-width="10"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';

// Define props
const props = defineProps({
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
