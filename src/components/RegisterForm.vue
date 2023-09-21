<template>
    <q-card class="my-card" style="width: 95%;">
        <q-card-section>
            <q-form @submit="RegisterUser()">
                <div class="text-center text-h6 text-bold">
                    Register
                </div>
                <q-separator dark/>
                <q-input outlined v-model="email" label="Email" class="q-ma-sm" :rules="[val => isEmailValid(val) || 'Dirección de correo inválida']"/>
                <q-input outlined v-model="name" label="Nombre" class="q-ma-sm" :rules="[val => val.length <= 100 || 'Nombre Inválido']"/>
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
                    <q-btn label="Submit" type="submit" color="primary"/>
                </div>
            </q-form>
        </q-card-section>
      </q-card>
</template>

<script>
import {ref} from "vue"
import {instance} from "../plugins/axios.ts"
import {useQuasar} from "quasar"
export default {
    name: "RegisterForm",
    setup () {
        const $q = useQuasar()
        const email = ref("")
        const name = ref("")
        const password = ref('')
        const isPwd =  ref(true)
        const isEmailValid = (email) => {
            const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
            return emailRegex.test(email);
        }
        const RegisterUser = async () => {
            try {
                const user = {
                    id:0,
                    email: email.value,
                    name: name.value,
                    password: password.value,
                    user_type: ""
                }
                const miJSON = JSON.stringify(user);
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
                const response = await instance.post(
                    "/user/register/", miJSON, config
                )
                const data = response.data
                const message = data.message
                const status = data.status
                if(status == "Success"){
                    $q.notify({
                        message: message,
                        color: 'green',
                    })
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
            RegisterUser,
            name
        }
    }
}
</script>

<style lang="scss" scoped>

</style>