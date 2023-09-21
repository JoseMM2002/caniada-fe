<template>
    <q-page class="flex column justify-center items-center">
            <q-card class="q-pa-lg bg-cyan-8 column col justify-end" id="chat-container" style="width: 85%; margin-top: 7%; margin-bottom: 7%;" flat bordered round >
            <!-- <div class="q-pa-md column col justify-end"> -->
                <q-chat-message v-for="item in messages" :key="item.id" :id="item.id" :text="[item.text]" :stamp="item.date" :sent="item.sent" size="8" style="font-size: larger;" class="q-ma-xs q-chat-content">
                </q-chat-message>
            <!-- </div> -->
            </q-card>
            <q-footer class="bg-white row justify-center">
                <q-input outlined  class="q-ma-md" style="width: 70%; font-size: larger;" v-model="text" @keyup.enter="sendMessage()" autogrow >
                </q-input>
                <q-btn flat dense icon="send" @click="sendMessage()" color="cyan-8"/>
            </q-footer>
    </q-page>
</template>

<script>
    import {ref,onMounted, onUpdated, nextTick} from "vue"
    import {instance} from "../plugins/axios.ts"
    import {useUserStore} from "../store/index"
    export default {
        name:"InboxMessages",
        setup () {
            const chatContainer = ref(null);
            onMounted(() => {
                //getLastMessages()
            });

            const userStore = useUserStore()
            const messages = ref([
            ])
            const text = ref("")
            const id = ref(0)  
            const count = ref(0)
            function formatDateTime(timestamp) {
                const date = new Date(timestamp);
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const day = date.getDate();
                const month = date.getMonth() + 1;

                const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
                const formattedDate = `${day}/${month}`;
                const formattedDateTime = `${formattedTime} ${formattedDate}`;

                return formattedDateTime;
            }
            const sendMessage = async() =>{
                if(text.value == "") return
                try {
                    id.value = messages.value.length
                    const message = {
                        "id": id.value,
                        "receiver": 0,
                        "sender": 0,
                        "text": text.value,
                        "date": formatDateTime(Date.now()),
                    }
                    const miJSON = JSON.stringify(message);
                    const user = userStore.get_user
                    const response = await instance.post("/messages/create", miJSON, {
                        params:
                        {
                            token: user.token
                        },
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })
                    messages.value.push({
                        id: id.value,
                        text: text.value,
                        date: formatDateTime(Date.now()),
                        sent: true
                    })
                    text.value = ""
                    await nextTick()
                    const lastMessage = document.getElementById(id.value.toString())
                    lastMessage.scrollIntoView({behavior:"smooth"})
                } catch (error) {
                    console.log(error)
                }
            }
            
            return {
                text,
                messages,
                sendMessage,
            }
        }
    }
</script>

<style lang="scss" scoped>
.q-chat-container {
  scroll-behavior: smooth;
  overflow-y: auto;
}

</style>