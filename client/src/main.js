import { createApp } from 'vue'
import App from './App.vue'
import { plugin as VueInputAutowidth } from 'vue-input-autowidth'

const app = createApp(App)
app.use(VueInputAutowidth)
app.mount('#app')
