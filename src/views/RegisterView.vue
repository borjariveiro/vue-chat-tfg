<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useHead } from '@vueuse/head'
import IconLogo from '@/components/icons/IconLogo.vue'
import IconSpinner from '@/components/icons/IconSpinner.vue'

// Stores and utils
const userStorage = useUserStore()
const router = useRouter()
const toast = useToast()
useHead({
  title: 'VueChat - Register'
})

// Data
const isLoading = ref(false)
const userData = reactive({
  name: '',
  email: '',
  password: ''
})

// Methods
async function doRegister() {
  isLoading.value = true
  try {
    await userStorage.doRegister({
      name: userData.name,
      email: userData.email,
      password: userData.password
    })
    toast.success('Cuenta creada')
    router.push({ name: 'rooms' })
  } catch (error) {
    toast.error(error.message)
    console.log(error.message)
    resetData()
  } finally {
    isLoading.value = false
  }
}

function resetData() {
  userData.name = userData.email = userData.password = ''
}
</script>

<template>
  <section class="flex flex-col items-center gap-6 pt-16">
    <router-link to="/" class="flex">
      <IconLogo :width="80" :height="80" />
      <h1
        class="self-center text-2xl font-semibold text-gray-700 sm:text-4xl whitespace-nowrap dark:text-slate-200"
      >
        VueChat
      </h1>
    </router-link>
    <h2
      class="text-2xl font-light text-gray-700 sm:text-4xl dark:text-slate-200"
    >
      Create account to VueChat
    </h2>

    <form
      @submit.prevent="doRegister"
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
          required
          class="input-form"
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
          required
          class="input-form"
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
          required
          class="input-form"
        />
      </div>
      <button class="btn-primary">Create account</button>
    </form>
    <div class="text-base">
      <label for="terms" class="font-medium text-gray-900 dark:text-gray-300">
        Already have an account?
        <router-link
          to="/login"
          class="text-blue-600 hover:underline dark:text-blue-500"
        >
          <IconSpinner v-if="isLoading" />
          <span v-else>Log in</span>
        </router-link>
      </label>
    </div>
  </section>
</template>
