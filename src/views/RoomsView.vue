<script setup>
import { RouterView } from 'vue-router'
import { useHead } from '@vueuse/head'
import SidebarComponent from '@/components/SidebarComponent.vue'

useHead({
  title: 'VueChat - Rooms'
})
</script>

<template>
  <div class="grid grid-cols-[2fr_5fr] h-full">
    <SidebarComponent />
    <RouterView name="ChatView"></RouterView>
  </div>
</template>
