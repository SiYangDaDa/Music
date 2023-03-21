<template>
    <!-- 搜索框 -->
    <div>
        <van-search
            v-model="searchInfo"
            shape="round"
            placeholder="请输入搜索关键词"
        />
    </div>
    <!-- 导航栏 -->
    <div id="song-navBar">
        <van-grid>
            <van-grid-item icon="photo-o" text="文字" />
            <van-grid-item icon="photo-o" text="文字" />
            <van-grid-item icon="photo-o" text="文字" />
            <van-grid-item icon="photo-o" text="文字" />
        </van-grid>
    </div>
    <!-- 精品歌单 -->
    <p class="topic-title">精品歌单</p>
    <div id="topic-list-box">
        <card :width="'45vw'" v-for="item in boutiqueSongsList" :key="item.id" :name="item.name" :url="item.coverImgUrl"></card>
    </div>
    <!-- 热门歌单 -->
    <p class="topic-title">热门歌单</p>
    <div id="topic-list-box">
        <card :width="'45vw'" v-for="item in hotSongList" :key="item.id" :name="item.name" :url="item.coverImgUrl"></card>
    </div>
    <p class="topic-title">没有更多啦！</p>
    <!-- 播放器 -->
    <div id="play-bar">
        <audio id="player" src="" loop="false" controls poster="" name="未知音频" author="俩白" 
            binderror="" bindplay="" bindpause="" bindtimeupdate="" bindended="">
        </audio>
    </div>
</template>

<script>
    import Card from "../compments/Card.vue"
    import {reactive,toRefs} from 'vue'
    import {BoutiqueSongsListApi,HotSongsListApi} from "../http/api" 
    
    export default{
        name:"getBoutiqueSongsList",
        components:{
            Card,
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
                console.log('data',res.data)
            }
            // 执行方法，获取数据
            getBoutiqueSongsList()
            getHotSongsList()

            return{
                ...toRefs(dataInfo),
                test
            }
        }
    }
</script>


<style lang="less" scoped>
    #play-bar{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 10vw;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        
        #player{
            height: 8vw;
        }
    }
    .topic-title{
        text-align: center;
        margin: 1vw 0;
    }
    #topic-list-box{
        display: flex;
        width: 100vw;
        justify-content:space-evenly;
        flex-wrap:wrap;
    }
</style>
