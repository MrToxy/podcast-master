import Vue from 'vue'
import Router from 'vue-router'
import ListPodcast from '@/components/listPodcasts'
import favourite from '@/components/favourite'
import notFound from '@/components/notFound'
import login from '@/components/login'
import register from '@/components/register'
import AuthGuard from './auth-guard'
import {store} from '../store/store'
import authGuard from './auth-guard';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:{name:'podcasts'}
    },
    {
      name: 'login',
      path: '/login',
      component: login,
      beforeEnter: (to, from, next) => {
        if(store.getters.getUserState)
        {
          next('/')
        }
        else next()
        
      }
    },
    {
      name:'register',
      path:'/register',
      component:register,
      beforeEnter: (to, from, next) => {
        if(store.getters.getUserState)
        {
          next('/')
        }
        else next()
        
      }
    },
    {
      path:'/podcasts/',
      name:'podcasts',
      component:ListPodcast
    },
    {
      name:'favourite',
      path:'/podcasts/favourite',
      component:favourite,
      beforeEnter:authGuard
      /*beforeEnter:(to, from,next) =>{
        if(store.getters.LoadedPodcasts.length > 0 && store.state.user != null){
          next()
        }
        else {
          console.log(store.getters.LoadedPodcasts.length)
          next('/')
        }
      }*/
    },
    {
      name:'notFound',
      path:'*',
      component: notFound
    }
  ],
mode: 'history'
})
