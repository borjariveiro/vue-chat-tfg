<template>
  <header class="flex items-center justify-between">
    <div>
      <router-link class="m-4 p-2 border-2 border-green-700" to="/login"
        >Sign in</router-link
      >
      <router-link class="m-4 p-2 border-2 border-green-700" to="/register"
        >Sign up</router-link
      >
      <button v-if="user" @click="doLogout" class="border-2 px-2 py-1">
        Logout
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const user = computed(() => userStore.user)

async function doLogout() {
  try {
    await userStore.doLogout()
    router.push({ name: 'login' })
  } catch (error) {
    console.log(error.message)
  }
}
</script>
