<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'

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
  <section class="flex flex-col items-center h-screen gap-4 bg-slate-900">
    <router-link to="/">
      <svg
        class="h-10 mt-10"
        viewBox="0 0 52 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.87695 53H28.7791C41.5357 53 51.877 42.7025 51.877 30H24.9748C12.2182 30 1.87695 40.2975 1.87695 53Z"
          fill="#76A9FA"
        />
        <path
          d="M0.000409561 32.1646L0.000409561 66.4111C12.8618 66.4111 23.2881 55.9849 23.2881 43.1235L23.2881 8.87689C10.9966 8.98066 1.39567 19.5573 0.000409561 32.1646Z"
          fill="#A4CAFE"
        />
        <path
          d="M50.877 5H23.9748C11.2182 5 0.876953 15.2975 0.876953 28H27.7791C40.5357 28 50.877 17.7025 50.877 5Z"
          fill="#1C64F2"
        />
      </svg>
    </router-link>
    <h1 class="text-2xl font-medium dark:text-emerald-400">Profile</h1>
    <form
      @submit.prevent="updateProfile"
      class="p-4 bg-gray-800 rounded-lg w-80"
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
      <button
        class="w-full px-5 py-2 text-base font-medium text-center text-white rounded-lg bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="!hasDataChanged"
      >
        Update profile
      </button>
    </form>
  </section>
</template>
