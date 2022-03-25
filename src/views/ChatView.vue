<script setup>
import { ref, nextTick, computed } from 'vue'
import { useToast } from 'vue-toastification'
import { useMessagesStore } from '@/stores/messages'
import { useUserStore } from '@/stores/user'
import { useHead } from '@vueuse/head'
import ChatComponent from '@/components/ChatComponent.vue'
import IconClip from '@/components/icons/IconClip.vue'
import IconLogo from '@/components/icons/IconLogo.vue'

// Stores and utils
const userStore = useUserStore()
const messagesStore = useMessagesStore()
const toast = useToast()

// Props
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  roomName: {
    type: String
  },
  roomDescription: {
    type: String
  }
})

// Data
const message = ref(null)
const childRefs = ref(null)
const image = ref(null)
const file = ref(null)
const fileURL = ref(null)
const messageImage = () => {
  return URL.createObjectURL(image.value)
}

//Computed properties
const siteTitle = computed(() => {
  return `VueChat - ${props.roomName ?? 'Rooms'}`
})

useHead({
  title: siteTitle
})

// Methods
async function createMessage() {
  try {
    if (image.value) {
      fileURL.value = await messagesStore.uploadMessageImage({
        roomId: props.id,
        file: image.value
      })
    }
    await messagesStore.createMessage({
      roomId: props.id,
      message: message.value,
      image: fileURL.value
    })
    scrollDown()
    message.value = ''
    image.value = fileURL.value = null
    userStore.updateMeta({
      roomID: props.id,
      exit: false,
      uid: userStore.user.uid
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
    const height = childRefs.value.messages.scrollHeight
    childRefs.value.chat.scrollTo({
      top: height,
      behavior: 'smooth'
    })
  })
}
</script>

<template>
  <div class="flex flex-col items-center w-full h-full overflow-hidden">
    <!-- Header chat -->
    <section
      class="flex items-center justify-between w-full h-20 p-5 bg-gray-200 dark:bg-gray-800"
    >
      <div class="max-w-lg">
        <h2
          :title="props.roomName"
          class="mb-1 text-xl font-semibold text-gray-700 truncate dark:text-white"
        >
          {{ roomName }}
        </h2>
        <h3
          :title="props.roomDescription"
          class="mb-1 text-sm truncate text-slate-500 dark:text-slate-400"
        >
          {{ roomDescription }}
        </h3>
      </div>
      <div class="flex gap-2 xl:gap-4">
        <router-link
          :to="{ name: 'updateRoom', params: { id: props.id } }"
          class="btn-secondary"
          >Edit room
        </router-link>
      </div>
    </section>

    <!-- Body chat -->
    <ChatComponent :id="props.id" ref="childRefs" />

    <!-- Input chat -->
    <section class="relative w-full h-16 bg-gray-200 dark:bg-slate-800">
      <div v-if="image" class="absolute left-2 bottom-16 w-96">
        <button @click="image = null" class="absolute top-1 right-1">❌</button>
        <img :src="messageImage()" alt="Image send" class="object-contain" />
      </div>
      <form
        @submit.prevent="createMessage"
        class="flex items-center justify-center h-full"
      >
        <div class="flex items-center justify-center mx-3">
          <button type="button" @click="file.click()">
            <IconClip :width="40" :height="40" class="stroke-slate-900" />
          </button>
          <input type="file" @change="onFileChange" ref="file" class="hidden" />
        </div>
        <input
          v-model="message"
          type="text"
          placeholder="Write a message here"
          class="w-full pl-3 rounded text-slate-900 dark:text-white h-9 bg-neutral-100 dark:bg-slate-700"
        />
        <button
          :disabled="!message"
          class="mx-3 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IconLogo :width="40" :height="40" class="rotate-90" />
        </button>
      </form>
    </section>
  </div>
</template>
