<template>
    <q-item v-for="info in contact" :key="info.id" class="q-pa-xs chat-section" clickable @click="setChat(info)" v-ripple>
        <q-card class="full-width q-pa-sm text-black q-mt-none" flat bordered>
        <div class="q-flex q-items-center q-justify-between row">
            <q-item-section avatar>
                <q-avatar>
                    <q-icon name="home" color="black" size="md"/>
                </q-avatar>
            </q-item-section>
            <q-item-section>
                <q-item-label>{{ info.name }}</q-item-label>
                <q-item-label caption lines="1" class="text-black">{{ info.email }}</q-item-label>
            </q-item-section>
        </div>
        </q-card>
    </q-item>
</template>

<script>
import {inject, ref} from "vue"
import {useChatStore} from "../store/index"
import router from "../router/index"
export default {
    name:"ContactoMessages",
    props: {
        contact: {
            type: Array,
            required: true
        }
    },
    setup () {
        const chatStore = useChatStore()
        const onChat = chatStore.get_onChat
        const setChat = async (info) => {
            await setTimeout(() => {
                onChat.set = true
                onChat.info = info.email
            }, 250);
        }
        return {
            onChat,
            setChat
        }
    }
}
</script>

<style lang="scss" scoped>
.chat-section{
    position: relative;
    animation: fromBottom 1.5s ease forwards; 
    opacity: 0;
}
@keyframes fromBottom {
  0% {
    transform: translateX(100%); /* Comienza debajo de la pantalla */
    opacity: 0; /* Inicialmente invisible */
  }
  100% {
    transform: translateX(0); /* Termina en su posición original */
    opacity: 1; /* Se vuelve visible */
  }
}

</style>