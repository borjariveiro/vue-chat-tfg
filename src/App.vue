<script setup>
import { RouterView } from 'vue-router'
import { useRootStore } from '@/stores/root'

// Initialize auth
const rootStore = useRootStore()
rootStore.checkAuth()
</script>

<template>
  <main class="h-screen bg-slate-900">
    <!-- <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view> -->
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
