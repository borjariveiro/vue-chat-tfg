<template>
  <section>
    <form @submit.prevent="doLogin">
      <label for="email">Email</label>
      <input
        v-model="userData.email"
        type="text"
        required
        class="border-2"
        name="email"
        id="email"
      />

      <label for="password">Password</label>
      <input
        v-model="userData.password"
        type="password"
        required
        class="border-2"
        name="password"
        id="password"
      />
      <button class="border-2 ml-3 px-2 py-1 rounded">Sign in</button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

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
