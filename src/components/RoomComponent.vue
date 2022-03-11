<script setup>
const props = defineProps({
  rooms: Array,
  unreadMessages: Array
})

// function hasUnreadMessages(roomId) {
//   return props.unreadMessages.filter((message) => {
//     return message.roomId === roomId
//   })
// }
</script>

<template>
  <!-- <div
    v-if="!props.rooms"
    class="flex items-center justify-center w-screen text-4xl text-white h-72"
  >
    <h1>No rooms avaibale.</h1>
  </div> -->

  <div
    v-for="room in props.rooms"
    :key="room.id"
    class="flex w-full bg-white dark:bg-slate-900 dark:border-gray-700 hover:bg-slate-700"
  >
    <router-link :to="{ name: 'chat', params: { id: room.id } }" class="w-full">
      <div class="flex items-center p-2">
        <img
          class="object-cover w-16 h-16 rounded-full"
          :src="room.image"
          :alt="room.description"
        />
        <div class="p-3">
          <!-- <div v-if="hasUnreadMessages(room.id).length" class="text-red-600">
          {{ hasUnreadMessages(room.id).length }} unread messages
        </div> -->
          <h3
            :title="room.name"
            class="text-xl font-bold tracking-tight text-gray-900 truncate dark:text-white"
          >
            {{ room.name }}
          </h3>
          <!-- <h4
          :title="room.adminName"
          class="mb-2 tracking-tight text-gray-700 truncate text-1xl dark:text-gray-500"
        >
          By {{ room.adminName }}
        </h4> -->

          <p
            :title="room.description"
            class="font-normal text-gray-700 truncate dark:text-gray-400"
          >
            {{ room.description }}
          </p>
        </div>
      </div>
    </router-link>
  </div>
  <!-- <div class="self-end px-5">
      <router-link
        :to="{ name: 'updateRoom', params: { id: room.id } }"
        class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg inline-block text-sm mb-4 px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
        >Edit
      </router-link>
    </div> -->
</template>
