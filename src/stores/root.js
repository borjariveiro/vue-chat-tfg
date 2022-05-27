import { defineStore } from 'pinia'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useUserStore } from './user'
import { useRoomsStore } from './rooms'
import { useMessagesStore } from './messages'
import { useToast } from 'vue-toastification'

export const useRootStore = defineStore('root', {
  actions: {
    checkAuth() {
      const userStore = useUserStore()
      const roomsStore = useRoomsStore()
      const messagesStore = useMessagesStore()
      const toast = useToast()
      console.log('CheckAuth')
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          userStore.setUser(user)
          try {
            await roomsStore.getRooms()
            await messagesStore.getMessages()
          } catch (error) {
            console.log(error)
            toast.error(error.message)
          }
        } else {
          userStore.setUserListener(() => {})

          roomsStore.setRooms([])
          roomsStore.setRoomsListener(() => {})

          messagesStore.setMessages([])
          messagesStore.setMessagesListener(() => {})

          userStore.setUser(null)
        }
      })
    }
  }
})
