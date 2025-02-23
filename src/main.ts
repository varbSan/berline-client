import { createApp, h } from "vue";
import App from "./App.vue";
import './assets/index.css'
import { registerApollo } from "./api/apollo";

const app = createApp({
  render: () => h(App),
});

registerApollo(app);

(async () => {
  app.mount('#app');
})();
