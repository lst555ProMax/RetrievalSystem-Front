import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/Login.vue'
import framework from '../views/Framework.vue'
import recommendation from '../views/Recommendation.vue'
import help from '../views/Help.vue'
import admin from '../views/Administrator.vue'
import textSearch from '../views/TextSearch.vue'
import imageSearch from '../views/ImageSearch.vue'
import userCenter from '../views/UserCenter.vue'
import result from '../views/Result.vue'
import dialogue from '../views/dialogue.vue'
import others from '../views/Others.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path:'/framework',
      name:'Framework',
      component:framework
    },
    {
      path:'/recommendation',
      name:'recommendation',
      component:recommendation
    },
    {
      path:'/help',
      name:'help',
      component:help
    },
    {
      path:'/admin',
      name:'admin',
      component:admin
    },
    {
      path:'/textSearch',
      name:'textSearch',
      component:textSearch
    },   
     {
      path:'/imageSearch',
      name:'imageSearch',
      component:imageSearch
    },
    {
      path:'/userCenter',
      name:'userCenter',
      component:userCenter
    },
    {
      path:'/result',
      name:'result',
      component:result
    },
    {
      path:'/dialogue',
      name:'dialogue',
      component:dialogue
    },
    {
      path:'/others',
      name:'others',
      component:others
    },
  ]
})

export default router
