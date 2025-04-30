import { createRouter, createWebHistory } from 'vue-router';
import Register from '@/components/Register.vue';
import Login    from '@/components/Login.vue';
import Home     from '@/components/Home.vue';
import axios    from 'axios';

function requireAuth(to, from, next) {
  axios.get('http://localhost:3000/auth/profile', { withCredentials: true })
      .then(() => next())
      .catch(() => next('/login'));
}

const routes = [
  { path: '/register', component: Register },
  { path: '/login',    component: Login },
  {
    path: '/profile',
    component: Home,
    beforeEnter: requireAuth
  },
  { path: '/', redirect: '/login' }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
