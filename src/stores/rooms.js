import { defineStore } from 'pinia'
import { db, storage } from '@/firebase'
import {
  collection,
  addDoc,
  Timestamp,
  getDoc,
  doc,
  updateDoc,
  query,
  onSnapshot,
  orderBy,
  deleteDoc,
  setDoc
} from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useUserStore } from './user'

export const useRoomsStore = defineStore('rooms', {
  state: () => ({
    rooms: [],
    roomsListener: () => {}
  }),
  getters: {
    findRoom: (state) => {
      return (roomId) => state.rooms.find((room) => room.id === roomId)
    }
  },
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
    async getNewRoomId() {
      const docRef = await addDoc(collection(db, 'rooms'), {})
      return docRef.id
    },

    async uploadRoomImage({ roomId, file }) {
      try {
        let filename = `rooms/${roomId}/${roomId}-image.jpg`
        const storageRef = ref(storage, filename)
        let uploadTask = await uploadBytesResumable(storageRef, file)
        return await getDownloadURL(uploadTask.ref)
      } catch (error) {
        throw Error(error.message)
      }
    },
    async getRoom(roomID) {
      let room = this.findRoom(roomID)
      if (!room) {
        const docRef = doc(db, 'rooms', roomID)
        room = await getDoc(docRef)
        if (!room.exists) throw new Error('Could not find room')
        room = room.data()
      }
      return room
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
          }
          if (change.type === 'removed') {
            this.rooms.splice(change.oldIndex, 1)
          }
        })
      })
      this.setRoomsListener(unsuscribe)
    },
    async createRoom({ name, description, image, roomId }) {
      const userStore = useUserStore()
      await setDoc(doc(db, 'rooms', roomId), {
        name,
        description,
        createdAt: Timestamp.fromDate(new Date()),
        adminUid: userStore.user.uid,
        adminName: userStore.user.displayName,
        image
      })
    },

    async updateRoom({ roomID, name, description, image }) {
      const roomData = {}
      if (name) roomData.name = name
      if (description) roomData.description = description
      roomData.image = image

      const docRef = doc(db, 'rooms', roomID)
      return await updateDoc(docRef, roomData)
    },
    async removeRoom({ roomID }) {
      const rooms = doc(db, 'rooms', roomID)
      const messages = await query(collection(db, `rooms/${roomID}/messages`))
      const unsubscribe = onSnapshot(messages, (querySnapshot) => {
        querySnapshot.forEach(async (document) => {
          const message = doc(db, `rooms/${roomID}/messages`, document.id)
          await deleteDoc(message)
        })
      })
      await deleteDoc(rooms)
      unsubscribe()
    }
  }
})
