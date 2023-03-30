<template>
    <NavBar :title="route.query.topic"></NavBar>
    <div id="type">
        <div :class="{'type-item':true,'selected':navIndex==1 ? true : false}" @click="chooseNav(1)">华语</div>
        <div :class="{'type-item':true,'selected':navIndex==2 ? true : false}" @click="chooseNav(2)">欧美</div>
        <div :class="{'type-item':true,'selected':navIndex==3 ? true : false}" @click="chooseNav(3)">韩国</div>
        <div :class="{'type-item':true,'selected':navIndex==4 ? true : false}" @click="chooseNav(4)">日本</div>
    </div>
    <div class="singer" v-show="navIndex==1">
        <Card :width="'30vw'" v-for="p in China" :name="p.name" :id="p.id" :url="p.picUrl" @click="skipToSingerDetail(p.id,p.name,p.picUrl)"></Card>
    </div>
    <div class="singer" v-show="navIndex==2">
        <Card :width="'30vw'" v-for="p in Western" :name="p.name" :id="p.id" :url="p.picUrl" @click="skipToSingerDetail(p.id,p.name,p.picUrl)"></Card>
    </div>
    <div class="singer" v-show="navIndex==3">
        <Card :width="'30vw'" v-for="p in Korea" :name="p.name" :id="p.id" :url="p.picUrl" @click="skipToSingerDetail(p.id,p.name,p.picUrl)"></Card>
    </div>
    <div class="singer" v-show="navIndex==4">
        <Card :width="'30vw'" v-for="p in Japan" :name="p.name" :id="p.id" :url="p.picUrl" @click="skipToSingerDetail(p.id,p.name,p.picUrl)"></Card>
    </div>
</template>

<script>
    import NavBar from "../compments/NavBar.vue"
    import Card from "../compments/Card.vue"
    import {SingerRankingListApi} from "../http/api"
    import { useRoute,useRouter } from 'vue-router'
    import { reactive,toRefs } from "vue"
    export default{
        components:{
            Card,
            NavBar
        },
        setup(){

            const dataInfo=reactive({
                China:[],
                Western:[],
                Korea:[],
                Japan:[],
                navIndex:1,
            })

            // 根据导航索引判断要获取的歌手类型
            const chooseNav=(index)=>{
                if(index==1){
                    dataInfo.navIndex=index
                    if(dataInfo.China.length>0) return
                    getSingerList()
                }else if(index==2){
                    dataInfo.navIndex=index
                    if(dataInfo.Western.length>0) return
                    getSingerList()
                }else if(index==3){
                    dataInfo.navIndex=index
                    if(dataInfo.Korea.length>0) return
                    getSingerList()
                }else if(index==4){
                    dataInfo.navIndex=index
                    if(dataInfo.Japan.length>0) return
                    getSingerList()
                }
            }
            // 获取不同国家的歌手列表
            const getSingerList=async()=>{
                const res=await SingerRankingListApi({type:dataInfo.navIndex})
                if(dataInfo.navIndex==1){
                    dataInfo.China=res.data.list.artists
                }else if(dataInfo.navIndex==2){
                    dataInfo.Western=res.data.list.artists
                }else if(dataInfo.navIndex==3){
                    dataInfo.Korea=res.data.list.artists
                }else if(dataInfo.navIndex==4){
                    dataInfo.Japan=res.data.list.artists
                }
            }
            const route=useRoute()
            // 返回上一级
            const onClickLeft = () => history.back()
            const router=useRouter()
            // 跳转到歌手详情页
            const skipToSingerDetail=(id,name,url)=>{
                router.push({path:"/singerDetail",query:{id,name,url}})
            }
            chooseNav(1)
            return{
                route,
                ...toRefs(dataInfo),
                chooseNav,
                onClickLeft,
                skipToSingerDetail
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
            border-bottom: 0.267vw solid @titleSelectedColor;
            color: @titleSelectedColor;
        }
    }
    .singer{
        margin-top: 28vw;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }
</style>