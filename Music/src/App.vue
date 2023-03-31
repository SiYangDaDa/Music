<script setup>
  import BottomAudio from "./compments/BottomAudio.vue";
  import {useRouter,useRoute} from "vue-router"
  import { useStore } from 'vuex'
    const router=useRouter()
    const route=useRoute()
    router.push({path:"/home"})
    const store=useStore()
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <BottomAudio v-show="store.state.songUrl&&(route.path!='mvPlay'||route.path!='mv'||route.path!='my'||route.path!='loginAndRegist')"></BottomAudio>
</template>

<style lang="less">
  
</style>
