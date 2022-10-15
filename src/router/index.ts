import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const appName: string = 'OMCG';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: appName
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: `${appName} | About`
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/contact/ContactPage.vue'),
      meta: {
        title: `${appName} | Contact`
      }
    },
    {
      path: '/auth',
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginPage.vue'),
          meta: {
            title: `${appName} | Login`
          }
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/auth/RegisterPage.vue'),
          meta: {
            title: `${appName} | Register`
          }
        },
        {
          path: 'forgot-password',
          name: 'forgot-password',
          component: () => import('../views/auth/ForgotPasswordPage.vue'),
          meta: {
            title: `${appName} | Forgot Password`
          }
        },
        {
          path: 'reset-password',
          name: 'reset-password',
          component: () => import('../views/auth/ResetPasswordPage.vue'),
          meta: {
            title: `${appName} | Reset Password`
          }
        },
        {
          path: 'email-confirmation',
          children: [
            {
              path: 'user-registration',
              name: 'user-registration',
              component: () => import('../views/auth/email-confirmation/UserRegistrationPage.vue'),
              meta: {
                title: `${appName} | Account Verification`
              }
            },
            {
              path: 'forgot-password',
              name: 'confirm-forgot-password',
              component: () => import('../views/auth/email-confirmation/ForgotPasswordValidationPage.vue'),
              meta: {
                title: `${appName} | Forgot Password Verification`
              }
            },
          ]
        },
        {
          path: '/404',
          name: '404',
          component: () => import('../views/PageNotFound.vue'),
          meta: {
            title: `${appName} | Page Not Found`
          }
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
        requiresAuth: true,
        title: `${appName} | Game Lobby`
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
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
