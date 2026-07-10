import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/downloads',
      name: 'downloads',
      component: () => import('../views/DownloadsView.vue'),
    },
    {
      path: '/info',
      name: 'info',
      component: () => import('../views/InfoView.vue'),
    },
    {
      path: '/shaders',
      name: 'shaders',
      component: () => import('../views/ShadersView.vue'),
    },
    {
      path: '/autosplitter',
      name: 'autosplitter',
      component: () => import('../views/AutosplitterView.vue'),
    },
    {
      path: '/overlay',
      name: 'overlay',
      component: () => import('../views/OverlayView.vue'),
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('../views/StatsView.vue'),
    },
  ],
})

export default router
