<script setup>
import { ref } from 'vue'

// Data
const themeSelect = ref(localStorage.getItem('theme') ?? 'theme')

// Methods
function changeTheme() {
  if (themeSelect.value === 'light') {
    localStorage.theme = 'light'
    console.log('1')
    document.documentElement.classList.remove('dark')
  } else if (themeSelect.value === 'dark') {
    localStorage.theme = 'dark'
    document.documentElement.classList.add('dark')
  } else if (themeSelect.value === 'theme') {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.removeItem('theme')
  }
}
</script>

<template>
  <label
    for="theme"
    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
    >Appearance</label
  >
  <select
    v-model="themeSelect"
    @change="changeTheme()"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
  >
    <option value="theme">Use system setting</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
  </select>
</template>
