<template>
  <section>
    <form @submit.prevent="doRegister">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="userData.name"
        type="text"
        required
        class="border-2"
      />
      <label for="email">Email</label>
      <input
        id="email"
        v-model="userData.email"
        type="text"
        required
        class="border-2"
      />
      <label for="password">Password</label>
      <input
        id="password"
        v-model="userData.password"
        type="password"
        required
        class="border-2"
      />
      <button class="border-2 px-2 py-1 ml-2 rounded">Create account</button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const userStorage = useUserStore()
const router = useRouter()
const toast = useToast()

// const isLogin = ref(true)
// const isLoading = ref(false)
const userData = ref({
  name: '',
  email: '',
  password: ''
})

async function doRegister() {
  // isLoading.value = true
  try {
    await userStorage.doRegister({
      name: userData.value.name,
      email: userData.value.email,
      password: userData.value.password
    })
    toast.success('Cuenta creada')

    router.push({ name: 'Home' })
  } catch (error) {
    toast.error(error.message)
    resetData()
    console.log(error.message)
  } finally {
    // isLoading.value = false
  }
}

function resetData() {
  userData.value.name = userData.value.email = userData.value.password = ''
}
</script>
