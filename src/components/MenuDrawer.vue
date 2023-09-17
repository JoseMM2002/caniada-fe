<template>
    <div>
    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        :width="200"
        elevated
        class="bg-green-3 text-white q-pt-xs"
      >
      <div class="">
        <div v-for="(item,index) in listDrawer" :key="index" class="">
          <q-btn flat @click="item.method(item.model)" class="full-width q-pa-none q-my-sm" :icon="item.icon" color="indigo-10" size="md">
            <div class="q-ml-sm">{{item.label}}</div>
          </q-btn>
        </div>
      </div>
    </q-drawer>

    </div>
</template>

<script>
import {inject} from "vue"
import {getMenu} from "./getMenu"
export default {
    name:"MenuDrawer",
    setup () {
        const leftDrawerOpen = inject("app-drawer")
        const listDrawer = getMenu("Condomino")
        return {
            leftDrawerOpen,
            listDrawer,
        }
    }
}
</script>

<style lang="scss" scoped>

</style>