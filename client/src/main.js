import { createApp } from 'vue'
import { plugin as VueInputAutowidth } from 'vue-input-autowidth'
import { createRouter, createWebHashHistory } from 'vue-router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/reset.css'

import App from './App.vue'
import SaveInfo from './components/SaveInfo.vue'
import RetrieveInfo from './components/RetrieveInfo.vue'

import { User, Iphone, Message, Key } from '@element-plus/icons-vue'

const routes = [
  { path: '/', name: 'TypeIt', component: SaveInfo },
  { path: '/saveInfo', name: 'Save Info', component: SaveInfo },
  { path: '/retrieveInfo', name: 'Retrieve Info', component: RetrieveInfo }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.use(VueInputAutowidth)
app.use(ElementPlus)

app
  .component('User', User)
  .component('Iphone', Iphone)
  .component('Message', Message)
  .component('Key', Key)

app.mount('#app')
