import { createRouter, createWebHistory } from 'vue-router'
import store from "../store";
import Landing from '../components/Landing.vue'
import LandingPage from '../views/LandingPage.vue'
import NotFound from '../views/NotFound.vue'
import UserDashboard from '../layouts/UserDashboard.vue'
import Userspage from '../views/Userspage.vue'
import UserBooks from '../layouts/UserBooks.vue'
import UserSharedBooks from '../layouts/UserSharedBooks.vue'

const routes = [
  {
    path: '/',
    redirect: '/sign-in',
    name: 'SignIn',
    component: LandingPage,
    meta: { authRequired: false, title: "sign-in-page" },
    children: [
      {
        path: "sign-in",
        name: 'sign-in',
        component: Landing,
        meta: { authRequired: false, title: "sign-in-page" },
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: NotFound,
    meta: { title: "page-not-found" }
  },
  {
    path: '/user',
    name: "Userspage",
    redirect: '/user/dashboard',
    component: Userspage,
    meta: { authRequired: true, title: "dashboard" },
    children: [
      {
        path: 'dashboard',
        name: 'UserDashboard',
        component: UserDashboard,
        meta: { authRequired: true, title: "dashboard" },
      },
      {
        path: 'your-books',
        name: 'UserBooks',
        component: UserBooks,
        meta: { authRequired: true, title: "Your books" },
      },
      {
        path: 'your-shared-books',
        name: 'UserSharedBooks',
        component: UserSharedBooks,
        meta: { authRequired: true, title: "Your shared books" },
      },
    ]
  },



  // {
  //   path: '/about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  document.title = "EBooks | " + to.meta.title || "EBooks"
  const isAuthenticated = store.getters.getIsValidated;
  if (to.matched.some(record => record.meta.authRequired == true)) {
    if (isAuthenticated) {
      next()
    }
    else {
      next('/sign-in');
    }
  }
  else {
    if (isAuthenticated) {
      next('/user/dashboard')
    }
    else {

      next();
    }

  }

})

export default router
