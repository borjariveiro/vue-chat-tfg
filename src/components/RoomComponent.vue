<script setup>
// Props
const props = defineProps({
  rooms: Array
})
</script>

<template>
  <div
    v-if="!props.rooms.length"
    class="flex items-center justify-center text-4xl text-slate-900 dark:text-white h-72"
  >
    <h1>No rooms avaibale</h1>
  </div>

  <div
    v-else
    v-for="room in props.rooms"
    :key="room.id"
    class="dark:hover:bg-slate-700 hover:bg-gray-200"
  >
    <router-link
      :to="{
        name: 'chat',
        params: {
          id: room.id,
          roomName: room.name,
          roomDescription: room.description
        }
      }"
      class="w-full"
    >
      <div class="flex items-center w-full p-2">
        <div class="flex justify-center w-1/4">
          <div class="relative">
            <img
              class="object-cover w-16 h-16 rounded-full"
              :src="room.image"
              alt="Room image"
            />
          </div>
        </div>
        <div class="w-3/4 p-3">
          <h3
            :title="room.name"
            class="text-xl font-bold tracking-tight text-gray-900 truncate dark:text-white"
          >
            {{ room.name }}
          </h3>

          <p
            :title="room.description"
            class="w-full font-normal text-gray-700 truncate dark:text-gray-400"
          >
            {{ room.description }}
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>
