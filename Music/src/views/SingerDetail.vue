<template>
  <van-nav-bar
        class="navBar"
        :title="route.query.name"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <div class="card" v-if="route.query.name">
        <img class="card-img" :src="route.query.url" alt="">
        <div class="card-text">
            <p>{{ route.query.name }}</p>
            <p>歌曲：{{ musicSize }}</p>
            <p>专辑：{{ albumSize }}</p>
        </div>
    </div>
    <div id="type">
        <div :class="{'type-item':true,'selected':navIndex==0 ? true : false}" @click="chooseNav(0)">简介</div>
        <div :class="{'type-item':true,'selected':navIndex==1 ? true : false}" @click="chooseNav(1)">音乐</div>
        <!-- <div :class="{'type-item':true,'selected':navIndex==1 ? true : false}" @click="chooseNav(2)">MV</div> -->
    </div>
    <div class="singerInfo" v-show="navIndex==0">
        <div class="testInfo">{{ singerInfo }}</div>
    </div>
    <div class="songs" v-show="navIndex==1">
        <List :song-name="s.name" :song-id="s.id" :singer="s.ar[0].name" :img-url="s.al.picUrl" v-for="(s,index) in songsList" :key="index" @click="passMusicInfo(s.id,index)"></List>
    </div>
    <!-- <div class="mv"></div> -->
</template>

<script>
    import List from '../compments/List.vue'
    import { reactive,toRefs,watch } from 'vue'
    import { useRoute } from 'vue-router'
    import { useStore } from 'vuex'
    import {SingerAllSongsApi,PerInfoAndHotSongsApi,} from "../http/api"
    export default{
        components:{
            List
        },
        setup(){
            
            const dataInfo=reactive({
                singerInfo:"",
                songsList:[],
                musicSize:null,
                albumSize:null,
                navIndex:0,
                fullPath:null,
            })
            const store=useStore()
            const route=useRoute()
            // 返回上一级
            const onClickLeft = () => history.back()
            // 监听路由数据的变化
            watch(route,()=>{
                if(route.query.id&&route.fullPath!=dataInfo.fullPath){
                    console.log(route.query)
                    dataInfo.songsList=[]
                    dataInfo.singerInfo=[]
                    dataInfo.musicSize=null
                    dataInfo.albumSize=null
                    dataInfo.fullPath=route.fullPath
                    getSingerInfoAndHotSongs()
                }
            })
            // 获取歌手歌曲
            const getSingerAllSongs=async()=>{
                const res=await SingerAllSongsApi({id:route.query.id})
                console.log(res.data)
            }
            // 传递当前歌曲列表到vuex
            const passSongsList=()=>{
                let info={
                    songsList:dataInfo.songsList,
                    type:"singerHotSongs"
                }
                // 将歌曲列表信息传递给vuex
                store.commit("getSongsList",info)
            }
            // 获取歌手简介及50首热门歌曲
            const getSingerInfoAndHotSongs=async()=>{
                const res=await PerInfoAndHotSongsApi({id:route.query.id})
                console.log(res.data)
                dataInfo.singerInfo=res.data.artist.briefDesc
                dataInfo.musicSize=res.data.artist.musicSize
                dataInfo.albumSize=res.data.artist.albumSize
                dataInfo.songsList=res.data.hotSongs.filter(item=>item.fee==0||item.fee==8)
                console.log(dataInfo.songsList)
                passSongsList()
            }
            // 选择导航分类并获取相应的数据
            const chooseNav=(idx)=>{
                dataInfo.navIndex=idx
            }
            // 将当前歌曲的id及索引传递给vuex以解析
            const passMusicInfo=(songId,index)=>{
                const type="singerHotSongs"
                let musicInfo={
                    songId,
                    index,
                    type
                }
                store.commit('analyzeSongInfo',musicInfo)
            }
            // getSingerAllSongs()
            getSingerInfoAndHotSongs()
            return{
                route,
                onClickLeft,
                chooseNav,
                passMusicInfo,
                ...toRefs(dataInfo)
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
    }
    .card{
        margin-top: 12vw;
        display: flex;
        padding: 2vw;
        .card-img{
            width: 30vw;
            border-radius: 5%;
        }
        .card-text{
            margin-left: 2vw;
            font-size: @normalText;
        }
    }
    #type{
        display: flex;
        justify-content: space-around;
        font-size: @titleText;
        .type-item{
            padding: 2vw;
        }
        .selected{
            font-weight: bold;
            border-bottom: 0.267vw solid @titleSelectedColor;
            color: @titleSelectedColor;
        }
    }
    .singerInfo{
        .testInfo{
            text-indent: 8vw;
            padding: 2vw;
            font-size: @normalText;
        }
    }
</style>