import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAMGXRhBg47v5HGy2Ezy5RA88oIz73FN2k',
  authDomain: 'vue-chat-tfg.firebaseapp.com',
  projectId: 'vue-chat-tfg',
  storageBucket: 'vue-chat-tfg.appspot.com',
  messagingSenderId: '760613494781',
  appId: '1:760613494781:web:79f81087f2abd2e04d0394'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }
