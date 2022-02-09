<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
// import IconBase from './IconBase.vue'
import IconLogo from './icons/IconLogo.vue'

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
        <IconLogo />
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
