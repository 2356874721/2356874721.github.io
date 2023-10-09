import { createApp } from 'vue'
import App from './App.vue'
import routes from "pages-generated"; 
import { createRouter, createWebHistory } from "vue-router";
import { ViteSSG } from "vite-ssg";

export const createApp = ViteSSG(App, { routes });
