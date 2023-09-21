<template>
    <InboxMessages v-if="onChat.set" class="full-height"/>
    <q-list bordered v-else>
        <div v-if="admins.length > 0">
            <q-item-label header>Admins</q-item-label>
            <ContactoMessages :contact="admins"/>

        </div>
        <div v-if="security.length > 0">
            <q-item-label header>Seguridad</q-item-label>
            <ContactoMessages :contact="security"/>
        </div>
        <div v-if="residents.length > 0">
            <q-item-label header>Condominos</q-item-label>
            <ContactoMessages :contact="residents"/>
        </div>
    </q-list>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, inject, ref, provide, reactive } from 'vue'
import InboxMessages from "../components/InboxMessages.vue"
import { instance } from '@/plugins/axios'
import { useUserStore, useChatStore } from '@/store/index'
import ContactoMessages from '../components/ContactoMessages.vue'

export default defineComponent({
    name:"MessagesView",
    components: {
        InboxMessages,
        ContactoMessages
    },
    setup () {
        const chatStore = useChatStore()
        const admins = ref([])
        const security = ref([])
        const residents = ref([])
        const userStore = useUserStore()
        const onChat = chatStore.get_onChat
        chatStore.put_onChat(onChat)
        onBeforeMount(async() =>  {
            try {
                const response = await instance.get("/user/getByType", {
                    params: {
                        token: userStore.get_user.token,
                    }
                })
                const status = response.data.status
                if (status == "Success") {
                    const users = response.data.data
                    console.log(users)
                    admins.value = users.Admin != "null"  ? users.Admin: []
                    security.value = users.Seguridad != "null"  ? users.Seguridad : []
                    residents.value = users.Condomino != "null"  ? users.Condomino : []
                }
            } catch (error) {
                console.log(error)
            }
        })
        return {
            admins,
            security,
            residents,
            chatStore,
            onChat
        }
    }
})
</script>

<style scoped>

</style>