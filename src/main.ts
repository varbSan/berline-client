import './assets/main.css'

import { createApp, h } from "vue"
import App from "./App.vue"
import { registerApollo } from "./api/apollo"
import ui from '@nuxt/ui/vue-plugin'

const app = createApp({
  render: () => h(App),
});

app.use(ui)

registerApollo(app);

(async () => {
  app.mount('#app');
})();
