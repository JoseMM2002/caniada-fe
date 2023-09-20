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
      <router-view>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, provide } from "vue";
import { useQuasar } from "quasar";
import MenuDrawer from "./components/MenuDrawer.vue"
import {showDrawer} from "./components/menuMethods"

export default {
  name: "LayoutDefault",
  components: {
    MenuDrawer
  },
  setup() {
    const loginModel = ref(false);
    const registerModel = ref(false);
    const leftDrawerOpen = ref(false);
    const showDr = () =>{
      showDrawer(leftDrawerOpen)
    }
    provide("app-drawer", leftDrawerOpen)
    const $q = useQuasar();
    $q.dark.set(false);
    return {
      leftDrawerOpen,
      showDr,
      loginModel,
      registerModel
    };
  },
};
</script>