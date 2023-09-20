<template>
    <q-card class="my-card" style="width: 95%;">
        <q-card-section>
            <q-form @submit="LoginUser()">
                <div class="text-center text-h6 text-bold">
                    Login
                </div>
                <q-separator dark/>
                <q-input outlined v-model="email" label="Email" class="q-ma-sm" :rules="[val => isEmailValid(val) || 'Dirección de correo inválida']"/>
                <q-input outlined v-model="password" :type="isPwd ? 'password' : 'text'" class="q-ma-sm" label="Contraseña" :rules="[val => val.length >= 5 || 'Contraseña insegura']">
                <template v-slot:append>
                <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                />
                </template>
                </q-input>
                <div class="q-ma-sm text-center">
                    <q-btn label="Submit" type="submit" @submit="LoginUser()" color="primary"/>
                </div>
            </q-form>
        </q-card-section>
      </q-card>
</template>

<script>
import {ref} from "vue"
import {instance} from "../plugins/axios.ts"
import {useQuasar} from "quasar"
import {useUserStore, User} from "../store/index"
export default {
    name: "LoginForm",
    setup () {
        const $q = useQuasar()
        const userStore = useUserStore()
        const email = ref("")
        const password = ref('')
        const isPwd =  ref(true)
        const isEmailValid = (email) => {
            const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
            return emailRegex.test(email);
        }
        const LoginUser = async () => {
            console.log(email.value,password.value)
            try {
                const response = await instance.get(
                    "/user/auth",{
                        params : {
                            email : email.value,
                            password : password.value,
                        }
                    },
                )
                var data = response.data
                const message = data.message
                const status = data.status
                if(status == "Success"){
                    data = data.data
                    const user = new User(data.name, data.user_type, data.email, data.access_token)
                    $q.notify({
                        message: message,
                        color: 'green',
                    })
                    userStore.put_user(user)
                    userStore.userToLocal()
                    window.location.reload(true);
                } else {
                    $q.notify({
                        message: message,
                        color: 'red',
                    })
                }
            } catch (error) {
                console.log(error)
                $q.notify({
                    message: "Hubo un error en la conexión",
                    color: 'red',
                })
            }
        }
        return {
            email,
            password,
            isPwd,
            isEmailValid,
            LoginUser
        }
    }
}
</script>

<style lang="scss" scoped>

</style>