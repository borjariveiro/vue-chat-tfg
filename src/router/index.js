import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'chat',
      component: () => import('@/views/ChatView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/password_reset',
      name: 'password',
      component: () => import('@/views/ResetPasswordView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/UserProfileView.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  // Requires auth & no user
  if (requiresAuth && !(await userStore.currentUser())) {
    next({ name: 'login' })
    // No requires auth and user (auth)
  } else if (!requiresAuth && (await userStore.currentUser())) {
    next({ name: 'chat' })
  } else {
    // Anything else
    next()
  }
})

export default router
