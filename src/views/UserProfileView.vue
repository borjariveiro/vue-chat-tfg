<template>
  <section>
    <h1>Profile</h1>
    <form @submit.prevent="updateProfile">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="userData.name"
        type="text"
        class="border-2"
        :placeholder="user.displayName"
      />
      <label for="email">Email</label>
      <input
        id="email"
        v-model="userData.email"
        type="text"
        class="border-2"
        :placeholder="user.email"
      />
      <label for="password">Password</label>
      <input
        id="password"
        v-model="userData.password"
        type="password"
        class="border-2"
      />
      <button
        class="border-2 px-2 py-1 ml-2 rounded"
        :disabled="!hasDataChanged"
      >
        Update profile
      </button>
    </form>
  </section>
</template>

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
