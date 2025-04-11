import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Dialog, Notify, Loading } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/roboto-font/roboto-font.css'
import 'quasar/src/css/index.sass'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'

const app = createApp(App)

app.use(createPinia()) // Usando o Pinia

app.use(router) // Usando o roteador

app.use(VueAxios,axios) // Usando o VueAxios com axios

app.use(Quasar, { // Usando o Quasar e seus plugins
  plugins: {
    Dialog,
    Notify,
    Loading
  }
})

app.mount('#app') // Montando a aplicação
