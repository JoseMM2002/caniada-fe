<template>
  <q-layout view="lHh Lpr lFf" class="bg-teal-3">
    <q-header elevated>
      <q-card
        flat
        square
        bordered
        class="q-pa-sm text-black row justify-between"
      >
        <q-btn icon="window" flat @click="showDr(leftDrawerOpen)" class="col-auto"></q-btn>
        <q-btn v-if="user ? user.token !=  '' : false" flat @click="logout" class="col-auto" icon="logout" color="red">
        </q-btn>
      </q-card>
    </q-header>
    <MenuDrawer/>
    <q-page-container>
      <router-view class="full-height">
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, provide, reactive } from "vue";
import { useQuasar } from "quasar";
import MenuDrawer from "./components/MenuDrawer.vue"
import {showDrawer} from "./components/menuMethods"
import {useChatStore} from "./store/index"
export default {
  name: "LayoutDefault",
  components: {
    MenuDrawer
  },
  setup() {
    const chatStore = useChatStore()
    const loginModel = ref(false);
    const registerModel = ref(false);
    const leftDrawerOpen = ref(false);
    const showDr = () =>{
      showDrawer(leftDrawerOpen)
    }
    provide("app-drawer", leftDrawerOpen)
    const $q = useQuasar();
    $q.dark.set(false);
    const onChat = reactive({
        set: false,
        algo: ""
    })
    chatStore.put_onChat(onChat)
    return {
      leftDrawerOpen,
      showDr,
      loginModel,
      registerModel
    };
  },
};
</script>