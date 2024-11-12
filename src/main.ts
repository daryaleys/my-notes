import { createApp } from "vue";
import "./main.scss";
import App from "./App.vue";
import axios from "axios";

window.axios = axios;

createApp(App).mount("#app");
