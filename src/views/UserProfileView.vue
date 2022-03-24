<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'
import IconLogo from '@/components/icons/IconLogo.vue'
import AppearanceComponent from '@/components/AppearanceComponent.vue'

const toast = useToast()
const userStore = useUserStore()
const userData = ref({
  name: '',
  email: '',
  password: ''
})
const user = computed(() => userStore.user)

async function updateProfile() {
  try {
    await userStore.updateProfile({
      name: userData.value.name,
      email: userData.value.email,
      password: userData.value.password
    })
    toast.success('Update profile')
    userData.value.name = userData.value.email = userData.value.password = ''
  } catch (error) {
    toast.error(error.message)
    console.log(error.message)
  }
}

const hasDataChanged = computed(() => {
  // Name exist and is different\
  return (
    (userData.value.name && userData.value.name !== user.value.displayName) ||
    (userData.value.email && userData.value.email !== user.value.email) ||
    userData.value.password.length
  )
})
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
        Update profile
      </button>
    </form>
  </section>
</template>
