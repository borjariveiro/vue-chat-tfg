import { defineStore } from 'pinia'
import { db, storage } from '@/firebase'
import {
  collection,
  addDoc,
  Timestamp,
  orderBy,
  onSnapshot,
  query,
  collectionGroup
} from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useUserStore } from './user'

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    messages: [],
    messagesListener: () => {}
  }),
  actions: {
    setMessages(messages) {
      this.messages = messages
    },
    setMessagesListener(listener) {
      if (listener) {
        this.messagesListener = listener
      } else {
        this.messagesListener()
      }
    },
    async getMessages() {
      const q = await query(
        collectionGroup(db, 'messages'),
        orderBy('createdAt', 'desc')
      )
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = []
        querySnapshot.forEach((doc) => {
          let message = doc.data()
          message.id = doc.id
          messages.unshift(message)
        })
        this.setMessages(messages)
      })
      this.setMessagesListener(unsubscribe)
    },
    async createMessage({ roomId, message, image }) {
      const userStore = useUserStore()
      await addDoc(collection(db, `rooms/${roomId}/messages`), {
        userId: userStore.user.uid,
        userName: userStore.user.displayName,
        roomId,
        message,
        image,
        createdAt: Timestamp.fromDate(new Date())
      })
    },
    async uploadMessageImage({ roomId, file }) {
      const userStore = useUserStore()
      const timestamp = Date.now()
      try {
        let filename = `rooms/${roomId}/messages/${userStore.getUserUid}-${timestamp}.jpg`
        const storageRef = ref(storage, filename)
        let uploadTask = await uploadBytesResumable(storageRef, file)
        return await getDownloadURL(uploadTask.ref)
      } catch (error) {
        throw Error(error.message)
      }
    }
  }
})
