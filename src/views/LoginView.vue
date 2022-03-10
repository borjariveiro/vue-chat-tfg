<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import IconLogo from '@/components/icons/IconLogo.vue'
import IconGoogle from '@/components/icons/IconGoogle.vue'

const userStore = useUserStore()
const router = useRouter()
const toast = useToast()
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
    router.push({ name: 'rooms' })
    toast.success('Sesion iniciada')
  } catch (error) {
    toast.error(error.message)
    console.log(error.message)
  } finally {
    // isLoading.value = false
  }
}

async function doLoginWithGoogle() {
  // isLoading.value = true
  try {
    await userStore.doLoginWithGoogle()
    router.push({ name: 'rooms' })
    toast.success('Sesion iniciada con cuenta de Google')
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
  <section class="flex flex-col items-center gap-6 pt-16">
    <div class="flex">
      <IconLogo :width="80" :height="80" />
      <h1
        class="self-center text-3xl font-semibold sm:text-4xl whitespace-nowrap text-slate-200"
      >
        VueChat
      </h1>
    </div>
    <h2 class="text-3xl font-light font-medium sm:text-4xl text-slate-200">
      Log in to VueChat
    </h2>
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
          class="input-form"
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
          class="input-form"
        />
        <router-link
          to="/password_reset"
          class="text-sm text-blue-600 hover:underline dark:text-blue-500"
        >
          Forgot your password?
        </router-link>
      </div>
      <button type="submit" class="btn-primary">Sign in</button>
      <div class="flex flex-col items-center mt-4 text-slate-400">
        <p>Or log in with</p>
        <button
          @click="doLoginWithGoogle"
          type="button"
          class="p-1.5 mt-2 bg-gray-900 rounded-full"
        >
          <IconGoogle />
        </button>
      </div>
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
