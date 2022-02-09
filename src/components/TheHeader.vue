<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const userStore = useUserStore()
const router = useRouter()
const toast = useToast()
const user = computed(() => userStore.user)

async function doLogout() {
  try {
    await userStore.doLogout()
    toast.success('Sesion cerrada')
    router.push({ name: 'login' })
  } catch (error) {
    toast.error('Error al cerrar sesion')
    console.log(error.message)
  }
}
</script>

<template>
  <header class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
    <div class="container flex flex-wrap items-center justify-between mx-auto">
      <router-link to="/" class="flex">
        <svg
          class="h-10 mr-3"
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
        <span
          class="self-center text-base font-semibold sm:text-xl whitespace-nowrap text-slate-200"
          >VueChat</span
        >
      </router-link>
      <div v-if="!user" class="flex gap-1 sm:gap-4">
        <router-link
          to="/login"
          class="text-white hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:border-emerald-700 dark:border-2 dark:focus:ring-emerald-800 dark:hover:bg-emerald-700"
          >Log in
        </router-link>
        <router-link
          to="/register"
          class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center md:mr-0 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
          >Create account
        </router-link>
      </div>
      <div v-if="user" class="flex gap-1 sm:gap-4">
        <router-link
          to="/profile"
          class="text-white hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:border-emerald-700 dark:border-2 dark:focus:ring-emerald-800 dark:hover:bg-emerald-700"
          >Profile
        </router-link>
        <button
          @click="doLogout"
          class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center md:mr-0 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
</template>
