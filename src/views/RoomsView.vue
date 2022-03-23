<script setup>
// import RoomComponent from '@/components/RoomComponent.vue'
// import IconSearch from '@/components/icons/IconSearch.vue'
// import { useUserStore } from '@/stores/user'
// import { useRoomsStore } from '@/stores/rooms'
// import { useMessagesStore } from '@/stores/messages'
// import { computed } from 'vue'
import { RouterView } from 'vue-router'
import SidebarComponent from '../components/SidebarComponent.vue'

// const userStore = useUserStore()
// const roomsStore = useRoomsStore()
// const messagesStore = useMessagesStore()

// const unreadMessages = computed(() => {
//   return messagesStore.messages.filter((message) => {
//     return (
//       userStore.meta.joined[message.roomId].toMillis() &&
//       userStore.meta.joined[message.roomId].toMillis() <
//         message.createdAt.toMillis()
//     )
//   })
// })
</script>

<template>
  <div class="grid grid-cols-[2fr_5fr] h-full">
    <SidebarComponent />
    <RouterView name="ChatView"></RouterView>
    <!-- <div class="text-white">Chat</div> -->
  </div>
  <!-- <div
    class="container flex flex-wrap items-center justify-between px-4 mx-auto"
  >
    <router-link
      to="/createRoom"
      class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
      >Create room
    </router-link>

    <div class="relative mt-1">
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <IconSearch class="text-gray-400" />
      </div>
      <input
        type="text"
        name="finder"
        placeholder="Search rooms"
        class="shadow-sm bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 pl-10 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-sm-light w-44 sm:w-48"
      />
    </div>
  </div> -->
  <!-- <section class="container flex flex-wrap gap-4 px-4 mx-auto mt-8">
    <RoomComponent
      :rooms="roomsStore.rooms"
      :unread-messages="unreadMessages"
    />
  </section> -->
</template>
