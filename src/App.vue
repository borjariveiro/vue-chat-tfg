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
    <Transition name="fade" mode="out-in">
      <RouterView />
    </Transition>
  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
