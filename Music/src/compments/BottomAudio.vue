<template>
  <div id="play-bar">
        <audio id="player" ref="audio" :src="store.state.songUrl" autoplay="autoplay" controls="controls"></audio>
        <div class="play-bar-left">
            <img class="play-img" :src="store.state.imgUrl" alt="" @click="controlPopUpLayerShow">
            <div class="song-detail">
                <div id="songNameAndSinger">
                    <span>{{store.state.songName}}-{{store.state.singer}}</span>
                </div>
            </div>
        </div>
        <div class="play-bar-right">
            <i class="iconfont icon-zanting" v-if="isPlay" @click="pause"></i>
            <i class="iconfont icon-icon_play" v-else="!isPlay" @click="play"></i>
            <i class="iconfont icon-a-liebiao_huaban1_huaban1"></i>
        </div>
        <PopUpLayer v-if="isShow" :isShow="isShow" @hiddenDom="controlPopUpLayerShow">
            <slot>
                <div id="post">
                    <img id="postImg" :src="store.state.imgUrl" alt="">
                    <div class="post-title">{{ store.state.songName }}</div>
                    <div class="post-title">{{ store.state.singer }}</div>
                    <div class="post-progress">
                        <van-slider v-model="progress" @change="onChange" />
                    </div>
                    <div id="lyric">
                        <div class="lyric-item" v-for="(lr,index) in lrcArr" :key="index">{{ lr }}</div>
                    </div>
                    <div class="control-box">
                        <div class="control"><i class="iconfont icon-dianshunxu"></i></div>
                        <div class="control"><i class="iconfont icon-shangyishou1"></i></div>
                        <div class="control" v-if="!store.state.isPlay" @click="play"><i class="iconfont icon-bofang-"></i></div>
                        <div class="control" v-if="store.state.isPlay" @click="pause"><i class="iconfont icon-zanting-"></i></div>
                        <div class="control"><i class="iconfont icon-xiayishou2"></i></div>
                        <div class="control"><i class="iconfont icon-xihuan-xianxing"></i></div>
                    </div>
                </div>
            </slot>
        </PopUpLayer>
    </div>
</template>

<script>
    import PopUpLayer from './PopUpLayer.vue'
    import { toRefs,reactive,onMounted,watch,computed,getCurrentInstance  } from 'vue'
    import { useStore } from 'vuex'
    import { GetLyricApi } from "../http/api"
    
    export default{
        components:{
            PopUpLayer,
        },
        setup(){
            const dataInfo=reactive({
                isShow:false,
                progress:0,
                timeArr:[],
                lrcArr:[]
            })
            
            const store=useStore()
            const addAnimation=()=>{
                let dom=document.getElementById('songNameAndSinger')
                // 获取dom元素的宽度
                let left=dom.offsetLeft
                let width=dom.offsetWidth
                let leftDistance='-'+(width-left)+'px'
                // 通过js定义一个动画
                document.styleSheets[0].insertRule(
                    `@keyframes move{
                        0%{
                            
                        }
                        100%{
                            transform: translateX(${leftDistance});
                        }
                        
                    }`
                )
                // 给元素添加动画
                dom.style.animation = "move 10s linear infinite"
            }
            // 控制动画的暂停与播放
            const controlAnimation=()=>{
                let dom=document.getElementById('songNameAndSinger')
                dom.style.animation=""
            }

            let isPlay= computed(() => store.state.isPlay)
            
            // 获取歌词信息,解析出时间数组与歌词数组
            const getLyric=async()=>{
                dataInfo.timeArr=[]
                dataInfo.lrcArr=[]
                const res=await GetLyricApi({id:store.state.songId})
                const lrcStr=res.data.lrc.lyric
                const reg=/\[(\d{2}:\d{2})\.\d{2,3}\](.+)/g
                let tmp=reg.exec(lrcStr)
                while(tmp){
                    dataInfo.timeArr.push(tmp[1])
                    dataInfo.lrcArr.push(tmp[2])
                    tmp=reg.exec(lrcStr)
                }
            }
            // 监听store中isPlay的变化用来控制暂停及播放
            watch(()=>store.state.isPlay,()=>{
                if(store.state.isPlay){
                    play()
                }else{
                    pause()
                }
            })
            // 监听store中歌曲id的变化以获取歌词
            watch(()=>store.state.songId,()=>{
                getLyric()
            },{ immediate:true, deep:true })

            // 获取audio元素
            let audio
            const getDom=()=>{
                const pageInstance=getCurrentInstance()
                audio=pageInstance.refs.audio
            }
            // 歌词滚动
            const lyricScroll=()=>{
                let timeNow=audio.currentTime
                // 将拿到的时间格式化，用于与时间数组中的数据进行比对
                const minutes=parseInt(timeNow/60)
                const seconds=parseInt(timeNow%60)
                const timeStr=(minutes<10?"0"+minutes:minutes)+":"+(seconds<10?"0"+seconds:seconds)
                // 在时间数组找到对应的索引
                const index=dataInfo.timeArr.findIndex(item=>item===timeStr)
                if(index!=-1){
                    // 歌词容器dom
                    let lyric=document.getElementById("lyric")
                    // 正要高光显示的歌词dom
                    let domNew=document.getElementsByClassName("lyric-item")[index]
                    // 歌词容器dom的高度
                    const lyricBoxHeight=document.getElementById("lyric").offsetHeight
                    // 正要高光显示的歌词dom的高度
                    const lyricItemHeight=domNew.offsetHeight
                    domNew.style.color="violet"
                    if(index!=0){
                        let domOld=document.getElementsByClassName("lyric-item")[index-1]
                        domOld.style.color="black"
                        lyric.scrollTop=index*lyricItemHeight-lyricBoxHeight*0.5
                    }
                    
                }
            }
            // 播放音乐
            const play=()=>{
                if(!store.state.isPlay){
                    store.commit('controlPlay',true)
                }
                audio.play()
                addAnimation()
            }
            // 暂停音乐
            const pause=()=>{
                store.commit('controlPlay',false)
                audio.pause()
                controlAnimation()
            }

            // 传给子组件的自定义事件，用于控制子组件的显示与否
            const controlPopUpLayerShow=()=>{
                dataInfo.isShow=!dataInfo.isShow
            }

            

            // 监听进度条滑块的变化
            const onChange=()=>{
                console.log(dataInfo.progress)
            }

            onMounted(()=>{
                getDom()
                // 监听audio资源是否加载完毕
                audio.addEventListener('canplay',()=>{
                    if(isPlay){
                        play()
                    }
                })
                // 监听音频的播放结束
                audio.addEventListener('ended',()=>{
                    pause()
                    console.log("播放结束")
                    // 音乐播放完自动切换到下一首
                    store.commit('analyzeNext')
                }, false)
                // 监听音频的播放时间变化
                audio.addEventListener('timeupdate',()=>{
                    if(audio.duration!=NaN||audio.duration!=Infinity){
                        dataInfo.progress=(audio.currentTime/audio.duration)*100
                    }
                    if(dataInfo.isShow){
                        lyricScroll()
                    }
                    // console.log(audio.currentTime)
                    // console.log(audio.duration)
                })
            })
            return{
                ...toRefs(dataInfo),
                store,
                isPlay,
                play,
                pause,
                controlPopUpLayerShow,
                onChange
            }
        }
    }
