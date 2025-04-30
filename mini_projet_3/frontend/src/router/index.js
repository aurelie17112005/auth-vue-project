import Vue from 'vue'
import Router from 'vue-router'
import Login         from '@/components/Login.vue'
import OAuthCallback from '@/components/OAuthCallback.vue'
import Profile       from '@/components/Profile.vue'
import Chat          from '@/components/Chat.vue'

Vue.use(Router)

const guardAuth = (to, from, next) => {
  if (!localStorage.getItem('jwt')) return next('/login')
  next()
}

export default new Router({
  mode: 'history',
  routes: [
    { path: '/login',                       component: Login },
    { path: '/oauth/callback/:provider',    component: OAuthCallback },
    { path: '/profile',     beforeEnter: guardAuth, component: Profile },
    { path: '/chat',        beforeEnter: guardAuth, component: Chat },
    { path: '/', redirect: '/login' }
  ]
})
