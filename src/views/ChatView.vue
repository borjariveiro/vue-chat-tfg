<script setup>
import IconLogo from '@/components/icons/IconLogo.vue'
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import { useRoomsStore } from '@/stores/rooms'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { useMessagesStore } from '@/stores/messages'
import { useUserStore } from '@/stores/user'
import { formatRelative } from 'date-fns'
import { es } from 'date-fns/locale'

const roomsStore = useRoomsStore()
const messagesStore = useMessagesStore()
const userStore = useUserStore()
const router = useRouter()
const toast = useToast()

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const room = ref({
  name: '',
  description: ''
})
const message = ref('')
const messages = ref()
// const isLoading = ref(false)

onMounted(async () => {
  try {
    let roomTemp = roomsStore.getRoom(props.id)
    room.value.name = roomTemp.name
    room.value.description = roomTemp.description
    await messagesStore.getMessages(props.id)
  } catch (error) {
    console.log(error.message)
    toast.error(error.message)
    router.push({ name: 'rooms' })
  }
})

async function createMessage() {
  try {
    await messagesStore.createMessage({
      roomId: props.id,
      message: message.value
    })
    scrollDown()
    message.value = ''
  } catch (error) {
    toast.error(error.message)
    console.log(error.message)
  }
}

function scrollDown() {
  nextTick(() => {
    const height = messages.value.scrollHeight
    window.scrollTo({
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
  messagesStore.setMessagesListener(() => {})
})
</script>

<template>
  <div class="container relative flex justify-center h-5/6">
    <section class="flex flex-col items-center w-9/12 h-full">
      <h1 class="mb-2 text-3xl text-white">{{ room.name }}</h1>
      <div ref="messages">
        <div
          v-for="message in messagesStore.messages"
          :key="message.id"
          class="w-64 px-4 py-3 mb-3 text-white border-2 rounded shadow-md dark:bg-gray-800 dark:border-gray-700"
          :class="{
            'dark:bg-emerald-600': message.userId === userStore.getUserUid
          }"
        >
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
        <button :disabled="!message" class="text-white">
          <IconLogo />Send
        </button>
      </form>
    </section>
  </div>
</template>
