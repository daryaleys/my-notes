import { createApp } from "vue";
import { createPinia } from 'pinia'
import App from "./App.vue";
import axios from "axios";
import "./main.scss";

window.axios = axios;

const pinia = createPinia()
createApp(App).use(pinia).mount("#app");
