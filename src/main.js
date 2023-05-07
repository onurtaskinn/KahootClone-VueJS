import { createApp } from "vue";
// import App from "./App.vue";
import Client from "./Client.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(Client);

app.use(router);

app.mount("#app");
