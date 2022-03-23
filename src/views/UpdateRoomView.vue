<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoomsStore } from '@/stores/rooms'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import IconLogo from '@/components/icons/IconLogo.vue'

// Props
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

// Data
const room = ref({
  name: '',
  description: ''
})
const image = ref('')
const imageURL = ref('')
const file = ref(null)
const isLoading = ref(false)
let roomTemp = null

//Computed properties
const roomImage = computed(() => {
  return imageURL.value
})

// Stores and utils
const roomsStore = useRoomsStore()
const router = useRouter()
const toast = useToast()

onMounted(async () => {
  try {
    roomTemp = await roomsStore.getRoom(props.id)
    room.value.name = roomTemp.name
    room.value.description = roomTemp.description
    imageURL.value = roomTemp.image
  } catch (error) {
    console.log(error.message)
    toast.error(error.message)
    router.push({ name: 'rooms' })
  }
})

async function updateRoom() {
  isLoading.value = true

  if (image.value) {
    imageURL.value = await roomsStore.uploadRoomImage({
      roomId: props.id,
      file: image.value
    })
  }

  try {
    await roomsStore.updateRoom({
      roomID: props.id,
      name: room.value.name,
      description: room.value.description,
      image: imageURL.value
    })
    toast.success('Sala editada')
    router.push({ name: 'rooms' })
  } catch (error) {
    toast.error(error.message)
    console.log(error.message)
    router.push({ name: 'rooms' })
  } finally {
    isLoading.value = false
  }
}
async function removeRoom() {
  isLoading.value = true
  try {
    await roomsStore.removeRoom({
      roomID: props.id
    })
    toast.success('Sala borrada')
    router.push({ name: 'rooms' })
  } catch (error) {
    toast.error(error.message)
    console.log(error.message)
    router.push({ name: 'rooms' })
  } finally {
    isLoading.value = false
  }
}

function onFileChange(event) {
  image.value = event.target.files[0]
  imageURL.value = URL.createObjectURL(image.value)
  file.value = null
}

function onFileDelete() {
  image.value = null
  imageURL.value = roomTemp.image
}
</script>

<template>
  <section class="flex flex-col items-center gap-4 pt-10">
    <router-link to="/">
      <IconLogo :width="80" :height="80" />
    </router-link>
    <h1 class="text-2xl font-medium text-slate-200">Edit room</h1>
    <form @submit.prevent="updateRoom" class="p-4 bg-gray-800 rounded-lg w-80">
      <div class="mb-6">
        <label
          for="Name"
          class="block mb-2 text-base font-medium text-gray-900 dark:text-gray-300"
          >Name</label
        >
        <input
          v-model="room.name"
          type="Name"
          required
          name="Name"
          id="Name"
          placeholder="New name root"
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
          v-model="room.description"
          id="description"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write a description for your room"
        ></textarea>
      </div>
      <div class="mb-6">
        <div
          class="w-auto h-40 mb-2 bg-no-repeat bg-contain"
          :style="{
            'background-image': `url(${roomImage})`
          }"
        >
          <button
            href="#"
            v-if="image"
            @click.prevent="onFileDelete"
            class="float-right font-black text-red-700"
          >
            X
          </button>
        </div>

        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          for="user_avatar"
          >Upload file</label
        >
        <input
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="user_avatar_help"
          id="user_avatar"
          type="file"
          @change="onFileChange"
          ref="file"
        />
      </div>
      <button
        type="submit"
        class="w-full px-5 py-2 text-base font-medium text-center text-white rounded-lg bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Edit
      </button>
    </form>
    <button
      type="button"
      @click="removeRoom"
      class="w-auto px-5 py-2 text-base font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-emerald-300 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Delete room
    </button>
  </section>
</template>
