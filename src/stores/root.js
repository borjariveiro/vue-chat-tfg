import { defineStore } from 'pinia'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useUserStore } from './user'
import { useRoomsStore } from './rooms'

export const useRootStore = defineStore('root', {
  actions: {
    checkAuth() {
      const userStore = useUserStore()
      const roomsStore = useRoomsStore()
      console.log('CheckAuth')
      onAuthStateChanged(auth, (user) => {
        if (user) {
          userStore.setUser(user)
          console.log('Rooms added')
          roomsStore.getRooms()
        } else {
          userStore.setUser(null)
          roomsStore.setRooms([])
        }
      })
    }
  }
})
