<template>
  <svg
    :width="props.width"
    :height="props.height"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="stroke-slate-500 dark:stroke-slate-400"
  >
    <path
      d="M52.1128 24.6127L52.1128 60.1127C52.1128 66.7401 46.7402 72.1127 40.1128 72.1127V72.1127C33.4854 72.1127 28.1128 66.7401 28.1128 60.1127L28.1128 17.1127C28.1128 12.1421 32.1422 8.1127 37.1128 8.1127V8.1127C42.0834 8.1127 46.1128 12.1421 46.1128 17.1127V53.1127C46.1128 56.4264 43.4265 59.1127 40.1128 59.1127V59.1127C36.7991 59.1127 34.1128 56.4264 34.1128 53.1127L34.1128 24.6127"
      stroke-width="5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  }
})
</script>
