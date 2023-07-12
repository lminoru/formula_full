import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  //login page
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  //overview page
  {
    path: '/overview',
    name: 'overview',
    component: () => import('../views/OverviewView.vue'),
    meta: { requiresAuth: true }
  },
  //report page
  {
    path: '/report',
    name: 'report',
    component: () => import('../views/ReportView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') !== null;

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redireciona para a página de login se o usuário não estiver autenticado
    next('/login');
  } else {
    next();
  }
});

export default router
