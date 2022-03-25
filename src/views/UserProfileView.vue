<script setup>
import { ref, computed, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useHead } from '@vueuse/head'
import IconSpinner from '@/components/icons/IconSpinner.vue'
import IconLogo from '@/components/icons/IconLogo.vue'
import AppearanceComponent from '@/components/AppearanceComponent.vue'

// Stores and utils
const toast = useToast()
const userStore = useUserStore()
const router = useRouter()
useHead({
  title: 'VueChat - Profile'
})

// Data
const isLoading = ref(false)
const userData = reactive({
  name: '',
  email: '',
  password: ''
})

// Computed properties
const user = computed(() => userStore.user)

const hasDataChanged = computed(() => {
  // Name exist and is different
  return (
    (userData.name && userData.name !== user.value.displayName) ||
    (userData.email && userData.email !== user.value.email) ||
    userData.password.length
  )
})

// Methods
async function updateProfile() {
  isLoading.value = true
  try {
    await userStore.updateProfile({
      name: userData.name,
      email: userData.email,
      password: userData.password
    })
    toast.success('Update profile')
    userData.name = userData.email = userData.password = ''
    router.push({ name: 'rooms' })
  } catch (error) {
    toast.error(error.message)
    console.log(error.message)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="flex flex-col items-center gap-4 pt-10">
    <router-link to="/">
      <IconLogo :width="80" :height="80" />
    </router-link>
    <h1 class="text-3xl font-medium text-gray-700 dark:text-slate-200">
      Profile
    </h1>
    <form
      @submit.prevent="updateProfile"
      class="p-4 bg-gray-200 rounded-lg dark:bg-gray-800 w-80"
    >
      <div class="mb-4">
        <label
          for="name"
          class="block mb-2 text-base font-medium text-gray-900 dark:text-gray-300"
          >Name</label
        >
        <input
          id="name"
          v-model="userData.name"
          type="text"
          :placeholder="user.displayName"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-sm-light"
        />
      </div>
      <div class="mb-4">
        <label
          for="email"
          class="block mb-2 text-base font-medium text-gray-900 dark:text-gray-300"
          >Email</label
        >
        <input
          id="email"
          v-model="userData.email"
          type="email"
          :placeholder="user.email"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-sm-light"
        />
      </div>
      <div class="mb-4">
        <label
          for="password"
          class="block mb-2 text-base font-medium text-gray-900 dark:text-gray-300"
          >Password</label
        >
        <input
          id="password"
          v-model="userData.password"
          type="password"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-sm-light"
        />
      </div>
      <div class="mb-4">
        <AppearanceComponent />
      </div>
      <button
        class="w-full px-5 py-2 text-base font-medium text-center text-white rounded-lg bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!hasDataChanged"
      >
        <IconSpinner v-if="isLoading" />
        <span v-else>Update profile</span>
      </button>
    </form>
  </section>
</template>
