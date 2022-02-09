<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import IconLogo from '@/components/icons/IconLogo.vue'

const userStore = useUserStore()
const router = useRouter()
const toast = useToast()
// const isLogin = ref(true)
// const isLoading = ref(false)
const userData = ref({
  email: '',
  password: ''
})

async function doLogin() {
  // isLoading.value = true
  try {
    await userStore.doLogin({
      email: userData.value.email,
      password: userData.value.password
    })
    resetData()
    router.push({ name: 'chat' })
    toast.success('Sesion iniciada')
  } catch (error) {
    toast.error(error.message)
    console.log(error.message)
  } finally {
    // isLoading.value = false
  }
}

function resetData() {
  userData.value.name = userData.value.email = userData.value.password = ''
}
</script>

<template>
  <section class="flex flex-col items-center gap-4 pt-10">
    <router-link to="/">
      <IconLogo />
    </router-link>
    <h1 class="text-2xl font-medium text-slate-200">Log in to VueChat</h1>
    <form @submit.prevent="doLogin" class="p-4 bg-gray-800 rounded-lg w-80">
      <div class="mb-6">
        <label
          for="email"
          class="block mb-2 text-base font-medium text-gray-900 dark:text-gray-300"
          >Email</label
        >
        <input
          v-model="userData.email"
          type="email"
          required
          name="email"
          id="email"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-sm-light"
        />
      </div>
      <div class="mb-6">
        <label
          for="password"
          class="block mb-2 text-base font-medium text-gray-900 dark:text-gray-300"
          >Password</label
        >
        <input
          v-model="userData.password"
          type="password"
          required
          name="password"
          id="password"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-sm-light"
        />
        <router-link
          to="/password_reset"
          class="text-sm text-blue-600 hover:underline dark:text-blue-500"
        >
          Forgot your password?
        </router-link>
      </div>
      <button
        class="w-full px-5 py-2 text-base font-medium text-center text-white rounded-lg bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
      >
        Sign in
      </button>
    </form>
    <div class="text-base">
      <label for="terms" class="font-medium text-gray-900 dark:text-gray-300">
        New to VueChat?
        <router-link
          to="/register"
          class="text-blue-600 hover:underline dark:text-blue-500"
        >
          Create and account.
        </router-link>
      </label>
    </div>
  </section>
</template>
