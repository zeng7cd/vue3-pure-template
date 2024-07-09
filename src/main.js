import { createApp } from 'vue'
import { setupStore } from '@/stores'
import { setupRouter } from '@/router'

import '@/router/guard'
import App from './App.vue'

async function bootstrap() {
  const app = createApp(App)
  setupStore(app)
  setupRouter(app)
  app.mount('#app')
}

bootstrap()
