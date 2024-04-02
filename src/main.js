import { createApp, h } from "vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import router from "./router";

import { createPinia } from "pinia";

import App from "./App.vue";

import "aos/dist/aos.css";
import "./style.css";

// =================SHARED COMPONENT=============
import FormValidator from "@/components/shared/FormValidator.vue";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const pinia = createPinia();

const app = createApp({
  render: () => h(App),
});

app.use(ElementPlus);
app.use(router);
app.use(pinia);

app.component("FormValidator", FormValidator);

app.provide("Swal", Swal);

app.mount("#app");
