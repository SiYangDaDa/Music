<template>
    <NavBar :title="'播放'"></NavBar>
    <div id="mv-video">
        <video class="video" :src="url" controls :poster="route.query.cover" autoplay></video>
    </div>
    <div id="mv-detail">
        <div class="mv-text">{{ route.query.briefDesc }}</div>
        <div class="mv-text">{{ route.query.artistName }}-{{ route.query.name }}</div>
        <div class="mvItem-icon">
            <div class="icon-box">
                <van-icon name="eye-o" />
                <span>{{ route.query.playCount }}</span>
            </div>
            <div class="icon-box">
                <van-icon name="good-job-o" />
                <span>{{ route.query.duration }}</span>
            </div>
        </div>
    </div>
    <div id="similar-mv">
        <div id="title">相似Mv</div>
        <MvItem v-for="(m,index) in similarMvList" :key="index" :artist-name="m.artists[0].name" :desc="m.briefDesc" :duration="m.duration" :playCount="m.playCount" :name="m.name" :url="m.cover" @click="skipToMvPlay(m.id,m.artists[0].name,m.name,m.briefDesc,m.duration,m.playCount,m.cover)"></MvItem>
    </div>
</template>
<script>
    import MvItem from "../compments/MvItem.vue"
    import NavBar from "../compments/NavBar.vue"
    import {GetMvUrlApi,SimilarMvApi} from "../http/api"

    import { useRoute,useRouter } from "vue-router"
    import { watch,reactive,toRefs } from "vue"
    export default{
        components:{
            NavBar,
            MvItem
        },
        setup() {
            const route=useRoute()
            const router=useRouter()
            const dataInfo=reactive({
                url:"",
                similarMvList:[]
            })
            // 再次跳转到该页面
            const skipToMvPlay=(id,artistName,name,briefDesc,duration,playCount,cover)=>{
                router.push({path:"/mvPlay",query:{id,artistName,name,briefDesc,duration,playCount,cover}})
            }
            // 获取Mv的url
            const getMvUrl=async()=>{
                const res=await GetMvUrlApi({id:route.query.id})
                dataInfo.url=res.data.data.url
                console.log(res.data)
            }
            // 获取相似Mv
            const getSimilarMvList=async()=>{
                const res=await SimilarMvApi({mvid:route.query.id})
                dataInfo.similarMvList=res.data.mvs
                console.log(res.data)
            }
            watch(()=>route.query.id,()=>{
                getMvUrl()
                getSimilarMvList()
            },{deep:true,immediate:true})
            return{
                ...toRefs(dataInfo),
                route,
                skipToMvPlay
            }
        }
    }
</script>

<style lang="less" scoped>
    #mv-video{
        margin-top: 12vw;
        width: 100vw;
        padding: 2vw 2vw 0 2vw;
        box-sizing: border-box;
        .video{
            width: 100%;
        }
    }
    #mv-detail{
        padding: 2vw;
        .mv-text{
            font-size: @smallFont;
        }
        .mvItem-icon{
            display: flex;
            color: gray;
            .icon-box{
                margin-right: 5vw;
                font-size: @smallText;
            }
        }
    }
    #similar-mv{
        #title{
            padding-left: 4vw;
            font-weight: bold;
        }
    }
</style>