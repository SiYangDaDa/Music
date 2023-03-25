<template>
  <van-nav-bar
        class="navBar"
        :title="route.query.topic"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <div id="type">
        <div :class="{'type-item':true,'selected':navIndex==1 ? true : false}" @click="chooseNav(1)">华语</div>
        <div :class="{'type-item':true,'selected':navIndex==2 ? true : false}" @click="chooseNav(2)">欧美</div>
        <div :class="{'type-item':true,'selected':navIndex==3 ? true : false}" @click="chooseNav(3)">韩国</div>
        <div :class="{'type-item':true,'selected':navIndex==4 ? true : false}" @click="chooseNav(4)">日本</div>
    </div>
    <div id="singer">
        <Card :width="'30vw'" v-for="p in singerList" :name="p.name" :id="p.id" :url="p.picUrl"></Card>
    </div>
</template>

<script>
    import Card from "../compments/Card.vue"
    import {SingerRankingListApi} from "../http/api"
    import { useRoute } from 'vue-router'
    import { reactive,toRefs } from "vue"
    export default{
        components:{
            Card,
        },
        setup(){

            const dataInfo=reactive({
                China:[],
                Western:[],
                Korea:[],
                Japan:[],
                singerList:[],
                navIndex:1,
            })

            const chooseNav=(index)=>{
                console.log(index)
                if(index==1){
                    dataInfo.navIndex=index
                    if(dataInfo.China.length>0) dataInfo.singerList=dataInfo.China
                    getSingerList()
                }else if(index==2){
                    dataInfo.navIndex=index
                    if(dataInfo.Western.length>0) dataInfo.singerList=dataInfo.Western
                    getSingerList()
                }else if(index==3){
                    dataInfo.navIndex=index
                    if(dataInfo.Korea.length>0) dataInfo.singerList=dataInfo.Korea
                    getSingerList()
                }else if(index==4){
                    dataInfo.navIndex=index
                    if(dataInfo.Japan.length>0) dataInfo.singerList=dataInfo.Japan
                    getSingerList()
                }
            }

            const getSingerList=async()=>{
                const res=await SingerRankingListApi({type:dataInfo.navIndex})
                if(dataInfo.navIndex==1){
                    dataInfo.China=res.data.list.artists
                    dataInfo.singerList=dataInfo.China
                }else if(dataInfo.navIndex==2){
                    dataInfo.Western=res.data.list.artists
                    dataInfo.singerList=dataInfo.Western
                }else if(dataInfo.navIndex==3){
                    dataInfo.Korea=res.data.list.artists
                    dataInfo.singerList=dataInfo.Korea
                }else if(dataInfo.navIndex==4){
                    dataInfo.Japan=res.data.list.artists
                    dataInfo.singerList=dataInfo.Japan
                }
            }
            const route=useRoute()
            // 返回上一级
            const onClickLeft = () => history.back()

            chooseNav(1)
            return{
                route,
                ...toRefs(dataInfo),
                chooseNav,
                onClickLeft
            }
        }
    }
</script>

<style lang="less" scoped>
    .navBar{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 12vw;
        z-index: 999;
    }
    #type{
        z-index: 998;
        position: fixed;
        top: 14vw;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-around;
        .type-item{
            padding: 2vw;
        }
        .selected{
            font-weight: bold;
            border-bottom: 0.267vw solid #409EFF;
            color: #409EFF;
        }
    }
    #singer{
        margin-top: 28vw;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }
</style>