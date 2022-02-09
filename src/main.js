import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'

import '@/index.css'

// Toast
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
const options = {
  position: POSITION.BOTTOM_RIGHT
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, options)
app.mount('#app')
