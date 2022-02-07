<script setup>
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import { useRootStore } from '@/stores/root'

// Initialize auth
const rootStore = useRootStore()
rootStore.checkAuth()
</script>

<template>
  <TheHeader />
  <RouterView />
</template>
