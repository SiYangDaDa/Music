<script setup>
// import Home from "../src/views/Home.vue"
  import {useRouter,useRoute} from "vue-router"
    const router=useRouter()
    router.push({path:"/home"})
    // function skipToHome(){
    //     router.push({path:"/home"})
    // }
</script>

<template>
  <!-- <Home></Home> -->
  <!-- <button @click="skipToHome">主页</button> -->
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>

  <!-- <keep-alive>
    <router-view></router-view>
  </keep-alive> -->
</template>

<style lang="less">
  
</style>
