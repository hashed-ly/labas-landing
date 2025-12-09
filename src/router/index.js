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
          path: '/solutions/dashboard',
          name: 'solutions-dashboard',
          component: () => import('../pages/Solutions/DashboardPage.vue'),
        },
        {
          path: '/solutions/dashboard/appointments',
          name: 'solutions-dashboard-appointments',
          component: () => import('../pages/Solutions/DashboardAppointmentsPage.vue'),
        },
        {
          path: '/solutions/dashboard/booking-info',
          name: 'solutions-dashboard-booking-info',
          component: () => import('../pages/Solutions/DashboardBookingInfoPage.vue'),
        },
        {
          path: '/solutions/dashboard/schedules',
          name: 'solutions-dashboard-schedules',
          component: () => import('../pages/Solutions/DashboardSchedulesPage.vue'),
        },
        {
          path: '/contact',
          name: 'contact',
          component: () => import('../pages/Contact/ContactPage.vue'),
        },
        {
          path: '/kyc',
          name: 'kyc',
          component: () => import('../pages/KYC/KYCPage.vue'),
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
