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
        <div v-for="item in listDrawer" :key="item.id" class="">
          <q-btn flat @click="item.method(modelsList[item.id])" class="full-width q-pa-md" :icon="item.icon" color="indigo-10" size="md" align="left">
            <div class="q-ml-sm">{{item.label}}</div>
          </q-btn>
          <q-dialog v-model="modelsList[item.id].value">
            <component :is="item.component"/>
          </q-dialog>
        </div>
      </div>
    </q-drawer>

    </div>
</template>

<script>
import {inject, ref, onBeforeMount} from "vue"
import {getMenu} from "./getMenu"
export default {
    name:"MenuDrawer",
    setup () {
        const listDrawer = ref([])
        onBeforeMount(() => {
          listDrawer.value = getMenu("")
        })
        const modelsList = ref([ref(false), ref(false), ref(false), ref(false), ref(false)])
        const leftDrawerOpen = inject("app-drawer")
        console.log(modelsList)
        console.log(listDrawer)
        return {
            leftDrawerOpen,
            listDrawer,
            modelsList
        }
    }
}
</script>

<style lang="scss" scoped>

</style>