import { defineStore } from 'pinia'
import { db } from '@/firebase'
import {
  collection,
  addDoc,
  Timestamp,
  orderBy,
  onSnapshot,
  query,
  collectionGroup
} from 'firebase/firestore'
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
    async createMessage({ roomId, message }) {
      const userStore = useUserStore()
      await addDoc(collection(db, `rooms/${roomId}/messages`), {
        userId: userStore.user.uid,
        userName: userStore.user.displayName,
        roomId,
        message,
        createdAt: Timestamp.fromDate(new Date())
      })
    }
  }
})
