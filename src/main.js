import { createApp } from "vue";
// import App from "./App.vue";
import VueClient from "./VueClient.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(VueClient);

app.use(router);

app.mount("#app");
