import './plugins/axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import { createPinia } from 'pinia'
import {AxiosPlugin} from'./plugins/axios'

createApp(App).use(createPinia()).use(Quasar, quasarUserOptions).use(router).use(AxiosPlugin).mount('#app')
