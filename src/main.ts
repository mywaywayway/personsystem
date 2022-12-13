import {createApp, VueElement} from 'vue'
import axios from 'axios'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import  qs from 'qs'
// import app from "@/App.vue";
// app.config.globalProperties.$axios = axios
// app.config.globalProperties.$qs = qs


// import '@icon-park/vue-next/styles/index.css'
createApp(App).use(router).use(ElementPlus).mount('#app')
