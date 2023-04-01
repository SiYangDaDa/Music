<template>
    <!-- 搜索框 -->
    <Search @click="skipToSearchDetail"></Search>
    <!-- 图标导航栏 -->
    <div id="song-navBar">
        <div class="img-nav" @click="skipToSongsList(1234567,'','','最新音乐','latest')">
            <img class="nav-icon" src="../../public/img/latest.png" alt="">
            <span class="nav-content">最新音乐</span>
        </div>
        <div class="img-nav" @click="skipToHotSonger">
            <img class="nav-icon" src="../../public/img/singer.png" alt="">
            <span class="nav-content">热门歌手</span>
        </div>
        <div class="img-nav">
            <img class="nav-icon" src="../../public/img/myLike.png" alt="">
            <span class="nav-content">我的喜欢</span>
        </div>
    </div>
    <!-- 精品歌单 -->
    <p class="topic-title">精品歌单</p>
    <div id="topic-list-box">
        <card :width="'45vw'" v-for="item in boutiqueSongsList" :key="item.id" :name="item.name" :url="item.coverImgUrl" @click="skipToSongsList(item.id,item.name,item.coverImgUrl,'精品推荐','recommend')"></card>
    </div>
    <!-- 热门歌单 -->
    <p class="topic-title">热门歌单</p>
    <div id="topic-list-box">
        <card :width="'45vw'" v-for="item in hotSongList" :key="item.id" :name="item.name" :url="item.coverImgUrl" @click="skipToSongsList(item.id,item.name,item.coverImgUrl,'热门推荐','recommend')"></card>
    </div>
    <p class="topic-title">没有更多啦！</p> 
    <!-- <BottomAudio/> -->
</template>

<script>
    import Search from "../compments/Search.vue"
    import Card from "../compments/Card.vue"
    // import BottomAudio from "../compments/BottomAudio.vue"
    import {reactive,toRefs} from 'vue'
    import {useRouter} from "vue-router"
    import {BoutiqueSongsListApi,HotSongsListApi} from "../http/api" 
    
    export default{
        name:"getBoutiqueSongsList",
        components:{
            Card,
            Search,
        },
        setup(){
            // 该组件的所有响应式数据
            let dataInfo=reactive({
                boutiqueSongsList:[],
                hotSongList:[],
                searchInfo:"",
            })
            // 获取精品歌单
            const getBoutiqueSongsList=async()=>{
                const res=await BoutiqueSongsListApi()
                dataInfo.boutiqueSongsList = res.data.playlists
            }
            // 获取热门歌单
            const getHotSongsList=async()=>{
                const res=await HotSongsListApi()
                dataInfo.hotSongList = res.data.playlists
            }
            // 跳转到歌单详情页
            const router=useRouter()
            const skipToSongsList=(id,name,imgUrl,topic,type)=>{
                router.push({path:"/musicList",query:{id,name,imgUrl,topic,type}})
            }
            // 跳转到搜索详情页
            const skipToSearchDetail=()=>{
                router.push({path:"/searchDetail"})
            }
            // 跳转到热门歌手页面
            const skipToHotSonger=()=>{
                router.push({path:"/hotSinger",query:{topic:"热门歌手"}})
            }
            // 执行方法，获取数据
            getBoutiqueSongsList()
            getHotSongsList()

            return{
                ...toRefs(dataInfo),
                skipToSongsList,
                skipToHotSonger,
                skipToSearchDetail
            }
        }
    }
</script>


<style lang="less">
    .topic-title{
        text-align: center;
        margin: 2vw;
        padding: 2vw;
        background-color: #fff;
        border-radius: 2vw;
    }
    #topic-list-box{
        display: flex;
        width: 100vw;
        justify-content:space-evenly;
        flex-wrap:wrap;
    }
    #song-navBar{
        display: flex;
        justify-content: space-around;
        margin-top: 2vw;
        .img-nav{
            width: 18vw;
            height: 18vw;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
            background-color: #fff;
            padding: 2vw;
            // box-sizing: border-box;
            border-radius: 15%;
            .nav-icon{
                width: 12vw;
                height: 12vw;
            }
        }
    }
    .van-search-input-height{
        height: 12vw;
    }
</style>
