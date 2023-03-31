<template>
    <div id="home-top">
        <div :class="{'top-nav':true,'selected':idx==0 ? true : false}" @click="selectNav(0)">音乐</div>
        <div :class="{'top-nav':true,'selected':idx==1 ? true : false}" @click="selectNav(1)">MV</div>
        <div @click="skipToMine">我的</div>
    </div>
    <div id="home-content">
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>

<script setup>
    import { ref,reactive } from 'vue'
    import {useRouter} from "vue-router"
    import { useStore } from 'vuex'

    const store=useStore()
    const router=useRouter()
    router.push({path:"home/music"})
    let idx=ref(0)
    // 导航跳转
    const selectNav=(index)=>{
        if(idx.value===index) return
        idx.value=index
        if(index==0){
            router.push({path:"music"})
        }else if(index==1){
            store.commit("controlPlay",false)
            router.push({path:"mv"})
        }
    }

    const skipToMine=()=>{
        router.push({path:"/my"})
    }

</script>

<style lang="less" scoped>
    @import url('../src/assets/common.less');
    #home-top{
        z-index: 10;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 12vw;
        font-size: @titleText;
        background-color: @baseColor;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        .selected{
            color: @titleSelectedColor;
            font-weight: bold;
        }
    }
    #home-content{
        margin-top: 10vw;
        box-sizing: border-box;
    }
</style>