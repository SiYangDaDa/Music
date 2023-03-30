<template>
     <div id="type">
        <div :class="{'type-item':true,'selected':area=='内地' ? true : false}" @click="area='内地'">内地</div>
        <div :class="{'type-item':true,'selected':area=='港台' ? true : false}" @click="area='港台'">港台</div>
        <div :class="{'type-item':true,'selected':area=='欧美' ? true : false}" @click="area='欧美'">欧美</div>
        <div :class="{'type-item':true,'selected':area=='韩国' ? true : false}" @click="area='韩国'">韩国</div>
        <div :class="{'type-item':true,'selected':area=='日本' ? true : false}" @click="area='日本'">日本</div>
    </div>
    <div class="mvItem" v-show="InlandMvList.length>0&&area=='内地'">
        <MvItem v-for="(m,index) in InlandMvList" :url="m.cover" :key="index" :artistName="m.artistName" :name="m.name" :desc="m.briefDesc" :duration="m.duration" :playCount="m.playCount" @click="skipToMvPlay(m.id,m.artistName,m.name,m.briefDesc,m.duration,m.playCount,m.cover)"></MvItem>
    </div>
    <div class="mvItem" v-show="HTMvList.length>0&&area=='港台'">
        <MvItem v-for="(m,index) in HTMvList" :url="m.cover" :key="index" :artistName="m.artistName" :name="m.name" :desc="m.briefDesc" :duration="m.duration" :playCount="m.playCount" @click="skipToMvPlay(m.id,m.artistName,m.name,m.briefDesc,m.duration,m.playCount,m.cover)"></MvItem>
    </div>
    <div class="mvItem" v-show="WesternMvList.length>0&&area=='欧美'">
        <MvItem v-for="(m,index) in WesternMvList" :url="m.cover" :key="index" :artistName="m.artistName" :name="m.name" :desc="m.briefDesc" :duration="m.duration" :playCount="m.playCount" @click="skipToMvPlay(m.id,m.artistName,m.name,m.briefDesc,m.duration,m.playCount,m.cover)"></MvItem>
    </div>
    <div class="mvItem" v-show="KoreaMvList.length>0&&area=='韩国'">
        <MvItem v-for="(m,index) in KoreaMvList" :url="m.cover" :key="index" :artistName="m.artistName" :name="m.name" :desc="m.briefDesc" :duration="m.duration" :playCount="m.playCount" @click="skipToMvPlay(m.id,m.artistName,m.name,m.briefDesc,m.duration,m.playCount,m.cover)"></MvItem>
    </div>
    <div class="mvItem" v-show="JapanMvList.length>0&&area=='日本'">
        <MvItem v-for="(m,index) in JapanMvList" :url="m.cover" :key="index" :artistName="m.artistName" :name="m.name" :desc="m.briefDesc" :duration="m.duration" :playCount="m.playCount" @click="skipToMvPlay(m.id,m.artistName,m.name,m.briefDesc,m.duration,m.playCount,m.cover)"></MvItem>
    </div>
</template>

