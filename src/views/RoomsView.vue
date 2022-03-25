<script setup>
import { RouterView } from 'vue-router'
import SidebarComponent from '@/components/SidebarComponent.vue'
import { useHead } from '@vueuse/head'

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
