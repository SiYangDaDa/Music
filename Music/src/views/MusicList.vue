<template>
  <div id="music-list">
    <van-nav-bar
        class="navBar"
        :title="route.query.topic"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <!-- <van-card
        :desc="route.query.name"
        title=" "
        :thumb="route.query.imgUrl"
    /> -->
    <div class="card" v-if="route.query.name">
        <img class="card-img" :src="route.query.imgUrl" alt="">
        <div class="card-text">{{ route.query.name }}</div>
    </div>
    <div v-if="route.query.type=='recommend'">
        <List v-for="(s,index) in songsList" :key="index" :songName="s.songs[0].name" :songId="s.songs[0].id" :singer="s.songs[0].ar[0].name" :imgUrl="s.songs[0].al.picUrl" @click="passMusicInfo(s.songs[0].id,index)"/>
    </div>
    <div v-if="route.query.type=='latest'">
        <List v-for="(s,index) in songsList" :key="index" :songName="s.name" :songId="s.id" :singer="s.artists[0].name" :imgUrl="s.album.picUrl" :singerId="s.artists[0].id" @click="passMusicInfo(s.id,index)"/>
    </div>
    
  </div>
</template>

<script>
    // import BottomAudio from "../compments/BottomAudio.vue"
    import List from "../compments/List.vue"
    import { reactive,toRefs,watch } from "vue"
    import {useRoute} from "vue-router"
    import { useStore } from 'vuex'
    import {SongsListDetailApi,SongDetailApi,LatestMusicApi} from "../http/api"

    export default{
        name:"MusicList",
        components:{
            List,
            // BottomAudio
        },
        setup(){
            const route=useRoute()
            const store=useStore()
            let fullPath=route.fullPath

            let dataInfo=reactive({
                songsList:[],
            })
            // 监听路由数据的变化
            watch(route,()=>{
                if(route.query.id&&route.fullPath!=fullPath){
                    console.log(route.query)
                    dataInfo.songsList=[]
                    fullPath=route.fullPath
                    if(route.query.type=="recommend"){
                        getBoutiqueSongsList()
                    }else if(route.query.type=="latest"){
                        getLatestMusic()
                    }
                }
            })

            // 获取歌单歌曲id
            const getBoutiqueSongsList=async()=>{
                const res=await SongsListDetailApi({id:route.query.id})
                getSongsDetail(res.data.privileges)
            }
            // 根据歌单传递过来的歌曲id获取歌曲信息并将歌曲列表信息传递给vuex
            const getSongsDetail=(idArr)=>{
                idArr.forEach(async(item)=> {
                    const res=await SongDetailApi({ids:item.id})
                    dataInfo.songsList.push(res.data)
                })
                passSongsList()
            }
            // 传递当前歌曲列表到vuex
            const passSongsList=()=>{
                let info={
                    songsList:dataInfo.songsList,
                    type:route.query.type
                }
                // 将歌曲列表信息传递给vuex
                store.commit("getSongsList",info)
            }
            // 获取最新音乐
            const getLatestMusic=async()=>{
                // type:0获取的是全部分类的最新音乐
                const res=await LatestMusicApi({type:0})
                dataInfo.songsList=res.data.data.filter(item=>item.fee==0||item.fee==8)// 过滤掉收费或者需要会员的歌曲
                passSongsList()
            }
            const firstGet=()=>{
                if(route.query.type=="recommend"){
                    getBoutiqueSongsList()
                }else if(route.query.type=="latest"){
                    getLatestMusic()
                }
            }
            // 将当前歌曲的id及索引传递给vuex以解析
            const passMusicInfo=(songId,index)=>{
                const type=route.query.type
                let musicInfo={
                    songId,
                    index,
                    type
                }
                store.commit('analyzeSongInfo',musicInfo)
            }
            
            // getBoutiqueSongsList()
            firstGet()

            // 返回上一级
            const onClickLeft = () => history.back()
            return{
                route,
                onClickLeft,
                ...toRefs(dataInfo),
                passMusicInfo
            }
        }
    }
</script>

<style lang="less" scoped>
    #music-list{
        box-sizing: border-box;
        padding-top: 12vw;
        .card{
            display: flex;
            padding: 2vw;
            .card-img{
                width: 30vw;
                height: 30vw;
                border-radius: 5%;
            }
            .card-text{
                margin-left: 2vw;
            }
        }
        .navBar{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 12vw;
        }
    }
</style>