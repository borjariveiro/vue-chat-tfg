import { defineStore } from 'pinia'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useUserStore } from './user'
import { useRoomsStore } from './rooms'
import { useMessagesStore } from './messages'

export const useRootStore = defineStore('root', {
  actions: {
    checkAuth() {
      const userStore = useUserStore()
      const roomsStore = useRoomsStore()
      const messagesStore = useMessagesStore()
      console.log('CheckAuth')
      onAuthStateChanged(auth, (user) => {
        if (user) {
          userStore.setUser(user)
          roomsStore.getRooms()
        } else {
          userStore.setUser(null)
          roomsStore.setRooms([])
          roomsStore.setRoomsListener(() => {})
          messagesStore.setMessages([])
          messagesStore.setMessagesListener(() => {})
        }
      })
    }
  }
})
