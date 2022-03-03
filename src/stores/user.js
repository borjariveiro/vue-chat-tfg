import { defineStore } from 'pinia'
import { db, auth } from '@/firebase'
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
  doc,
  query,
  where,
  getDocs,
  getDoc,
  collectionGroup,
  runTransaction,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
  Timestamp,
  onSnapshot
} from 'firebase/firestore'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    meta: {},
    userListener: () => {}
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
    setMeta(meta) {
      this.meta = meta
    },
    setUserListener(listener) {
      if (listener) {
        this.userListener = listener
      } else {
        this.userListener()
      }
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
    async updateMeta({ roomID, exit, uid }) {
      const users = doc(db, 'users', uid)
      const userDoc = await getDoc(users)

      if (!userDoc.exists) {
        await setDoc(users, {})
      }
      if (exit) {
        await updateDoc(users, {
          connected: arrayRemove(roomID),
          [`joined.${roomID}`]: Timestamp.fromDate(new Date())
        })
      } else {
        await updateDoc(users, {
          connected: arrayUnion(roomID),
          [`joined.${roomID}`]: Timestamp.fromDate(new Date())
        })
      }
    },
    async getMeta() {
      const user = doc(db, 'users', this.user.uid)
      const userDoc = await getDoc(user)
      if (!userDoc.exists) {
        await setDoc(user, {})
      }

      // await updateDoc(user, { connected: [] })
      const unsubscribe = onSnapshot(user, (doc) => {
        this.setMeta(doc.data())
      })
      this.setUserListener(unsubscribe)
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
