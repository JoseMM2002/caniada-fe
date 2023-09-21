import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useUserStore} from "../store/index"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: "/notificaciones",
    name: "Notifications",
    component: () => import("../views/NotificationsView.vue"),
    meta: {requiresAuth: true}
  },
  {
    path: "/mensajes",
    name: "Messages",
    component: () => import("../views/MessagesView.vue"),
    meta: {requiresAuth: true}
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to,from,next) => {
    if(to.matched.some(record => record.meta.requiresAuth)){
        console.log("paso por meta")
        const usersStore = useUserStore()
        usersStore.userFromLocal()
        if(await usersStore.auth_token){
            next()
        } else {
          next({path:"/"})
        }
    } else {
      next()
    }
})

export default router