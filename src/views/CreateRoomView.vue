<script setup>
import { ref } from 'vue'
import { useRoomsStore } from '@/stores/rooms'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const roomsStore = useRoomsStore()
const router = useRouter()
const toast = useToast()
const roomData = ref({
  name: '',
  description: ''
})
const isLoading = ref(false)

async function createRoom() {
  isLoading.value = true
  try {
    await roomsStore.createRoom({
      name: roomData.value.name,
      description: roomData.value.description
    })
    resetData()
    router.push({ name: 'rooms' })
    toast.success('Sala creada')
  } catch (error) {
    toast.error(error.message)
    console.log(error.message)
  } finally {
    isLoading.value = false
  }
}

function resetData() {
  roomData.value.name = roomData.value.description = ''
}
</script>

<template>
  <section class="flex flex-col items-center gap-4 pt-10">
    <h1 class="text-2xl font-medium text-slate-200">Create room</h1>
    <form @submit.prevent="createRoom" class="p-4 bg-gray-800 rounded-lg w-80">
      <div class="mb-6">
        <label
          for="Name"
          class="block mb-2 text-base font-medium text-gray-900 dark:text-gray-300"
          >Name</label
        >
        <input
          v-model="roomData.name"
          type="Name"
          required
          name="Name"
          id="Name"
          placeholder="Room name"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-sm-light"
        />
      </div>
      <div class="mb-6">
        <label
          for="message"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >Description</label
        >
        <textarea
          v-model="roomData.description"
          id="description"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write a description for your room"
        ></textarea>
      </div>
      <button
        type="submit"
        class="w-full px-5 py-2 text-base font-medium text-center text-white rounded-lg bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
      >
        Create
      </button>
    </form>
  </section>
</template>
