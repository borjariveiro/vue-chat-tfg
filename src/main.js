import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'

import App from '@/App.vue'
import router from '@/router'

import '@/index.css'

// Toast
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
const options = {
  position: POSITION.BOTTOM_LEFT
}

const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(router)
app.use(head)
app.use(Toast, options)
app.mount('#app')
