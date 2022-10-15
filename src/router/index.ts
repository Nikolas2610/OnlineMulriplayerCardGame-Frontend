import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/contact/ContactPage.vue')
    },
    {
      path: '/auth',
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginPage.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/auth/RegisterPage.vue')
        },
        {
          path: 'forgot-password',
          name: 'forgot-password',
          component: () => import('../views/auth/ForgotPasswordPage.vue')
        },
        {
          path: 'email-confirmation',
          children: [
            {
              path: 'user-registration',
              name: 'user-registration',
              component: () => import('../views/auth/email-confirmation/UserRegistrationPage.vue')
            }
          ]
        },
        {
          path: '/404',
          name: '404',
          component: () => import('../views/PageNotFound.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          redirect: { name: '404' }
        },
      ]
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: () => import('../views/LobbyPage.vue'),
      meta: {
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  // if route requires authentication - requiresAuth is true
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      next({ name: 'home' });
    } else {
      next();
    }
  }
  // if route can be accessed without authentication - guest is true 
  // but we redirect back to dashboard if already logged in 
  else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem('token')) {
      next({ name: 'lobby' });
    } else {
      next();
    }
  }
  // if not guest or requiresAuth continue
  // e.g. about us page 
  else {
    next();
  }
});

export default router
