<template>
    <NavBar :title="title"></NavBar>
    <div class="search-box">
        <Search :isClear="isClear" @clearEnd="ensureClearEnd" @on-change="onChange"></Search>
        <div class="search-list">
            <!-- 歌手 -->
            <div class="singer" v-for="sr in singerList" :key="sr.id" @click="skipToSingerDetail(sr.id,sr.name,sr.img1v1Url)">
                <img class="singerImg" :src="sr.img1v1Url" alt="">
                <div class="singerInfo">
                    <div class="singerName">歌手：{{ sr.name }}</div>
                    <div class="albumSum">专辑：{{ sr.albumSize }}</div>
                </div>
            </div>
            <!-- 歌曲 -->
            <div class="list-item" v-for="(s,index) in songsList" @click="getSongs(s.id,index)">{{ s.name }}-{{ s.artists[0].name }}</div>
        </div>
    </div>
    <div id="songsList">
        <List v-for="(s,index) in songs" :key="index" :songName="s.name" :songId="s.id" :singer="s.artists[0].name" :singerId="s.artists[0].id" @click="passMusicInfo(s.id,index,'search')"/>
    </div>
</template>

<script>
    import List from "../compments/List.vue"
    import Search from "../compments/Search.vue"
    import NavBar from "../compments/NavBar.vue"
    import {SearchSingerAndSongs} from "../http/api"
    import { useRouter } from "vue-router"
    import { useStore } from "vuex"
    import { reactive,toRefs } from "vue"
    export default{
        components:{
            NavBar,
            Search,
            List
        },
        setup(){
            const router=useRouter()
            const store=useStore()
            let dataInfo=reactive({
                title:"搜索",
                singerList:[],
                songsList:[],
                songs:[],
                isClear:false
            })
            // 
            const ensureClearEnd=()=>{
                dataInfo.isClear=false
            }
            // 根据关键词获取歌手获取歌曲
            const getInfoByKeyword=async(keyword)=>{
                const res=await SearchSingerAndSongs({keywords:keyword})
                if(res.data.result){
                    dataInfo.singerList=res.data.result.artists
                    dataInfo.songsList=res.data.result.songs.filter(item=>item.fee==0||item.fee==8)// 过滤掉收费或者需要会员的歌曲
                }else{
                    dataInfo.singerList=[]
                    dataInfo.songsList=[]
                }
            }
            // 接收输入框的值
            const onChange=(value)=>{
                getInfoByKeyword(value)
            }
            // 将搜索的歌曲列表传递给songs
            const getSongs=(id,index)=>{
                // 将单曲信息传递给vuex
                passSongsList(dataInfo.songsList,"search")
                // 将歌曲列表传递给vuex                
                passMusicInfo(id,index,"search")
                dataInfo.songs=dataInfo.songsList
                dataInfo.songsList=[]
                dataInfo.singerList=[]
                dataInfo.isClear=true
            }
            // 跳转到歌手详情页
            const skipToSingerDetail=(id,name,url)=>{
                router.push({path:"/singerDetail",query:{id,name,url}})
            }
            // 将当前歌曲的id、索引及歌曲类型传递给vuex以解析
            const passMusicInfo=(songId,index,type)=>{
                let musicInfo={
                    songId,
                    index,
                    type
                }
                store.commit('analyzeSongInfo',musicInfo)
            }
            // 传递当前歌曲列表以及列表类型到vuex
            const passSongsList=(songsList,type)=>{
                let info={
                    songsList,
                    type
                }
                // 将歌曲列表信息传递给vuex
                store.commit("getSongsList",info)
            }
            return{
                ...toRefs(dataInfo),
                onChange,
                getSongs,
                skipToSingerDetail,
                ensureClearEnd,
                passMusicInfo
            }
        }
    }
</script>

<style lang="less" scoped>
    
    .search-box{
        position: relative;
        .search-list{
            position: absolute;
            top: 14vw;
            left: 5vw;
            right: 5vw;
            background-color: #fff;
            .list-item{
                margin-bottom: 1vw;
                text-align: left;
                padding: 0 2vw;
            }
            .singer{
                display: flex;
                padding: 0 2vw;
                align-items: center;
                margin-bottom: 2vw;
                .singerImg{
                    width: 14vw;
                    border-radius: 7vw;
                }
            }
        }
    }
    
</style>