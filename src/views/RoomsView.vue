<script setup>
import { RouterView } from 'vue-router'
import SidebarComponent from '../components/SidebarComponent.vue'
</script>

<template>
  <div class="grid grid-cols-[2fr_5fr] h-full">
    <SidebarComponent />
    <RouterView name="ChatView"></RouterView>
  </div>
</template>
