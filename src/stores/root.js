import { defineStore } from 'pinia'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useUserStore } from './user'

export const useRootStore = defineStore('root', {
  actions: {
    checkAuth() {
      const userStore = useUserStore()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          userStore.setUser(user)
        } else {
          userStore.setUser(null)
        }
      })
    }
  }
})
