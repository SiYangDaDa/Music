<template>
  <div id="music-list">
    <van-nav-bar
        class="navBar"
        :title="route.query.topic"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <van-card
        :desc="route.query.name"
        title=" "
        :thumb="route.query.imgUrl"
    />
    <List v-for="(s,index) in songsList" :key="index" :songName="s.songs[0].name" :songId="s.songs[0].id" :singer="s.songs[0].ar[0].name" :imgUrl="s.songs[0].al.picUrl"/>
  </div>
</template>

<script>
    import List from "../compments/List.vue"
    import { reactive,toRefs,watch } from "vue"
    import {useRoute} from "vue-router"
    import {SongsListDetailApi,SongDetailApi} from "../http/api"

    export default{
        name:"MusicList",
        components:{
            List
        },
        setup(){
            const route=useRoute()
            let fullPath=route.fullPath

            let dataInfo=reactive({
                songsList:[]
            })
            // 监听路由数据的变化
            watch(route,()=>{
                if(route.query.id&&route.fullPath!=fullPath){
                    dataInfo.songsList=[]
                    fullPath=route.fullPath
                    getBoutiqueSongsList()
                }
            })

            // 获取歌单歌曲id
            const getBoutiqueSongsList=async()=>{
                const res=await SongsListDetailApi({id:route.query.id})
                console.log(res.data)
                getSongsDetail(res.data.privileges)
            }
            // 根据传递过来的歌曲id获取歌曲信息
            const getSongsDetail=(idArr)=>{
                idArr.forEach(async(item)=> {
                    const res=await SongDetailApi({ids:item.id})
                    dataInfo.songsList.push(res.data)
                })
                console.log(dataInfo.songsList)
            }
            
            getBoutiqueSongsList()
            // 返回上一级

            const onClickLeft = () => history.back()
            return{
                route,
                onClickLeft,
                ...toRefs(dataInfo)
            }
        }
    }
</script>

<style lang="less" scoped>
    #music-list{
        box-sizing: border-box;
        padding-top: 12vw;
        .navBar{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 12vw;
        }
    }
</style>