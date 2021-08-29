import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import firebase from 'firebase';

import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';
import Admin from '../views/Admin.vue';
import Editor from '../views/Editor.vue';
import Content from '../views/Content.vue';
import Login from '../views/Login.vue';


const routes: Array<RouteRecordRaw> = [
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: { title: 'Admin' },
    beforeEnter(to, from, next) {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user?.uid === '8STAj1M26zMHRrOsxKhes2hit7e2') {
          next()
        } else {
          next('/login')
        }
      })
    }
  },
  {
    path: '/edit/:id',
    name: 'editor',
    component: Editor,
    meta: { title: 'Edit' },
    beforeEnter(to, from, next) {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user?.uid === '8STAj1M26zMHRrOsxKhes2hit7e2') {
          next()
        } else {
          next('/login')
        }
      })
    }
  },
  {
    path: '/content/:id',
    name: 'content',
    component: Content
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter(to, from, next) {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          next('/admin')
        } else {
          next()
        }
      })
    }
  }
]

const scrollBehavior = (to: any, from: any, savedPosition: any) => {
  if (savedPosition) {
    return savedPosition;
  } else {
    return { top: 0 }
  }
};

const DEFAULT_TITLE = 'もももブログ';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior
});

router.afterEach((to, from) => {
  document.title = to.meta.title ? String(to.meta.title) : DEFAULT_TITLE;
})

export default router
