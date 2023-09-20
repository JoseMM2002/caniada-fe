import {Ref,ref,provide,inject} from "vue"
import { useUserStore } from "@/store"
import {User} from "../store/index"
interface model {
    value: Ref<boolean>;
}

export const showlogin = (loginModel:Ref<boolean>) => {
    console.log(loginModel)
    loginModel.value = !loginModel.value;
};
export const showRegister = (registerModel:Ref<boolean>) => {
    console.log(registerModel)
    registerModel.value = !registerModel.value;
}
export const showDrawer = (leftDrawer: Ref<boolean>) => {
    leftDrawer.value = !leftDrawer.value;
};
export const logout = () => {
    const userStore = useUserStore()
    userStore.put_user(new User())
    userStore.userToLocal()
    window.location.reload();
}