import Vue from 'vue'
import Router from 'vue-router'
import Login    from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Profile  from '@/components/Profile.vue'

Vue.use(Router)

const guardAuth = (to, from, next) => {
  if (!localStorage.getItem('jwt')) return next('/login')
  next()
}

export default new Router({
  mode: 'history',
  routes: [
    { path: '/login',    component: Login },
    { path: '/register', component: Register },
    { path: '/profile',  component: Profile, beforeEnter: guardAuth },
    { path: '/',         redirect: '/login' }
  ]
})
