<script setup>
import IconLogo from '@/components/icons/IconLogo.vue'
import IconClip from '@/components/icons/IconClip.vue'
import { ref, nextTick, onMounted, onUnmounted, computed } from 'vue'
import { useRoomsStore } from '@/stores/rooms'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { useMessagesStore } from '@/stores/messages'
import { useUserStore } from '@/stores/user'
import { formatRelative } from 'date-fns'
import { es } from 'date-fns/locale'

// Stores and utils
const userStore = useUserStore()
const roomsStore = useRoomsStore()
const messagesStore = useMessagesStore()
const router = useRouter()
const toast = useToast()

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
const chat = ref(null)
const message = ref(null)
const messages = ref(null)
const image = ref(null)
const file = ref(null)
const fileURL = ref(null)

//Computed properties
const roomMessages = computed(() => {
  return messagesStore.messages.filter((message) => message.roomId === props.id)
})

const messageImage = () => {
  return URL.createObjectURL(image.value)
}

onMounted(async () => {
  try {
    let roomTemp = await roomsStore.getRoom(props.id)
    room.value.name = roomTemp.name
    room.value.description = roomTemp.description
    userStore.updateMeta({
      roomID: props.id,
      exit: false,
      uid: userStore.user.uid
    })
    scrollDown()
  } catch (error) {
    console.log(error.message)
    toast.error(error.message)
    router.push({ name: 'rooms' })
  }
})

async function createMessage() {
  try {
    if (image.value) {
      console.log('entro')
      fileURL.value = await messagesStore.uploadMessageImage({
        roomId: props.id,
        file: image.value
      })
    }
    console.log(fileURL.value)
    await messagesStore.createMessage({
      roomId: props.id,
      message: message.value,
      image: fileURL.value
    })
    scrollDown()
    message.value = ''
    image.value = fileURL.value = null
  } catch (error) {
    toast.error(error.message)
    console.log(error.message)
  }
}

async function deleteMessage(messageId) {
  try {
    const message = roomMessages.value.find((message) => {
      return message.id === messageId
    })
    // console.log(message)
    // console.log(
    //   roomMessages.value.find((message) => {
    //     console.log(message.id === messageId)
    //     console.log(messageId)
    //     message.id === messageId
    //   })
    // )
    if (message.image) {
      await messagesStore.deleteFile(message.image)
    }
    await messagesStore.deleteMessage({
      roomId: props.id,
      messageId: message.id
    })
  } catch (error) {
    toast.error(error.message)
    console.log(error.message)
  }
}

function onFileChange(event) {
  image.value = event.target.files[0]
  fileURL.value = URL.createObjectURL(image.value)
  file.value = null
}

function scrollDown() {
  nextTick(() => {
    const height = messages.value.scrollHeight
    chat.value.scrollTo({
      top: height,
      behavior: 'smooth'
    })
  })
}

function timeAgo(timestamp) {
  const time = new Date(timestamp * 1000)
  const actualtime = Date.now()
  return formatRelative(time, actualtime, { locale: es, weekStartsOn: 1 })
}

onUnmounted(() => {
  userStore.updateMeta({
    roomID: props.id,
    exit: true,
    uid: userStore.user.uid
  })
})
</script>

<template>
  <div class="container relative flex justify-center h-5/6">
    <section
      class="flex flex-col items-center w-9/12 h-full overflow-y-auto"
      ref="chat"
    >
      <h1 class="mb-2 text-3xl text-white">{{ room.name }}</h1>
      <div ref="messages">
        <div
          v-for="message in roomMessages"
          :key="message.id"
          class="w-64 px-4 py-3 mb-3 text-white border-2 rounded shadow-md dark:bg-gray-800 dark:border-gray-700"
          :class="{
            'dark:bg-emerald-600': message.userId === userStore.getUserUid
          }"
        >
          <button
            type="button"
            v-if="message.userId === userStore.getUserUid"
            @click="deleteMessage(message.id)"
          >
            Borrar
          </button>
          <div
            v-if="message.image"
            class="w-64 h-64 bg-center bg-cover"
            :style="{ 'background-image': `url(${message.image})` }"
          ></div>
          <span
            v-if="message.userId !== userStore.getUserUid"
            class="text-sm text-gray-400"
          >
            <small
              >{{ message.userName }} -
              {{ timeAgo(message.createdAt.seconds) }}</small
            >
          </span>
          <p class="text-white">
            {{ message.message }}
          </p>
        </div>
      </div>
    </section>
    <section class="absolute inset-x-0 bottom-0 w-full">
      <form @submit.prevent="createMessage" class="">
        <input
          v-model="message"
          type="text"
          placerholder="Message"
          class="rounded"
        />
        <div
          v-if="image"
          @click="image = null"
          class="bg-center bg-cover w-80 h-80"
          :style="{ 'background-image': `url(${messageImage()})` }"
        ></div>
        <div class="inline">
          <button type="button" @click="file.click()"><IconClip /></button>
          <input type="file" @change="onFileChange" ref="file" class="hidden" />
        </div>
        <button :disabled="!message" class="text-white w">
          <IconLogo :width="50" :height="50" />
        </button>
      </form>
    </section>
  </div>
</template>
