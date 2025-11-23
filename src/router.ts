import IT021 from '@/pages/IT021.vue';
import IT022 from '@/pages/IT022.vue';
import IT023 from '@/pages/IT023.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Helloworld from './components/Helloworld.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/IT021' },
    { path: '/Helloworld', name: 'Helloworld', component: Helloworld },
    { path: '/IT021', name: 'IT021', component: IT021 },
    { path: '/IT022', name: 'IT022', component: IT022 },
    { path: '/IT023', name: 'IT023', component: IT023, meta: { requiresAuth: true } },
  ]
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    return next({ name: 'IT021' });
  }
  next();
});

export default router;
