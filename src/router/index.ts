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
      path: '/main-lobby',
      name: 'lobby',
      component: () => import('../views/LobbyPage.vue'),
      redirect: { name: 'lobby-room' },
      meta: {
        requiresAuth: false,
        title: `${appName} | Game Lobby`
      },
      children: [
        {
          path: '/lobby',
          name: 'lobby-room',
          component: () => import('../views/lobby/LobbyRoom.vue'),
          meta: {
            requiresAuth: false,
            title: `${appName} | Lobby`
          },
        },
        {
          path: '/create-game',
          name: 'create-game',
          component: () => import('../views/lobby/CreateGameView.vue'),
          meta: {
            requiresAuth: true,
            title: `${appName} | Create Game`
          },
        },
        {
          path: '/create-deck',
          name: 'create-deck',
          component: () => import('../views/lobby/CreateDeckView.vue'),
          meta: {
            requiresAuth: true,
            title: `${appName} | Create Deck`
          },
        },
        {
          path: '/create-table',
          name: 'create-table',
          component: () => import('../views/lobby/CreateTableView.vue'),
          meta: {
            requiresAuth: true,
            title: `${appName} | Create Table`
          },
        },
        {
          path: '/create-card',
          name: 'create-card',
          component: () => import('../views/lobby/CreateCardView.vue'),
          meta: {
            requiresAuth: true,
            title: `${appName} | Create Card`
          },
        },
      ]
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      redirect: { name: 'overview' },
      meta: {
        requiresAuth: true,
        title: `${appName} | Dashboard`
      },
      children: [
        {
          path: 'games',
          name: 'games',
          component: () => import('../views/dashboard/GamesView.vue'),
          meta: {
            requiresAuth: true,
            title: `${appName} | Dashboard`
          }
        },
        {
          path: 'tables',
          name: 'tables',
          component: () => import('../views/dashboard/TablesView.vue'),
          meta: {
            requiresAuth: true,
            title: `${appName} | Dashboard`
          }
        },
        {
          path: 'overview',
          name: 'overview',
          component: () => import('../views/dashboard/OverviewView.vue'),
          meta: {
            requiresAuth: true,
            title: `${appName} | Dashboard`
          }
        },
        {
          path: 'decks',
          name: 'decks',
          component: () => import('../views/dashboard/DecksView.vue'),
          meta: {
            requiresAuth: true,
            title: `${appName} | Dashboard`
          }
        },
        {
          path: 'cards',
          name: 'cards',
          component: () => import('../views/dashboard/CardsView.vue'),
          meta: {
            requiresAuth: true,
            title: `${appName} | Dashboard`
          }
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('../views/dashboard/SettingsView.vue'),
          meta: {
            requiresAuth: true,
            title: `${appName} | Dashboard`
          }
        },
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/Dashboard.vue'),
      redirect: { name: 'admin-overview' },
      meta: {
        admin: true,
        requiresAuth: true,
        title: `${appName} | Admin`
      },
      children: [
        {
          path: 'games',
          name: 'admin-games',
          component: () => import('../views/admin/GamesView.vue'),
          meta: {
            admin: true,
            requiresAuth: true,
            title: `${appName} | Admin`
          }
        },
        {
          path: 'tables',
          name: 'admin-tables',
          component: () => import('../views/admin/TablesView.vue'),
          meta: {
            admin: true,
            requiresAuth: true,
            title: `${appName} | Admin`
          }
        },
        {
          path: 'overview',
          name: 'admin-overview',
          component: () => import('../views/admin/OverviewView.vue'),
          meta: {
            admin: true,
            requiresAuth: true,
            title: `${appName} | Admin`
          }
        },
        {
          path: 'decks',
          name: 'admin-decks',
          component: () => import('../views/admin/DecksView.vue'),
          meta: {
            admin: true,
            requiresAuth: true,
            title: `${appName} | Admin`
          }
        },
        {
          path: 'cards',
          name: 'admin-cards',
          component: () => import('../views/admin/CardsView.vue'),
          meta: {
            admin: true,
            requiresAuth: true,
            title: `${appName} | Admin`
          }
        },
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('../views/admin/UsersView.vue'),
          meta: {
            admin: true,
            requiresAuth: true,
            title: `${appName} | Admin`
          }
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  // if route requires authentication - requiresAuth is true
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      next({ name: 'home' });
      return
    } else {
      next();
      return
    }
  }
  // if not requiresAuth continue
  next();
});

export default router
