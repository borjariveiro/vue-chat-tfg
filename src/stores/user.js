import { defineStore } from 'pinia'
import { auth } from '@/firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut
} from 'firebase/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    setUser(user) {
      this.user = user
    },

    async doLogin({ email, password }) {
      await signInWithEmailAndPassword(auth, email, password)
      this.setUser(auth.currentUser)
    },
    async doRegister({ name, email, password }) {
      await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(auth.currentUser, {
        displayName: name
      })
      this.setUser(auth.currentUser)
    },
    async doLogout() {
      await signOut(auth)
      this.setUser(null)
    }
  }
})
