<script setup>
import { computed, onMounted, watch } from 'vue'
import { useMessagesStore } from '@/stores/messages'
import { useUserStore } from '@/stores/user'
import { useToast } from 'vue-toastification'
import { formatRelative } from 'date-fns'
import { es } from 'date-fns/locale'
import { ref } from 'vue'

const userStore = useUserStore()
const messagesStore = useMessagesStore()
const toast = useToast()

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const messages = ref('')
const chat = ref('')

defineExpose({
  chat,
  messages
})

const roomMessages = computed(() => {
  return messagesStore.messages.filter((message) => message.roomId === props.id)
})

onMounted(async () => {
  try {
    userStore.updateMeta({
      roomID: props.id,
      exit: false,
      uid: userStore.user.uid
    })
  } catch (error) {
    console.log(error.message)
    toast.error(error.message)
  }
})
watch(
  () => props.id,
  async (newId, oldId) => {
    userStore.updateMeta({
      roomID: oldId,
      exit: true,
      uid: userStore.user.uid
    })
  }
)

async function deleteMessage(messageId) {
  try {
    const message = roomMessages.value.find((message) => {
      return message.id === messageId
    })
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

function timeAgo(timestamp) {
  const time = new Date(timestamp * 1000)
  const actualtime = Date.now()
  return formatRelative(time, actualtime, { locale: es, weekStartsOn: 1 })
}
// onUpdated(() => {
//   userStore.updateMeta({
//     roomID: props.id,
//     exit: true,
//     uid: userStore.user.uid
//   })
// })

// onUnmounted(() => {
//   userStore.updateMeta({
//     roomID: props.id,
//     exit: true,
//     uid: userStore.user.uid
//   })
//   console.log('Se desmonta')
// })
</script>

<template>
  <section
    class="relative flex flex-col-reverse items-center w-full h-full overflow-x-hidden overflow-y-auto"
    ref="chat"
  >
    <div class="relative flex flex-col w-3/4 gap-2 py-2" ref="messages">
      <div
        v-for="message in roomMessages"
        :key="message.id"
        :class="{
          'self-end': message.userId === userStore.getUserUid,
          '!bg-emerald-500': message.userId === userStore.getUserUid
        }"
        class="self-start h-auto max-w-sm px-4 py-2 break-words rounded shadow-md text-slate-900 dark:text-white bg-slate-50 dark:bg-gray-800"
      >
        <div>
          <img
            v-if="message.image"
            :src="message.image"
            alt="Image send"
            class="object-contain"
          />
        </div>

        <p
          v-if="message.userId !== userStore.getUserUid"
          class="text-sm text-gray-500 dark:text-gray-400"
        >
          <small
            >{{ message.userName }} -
            {{ timeAgo(message.createdAt.seconds) }}</small
          >
        </p>

        <p class="relative text-slate-900 dark:text-white">
          <button
            type="button"
            v-if="message.userId === userStore.getUserUid"
            @click="deleteMessage(message.id)"
            class="absolute font-bold -top-3 -right-3 text-slate-400 dark:text-slate-500"
          >
            x
          </button>
          {{ message.message }}
        </p>
      </div>
    </div>
  </section>
</template>
