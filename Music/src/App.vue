<script setup>
  import {useRouter,useRoute} from "vue-router"
    const router=useRouter()
    const route=useRoute()
    router.push({path:"/home"})
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style lang="less">
  
</style>
