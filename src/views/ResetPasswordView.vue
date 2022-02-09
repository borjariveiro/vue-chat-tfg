<template>
  <section>
    <form @submit.prevent="doResetPassword">
      <label for="email">Email</label>
      <input
        v-model="userData.email"
        type="text"
        required
        class="border-2"
        name="email"
        id="email"
      />
      <button class="border-2 ml-3 px-2 py-1 rounded">
        Send password reset email
      </button>
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
  email: ''
})

async function doResetPassword() {
  try {
    await userStore.doResetPassword({ email: userData.value.email })
    router.push({ name: 'login' })
    toast.success(
      `Please check ${userData.value.email} for further instructions`
    )
  } catch (error) {
    toast.error(error.message)
    console.log(error.message)
  }
}
</script>
