import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/films',
    name: 'films',
    component: () => import('../views/FilmsView.vue')
  },
  {
    path: '/films/:seekID',
    name: 'film',
    component: () => import('../views/SingleFilmView.vue'),
    props: route => {return {seekID: String(route.params.seekID)}}
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
