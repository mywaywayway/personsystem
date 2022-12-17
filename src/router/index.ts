import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import personInfoView from "@/views/personInfoView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: HomeView
  },
  {
    path: '/about/:username',
    name: 'about',
    component: () => import( '../views/AboutView.vue'),

  },
  {
    path:'/personinfo/:username',
    name:'personinfo',
    component:()=>import('../views/personInfoView.vue'),

  },
  {
    path:'/memorandum/:username',
    name:'memorandum',
    component:()=>import('../views/memorandumView.vue'),
  },
  {
    path:'/income/:username',
    name:'income',
    component:()=>import('../views/incomeView.vue')
  } ,
  {
    path:'/output/:username',
    name:'output',
    component:()=>import('../views/outputView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
