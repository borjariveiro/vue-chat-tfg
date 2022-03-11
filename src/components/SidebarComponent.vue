<script setup>
import { useUserStore } from '@/stores/user'
import { useRoomsStore } from '@/stores/rooms'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import RoomComponent from '@/components/RoomComponent.vue'
import IconLogo from './icons/IconLogo.vue'
import IconSearch from './icons/IconSearch.vue'
import IconPlus from './icons/IconPlus.vue'

const userStore = useUserStore()
const roomsStore = useRoomsStore()
const router = useRouter()
const toast = useToast()

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
  <div class="flex flex-col h-full overflow-hidden">
    <!-- Header -->
    <header class="flex items-center justify-between h-20 p-1 bg-gray-800">
      <div class="flex mr-4">
        <IconLogo :width="50" :height="50" />
        <span
          class="self-center text-lg font-semibold whitespace-nowrap text-slate-200"
          >VueChat</span
        >
      </div>
      <div class="flex gap-2 xl:gap-4">
        <router-link to="/profile" class="btn-secondary">Profile </router-link>
        <button @click="doLogout" class="btn-primary">Logout</button>
      </div>
    </header>

    <!-- Search -->
    <div class="flex items-center justify-between w-full px-2 py-2">
      <div class="relative w-2/3">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <IconSearch class="text-gray-400" />
        </div>
        <input
          type="text"
          name="finder"
          placeholder="Search rooms"
          class="input-search"
        />
      </div>
      <div>
        <router-link :to="{ name: 'createRoom' }"><IconPlus /></router-link>
      </div>
    </div>

    <!-- Rooms -->
    <section class="flex flex-col w-full overflow-y-auto">
      <RoomComponent :rooms="roomsStore.rooms" />
    </section>
  </div>
</template>