<script>
    import {timeDif} from "../util/timeDif"
    import {GetMvApi} from "../http/api"
    import MvItem from "../compments/MvItem.vue"
    import { reactive,toRefs,watch,onMounted,getCurrentInstance } from "vue"
    import { useRouter } from "vue-router"
    export default{
        components:{
            MvItem,
        },
        setup(){
            const router=useRouter()
            // 跳转到Mv详情页
            const skipToMvPlay=(id,artistName,name,briefDesc,duration,playCount,cover)=>{
                router.push({path:"/mvPlay",query:{id,artistName,name,briefDesc,duration,playCount,cover}})
            }
            const dataInfo=reactive({
                limit:20,
                area:"内地",
                InlandMvList:[],
                HTMvList:[],
                WesternMvList:[],
                KoreaMvList:[],
                JapanMvList:[],
                InlandOffset:0,
                HTOffset:0,
                WesternOffset:0,
                KoreaOffset:0,
                JapanOffset:0,
                timer:null,

            })
            const getMvList=async()=>{
                let params
                if(dataInfo.area=="内地"){
                    params={
                        area:dataInfo.area,
                        limit:dataInfo.limit,
                        offset:++dataInfo.InlandOffset
                    }
                    const res=await GetMvApi(params)
                    dataInfo.InlandMvList=dataInfo.InlandMvList.concat(res.data.data)
                }else if(dataInfo.area=="港台"){
                    params={
                        area:dataInfo.area,
                        limit:dataInfo.limit,
                        offset:++dataInfo.HTOffset
                    }
                    const res=await GetMvApi(params)
                    dataInfo.HTMvList=dataInfo.HTMvList.concat(res.data.data)
                }else if(dataInfo.area=="欧美"){
                    params={
                        area:dataInfo.area,
                        limit:dataInfo.limit,
                        offset:++dataInfo.WesternOffset
                    }
                    const res=await GetMvApi(params)
                    dataInfo.WesternMvList=dataInfo.WesternMvList.concat(res.data.data)
                }else if(dataInfo.area=="韩国"){
                    params={
                        area:dataInfo.area,
                        limit:dataInfo.limit,
                        offset:++dataInfo.KoreaOffset
                    }
                    const res=await GetMvApi(params)
                    dataInfo.KoreaMvList=dataInfo.KoreaMvList.concat(res.data.data)
                }else if(dataInfo.area=="日本"){
                    params={
                        area:dataInfo.area,
                        limit:dataInfo.limit,
                        offset:++dataInfo.JapanOffset
                    }
                    const res=await GetMvApi(params)
                    dataInfo.JapanMvList=dataInfo.JapanMvList.concat(res.data.data)
                }
            }
            // 监听导航的变化
            watch(()=>dataInfo.area,()=>{
                if(dataInfo.area=="内地"&&dataInfo.InlandMvList.length==0){
                    getMvList()
                }else if(dataInfo.area=="港台"&&dataInfo.HTMvList.length==0){
                    getMvList()
                }else if(dataInfo.area=="欧美"&&dataInfo.WesternMvList.length==0){
                    getMvList()
                }else if(dataInfo.area=="韩国"&&dataInfo.KoreaMvList.length==0){
                    getMvList()
                }else if(dataInfo.area=="日本"&&dataInfo.JapanMvList.length==0){
                    getMvList()
                }
            },{immediate:true,deep:true})
            // 节流函数
            dataInfo.timer=new Date().getTime()
            const throttle=(t,fun)=>{
                const nowTime=new Date().getTime()
                const reaminTime=timeDif(dataInfo.timer,nowTime)
                if(reaminTime>=t){
                    fun()
                    dataInfo.timer=new Date().getTime()
                }
            }
            //滚动条在Y轴上的滚动距离
            const getScrollTop=()=>{
                var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
                if(document.body){
                    bodyScrollTop = document.body.scrollTop;
                }
                if(document.documentElement){
                    documentScrollTop = document.documentElement.scrollTop;
                }
                scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
                return scrollTop;
            }
            //文档的总高度
            const getScrollHeight=()=>{
                var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
                if(document.body){
                    bodyScrollHeight = document.body.scrollHeight;
                }
                if(document.documentElement){
                    documentScrollHeight = document.documentElement.scrollHeight;
                }
                scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
                return scrollHeight;
            }
            //浏览器视口的高度
            const getWindowHeight=()=>{
                return window.innerHeight
            }
            onMounted(()=>{
                window.addEventListener('scroll',function(){
                    if(getScrollTop() + getWindowHeight()+ 200 >= getScrollHeight()){
                        throttle(2,getMvList)
                    }
                })
            })
            return{
                ...toRefs(dataInfo),
                skipToMvPlay
            }
        }
    }
</script>

<style lang="less" scoped>
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
    .mvItem{
        margin-top: 26vw;
    }
</style>