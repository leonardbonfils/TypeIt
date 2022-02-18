import { createApp } from 'vue'
import { plugin as VueInputAutowidth } from 'vue-input-autowidth'
import VueRouter from 'vue-router'

import App from './App.vue'
import SaveInfo from './components/SaveInfo.vue'
import RetrieveInfo from './components/RetrieveInfo.vue'

const routes = [
  { path: '/', name: 'TypeIt', component: App },
  { path: '/saveInfo', name: 'Save Info', component: SaveInfo },
  { path: '/retrieveInfo', name: 'Retrieve Info', component: RetrieveInfo }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.use(VueInputAutowidth)
app.mount('#app')
