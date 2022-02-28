import { defineStore } from 'pinia'
import { db } from '@/firebase'
import { auth } from '@/firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  updateEmail,
  updatePassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import {
  query,
  where,
  getDocs,
  collectionGroup,
  runTransaction
} from 'firebase/firestore'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  getters: {
    getUserUid() {
      return this.user.uid
    }
  },
  actions: {
    setUser(user) {
      this.user = user
    },

    async doLogin({ email, password }) {
      await signInWithEmailAndPassword(auth, email, password)
      this.setUser(auth.currentUser)
    },
    async doLoginWithGoogle() {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
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
      this.$reset
    },
    async doResetPassword({ email }) {
      await sendPasswordResetEmail(auth, email)
    },
    async updateProfile({ name, email, password }) {
      const user = auth.currentUser
      if (name) {
        await updateProfile(user, { displayName: name })
        await runTransaction(db, async (transaction) => {
          const messages = await query(
            collectionGroup(db, 'messages'),
            where('userId', '==', this.user.uid)
          )
          const querySnapshot = await getDocs(messages)
          querySnapshot.forEach((doc) => {
            transaction.update(doc.ref, { userName: name })
          })
        })
      }

      if (email) {
        await updateEmail(user, email)
      }

      if (password) {
        await updatePassword(user, password)
      }

      this.setUser(user)
    },
    currentUser() {
      return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
          auth,
          (user) => {
            unsubscribe()
            resolve(user)
          },
          () => {
            reject()
          }
        )
      })
    }
  }
})
