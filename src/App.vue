<script setup>
import { RouterView } from 'vue-router'
import { useRootStore } from '@/stores/root'
import { onMounted } from 'vue'

// Initialize auth
const rootStore = useRootStore()

onMounted(() => {
  rootStore.checkAuth()
  // localStorage.theme = 'dark'
})
</script>

<template>
  <main class="h-screen bg-neutral-100 dark:bg-slate-900">
    <!-- <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view> -->
    <!-- <Transition name="fade" mode="out-in">
      <RouterView />
    </Transition> -->
    <RouterView />
  </main>
</template>

<!-- <style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> -->