</script>

<style lang="less" scoped>
    #play-bar{
        z-index: 999;
        position: fixed;
        bottom: 1vw;
        left: 1vw;
        right: 1vw;
        height: 12vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        align-items: center;
        background-color: rgb(158,159,160);
        border-radius: 6vw;
        padding: 1vw;
        box-sizing: border-box;
        animation:moveUp 2s linear 1;
        #player{
            opacity: 0;
            position: fixed;
            bottom: -10vw;
        }
        .play-bar-left{
            height: 100%;
            display: flex;
            align-items: center;
            .play-img{
                height: 10vw;
                width: 10vw;
                border-radius: 5vw;
            }
            .song-detail{
                max-width: 70vw;
                overflow: hidden;
                #songNameAndSinger{
                    // 设置不允许文本换行
                    white-space:nowrap;
                }
            }
            @keyframes rotate {
                0%{

                }
                100%{
                    transform: rotate(360deg);
                }
            }
        }
        .play-bar-right{
            height: 100%;
            display: flex;
            align-items: center;
            padding-right: 1vw;
            letter-spacing:2vw;
            .iconfont{
                font-size: 6vw !important;
            }
        }
        #post{
            position: relative;
            display: flex;
            align-items: center;
            flex-direction: column;
            .post-title{
                // margin: auto;
            }
            #postImg{
                margin-top: 15vw;
                // margin: auto;
                width: 40vw;
                height: 40vw;
                border-radius: 50%;
            }
            #lyric{
                margin-top: 10vw;
                width: 100vw;
                height: calc(80vh - 80vw);
                // background-color: #fff;
                overflow-y: scroll;
                .lyric-item{
                    text-align: center;
                    font-size: 3vw;
                }
            }
            .post-progress{
                position: absolute;
                top: 85vh;
                // margin: auto;
                width: 80vw;
                // margin-left: 20vw;
            }
            .control-box{
                position: absolute;
                top: 90vh;
                width: 80vw;
                display: flex;
                justify-content: space-between;
                .iconfont{
                    font-size: 8vw !important;
                }
            }
        }
    }
    @keyframes moveUp{
        0%{
            bottom: 0;
            opacity: 0;
        }
        100%{
            bottom: 1vw;
            opacity: 1;
        }
    }
</style>