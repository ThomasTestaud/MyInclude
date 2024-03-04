import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/CompaniesView.vue'),
    },
    {
      path: '/dashboard/:id',
      name: 'dashboard',
      props: true,
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/company/:id',
      name: 'company',
      props: true,
      component: () => import('../views/CompanyView.vue'),
    },
    {
      path: '/liens',
      name: 'liens',
      component: () => import('../views/LinksView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
    }
  ]
})

router.beforeEach((to, from, next) => {
  next();
});

export default router
