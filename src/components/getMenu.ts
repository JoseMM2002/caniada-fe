import { useUserStore } from "@/store"
import { markRaw, Ref } from "vue"
import {showlogin, showRegister, logout} from "./menuMethods"
import LoginFormVue from "./LoginForm.vue"
import RegisterFormVue from "./RegisterForm.vue"
import router from "@/router"

const condominos = [
]
const administradores = [

]
const seguridad = [

]
const todos = [
    {
        id:3,
        method: () => router.push("/notificaciones"),
        icon: "notifications",
        label: "Notificaciones",
        component: null
    }
    
]
const notLogged = [
    {
        id:0,
        method: (item:Ref<boolean>) => showlogin(item),
        icon: "login",
        label: "Login",
        component: LoginFormVue
    },
    {
        id:1,
        method: (item:Ref<boolean>) => showRegister(item),
        icon: "person_add_alt",
        label: "Register",
        component: RegisterFormVue
    }
]
const logoutObj = [
    {
        id: 4,
        method: () => Promise.resolve(logout()),
        icon: "logout",
        label: "Logout",
        component: null,
    },
]

export const getMenu = (user_type:string) => {
    let aux = todos
    const userStore = useUserStore()
    userStore.userFromLocal()
    const user = userStore.get_user
    if (user.token ==  ""){
        return markRaw(notLogged)
    } else {
        aux = todos.concat(logoutObj)   
        return markRaw(aux)
    }
}