import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../pages/Home/HomePage.vue'),
        },
        {
          path: '/solutions/app',
          name: 'solutions-app',
          component: () => import('../pages/Solutions/AppPage.vue'),
        },
        {
          path: '/v1/Privacy-and-Policy',
          name: 'privacy',
          component: () => import('../components/Privacy.vue'),
        },
        {
          path: '/v1/terms-of-use',
          name: 'terms',
          component: () => import('../components/Terms.vue'),
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

export default router;
