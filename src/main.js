import { createApp, h } from "vue";

import axios from "@/apis/axios";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import router from "./router";

import { createPinia } from "pinia";

import App from "./App.vue";

import "aos/dist/aos.css";
import "./style.css";

const pinia = createPinia();

const app = createApp({
  render: () => h(App),
});

app.use(ElementPlus);
app.use(router);
app.use(pinia);
app.provide("api", axios);

app.mount("#app");
