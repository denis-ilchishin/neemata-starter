import { createApp } from 'vue'
import App from './index.vue'

export const app = createApp(App)

app.mount(document.querySelector('#app')!)
