import { defineStore } from 'pinia'
import { db } from '@/firebase'
import {
  collection,
  addDoc,
  Timestamp,
  getDoc,
  doc,
  updateDoc,
  query,
  onSnapshot,
  orderBy
} from 'firebase/firestore'
import { useUserStore } from './user'

export const useRoomsStore = defineStore('rooms', {
  state: () => ({
    rooms: [],
    roomsListener: () => {}
  }),
  actions: {
    setRooms(rooms) {
      this.rooms = rooms
    },
    setRoomsListener(listener) {
      if (listener) {
        this.roomsListener = listener
      } else {
        this.roomsListener()
      }
    },
    async getRooms() {
      const querySnapshot = await query(
        collection(db, 'rooms'),
        orderBy('createdAt', 'asc')
      )
      const unsuscribe = onSnapshot(querySnapshot, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const roomData = change.doc.data()
            roomData.id = change.doc.id
            this.rooms.push(roomData)
          }
          if (change.type === 'modified') {
            const roomData = change.doc.data()
            roomData.id = change.doc.id
            this.rooms[change.newIndex] = roomData
            console.log(change.newIndex)
          }
          if (change.type === 'removed') {
            this.rooms.splice(change.oldIndex, 1)
          }
        })
      })
      this.setRoomsListener(unsuscribe)
    },
    async createRoom({ name, description }) {
      const userStore = useUserStore()
      await addDoc(collection(db, 'rooms'), {
        name,
        description,
        createdAt: Timestamp.fromDate(new Date()),
        adminUid: userStore.user.uid,
        adminName: userStore.user.displayName
      })
    },
    async getRoomFromFirebase(roomID) {
      const docRef = doc(db, 'rooms', roomID)
      return await getDoc(docRef)
    },
    async updateRoom({ roomID, name, description }) {
      const roomData = {}
      if (name) roomData.name = name
      if (description) roomData.description = description
      const docRef = doc(db, 'rooms', roomID)
      return await updateDoc(docRef, roomData)
    }
  }
})
