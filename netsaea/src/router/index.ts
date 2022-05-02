import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomePage/Home.vue'
import Context from '../views/HomePage/childrenView/Context.vue'
import Music from '../views/HomePage/childrenView/musicView.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children:[{
      path:"/music",
      name:"music",
      component:Music
    },{
      path:"/",
      name:"Context",
      component:Context
    }]
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
