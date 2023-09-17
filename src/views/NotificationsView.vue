<template>
    <div class="q-pa-lg notifications-section">
        <q-card bordered flat rounded v-for="item in notificationsList" clickable @click="item.method" :key="item.id" class="full-width q-ma-md click-card">
            <q-card-section>
                <div class="text-h6">{{item.asunto}}</div>
            </q-card-section>

            <q-separator inset />

            <q-card-section>
                <div class="text-subtitle2">{{item.descripcion}}</div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
import router from "../router/index"
import {ref} from "vue"
export default {
    name: "NotificationsView",
    setup () {
        const notificationsList = ref([
            {
                id: 1,
                asunto: "Renta palapa",
                descripcion: "Jose Morales quiere rentar la palapa 2 el día 23/06/2002",
                method: () => {console.log("click")}
            },
            {
                id: 2,
                asunto: "Pago mantenimiento",
                descripcion: "Jose Morales pagó mantenimiento el día 23/06/2002",
                method: () => {console.log("click")}
            }
        ])
        return {
            notificationsList
        }
    }
}
</script>

<style scoped>
.click-card{
    cursor: pointer;
    opacity: 1;
    transition: opacity 0.1s ease;
}
.click-card:hover{
    opacity: 0.8;
}
.notifications-section{
    position: relative;
    animation: fromBottom 1s ease forwards; 
    opacity: 0;
}
@keyframes fromBottom {
  0% {
    transform: translateY(100%); /* Comienza debajo de la pantalla */
    opacity: 0; /* Inicialmente invisible */
  }
  100% {
    transform: translateY(0); /* Termina en su posición original */
    opacity: 1; /* Se vuelve visible */
  }
}
</style>