<script setup>
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import { useRootStore } from '@/stores/root'

// Initialize auth
const rootStore = useRootStore()
rootStore.checkAuth()
</script>

<template>
  <main class="h-screen bg-slate-900">
    <TheHeader />
    <RouterView />
  </main>
</template>
