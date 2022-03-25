<script setup>
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useHead } from '@vueuse/head'
import IconLogo from '@/components/icons/IconLogo.vue'
import IconSpinner from '@/components/icons/IconSpinner.vue'

// Stores and utils
const userStore = useUserStore()
const router = useRouter()
const toast = useToast()
useHead({
  title: 'VueChat - Reset password'
})

// Data
const isLoading = ref(false)
const userData = reactive({
  email: ''
})

// Methods
async function doResetPassword() {
  isLoading.value = true
  try {
    await userStore.doResetPassword({ email: userData.email })
    router.push({ name: 'login' })
    toast.success(`Please check ${userData.email} for further instructions`)
  } catch (error) {
    toast.error(error.message)
    console.log(error.message)
  } finally {
    isLoading.value = false
  }
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
      Reset password
    </h2>
    <form
      @submit.prevent="doResetPassword"
      class="p-4 bg-gray-200 rounded-lg dark:bg-gray-800 w-80"
    >
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
          class="input-form"
        />
      </div>
      <button class="btn-primary">
        <IconSpinner v-if="isLoading" />
        <span v-else>Send password reset email</span>
      </button>
    </form>
  </section>
</template>
