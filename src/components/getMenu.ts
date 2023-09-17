import { useUserStore } from "@/store"
import { ref,Ref } from "vue"
import {showlogin, showRegister} from "./menuMethods"
import registerModel from "@/App.vue"
import loginModel from "@/App.vue"

const condominos = [
]
const administradores = [

]
const seguridad = [

]
const todos = [
    
]

export const getMenu = (menuModelsList:[]) => {
    const listDrawer = []
    const userStore = useUserStore()
    userStore.userFromLocal()
    const user = userStore.get_user
    if (user.token ==  ""){
        listDrawer.push({
            method: (item:Ref<boolean>) => showlogin(item),
            icon: "login",
            label: "Login",
            model: loginModel
        })
        listDrawer.push({
            method: (item:Ref<boolean>) => showRegister(item),
            icon: "person_add_alt",
            label: "Register",
            model: registerModel
        })
    } else {
      console.log("dsaldhjaks")
    }
    return listDrawer
}