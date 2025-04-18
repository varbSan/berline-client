import ui from '@nuxt/ui/vue-plugin'

import { createApp, h } from 'vue'
import { registerApollo } from './api/apollo'
import App from './App.vue'
import router from './router'
import './assets/main.css'

const app = createApp({
  render: () => h(App),
})

app.use(ui)
app.use(router)

registerApollo(app);

(async () => {
  app.mount('#app')
})()
