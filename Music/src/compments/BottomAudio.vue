<template>
  <div id="play-bar">
        <!-- <audio id="player" ref="audio" :src="store.state.songUrl" loop="false" controls poster="" name="未知音频" author="俩白" 
            binderror="" bindplay="" bindpause="" bindtimeupdate="" bindended="">
        </audio> -->
        <audio id="player" ref="audio" :src="store.state.songUrl" autoplay="autoplay" controls="controls"></audio>

        <!-- <van-progress class="progress" :percentage="50" stroke-width="3" pivot-color="#409EFF" track-color="gray"/> -->
        <div class="play-bar-left">
            <img class="play-img" :src="store.state.imgUrl" alt="">
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
    </div>
</template>

<script>
    import { ref,reactive,onMounted,watch,computed,getCurrentInstance  } from 'vue'
    import { useStore } from 'vuex'
    
    export default{
        
        setup(){
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

            watch(isPlay,()=>{
                if(!isPlay){
                    pause()
                }
            })

            // 获取audio元素
            let audio
            const getDom=()=>{
                const pageInstance=getCurrentInstance()
                audio=pageInstance.refs.audio
            }
            // 播放音乐
            const play=()=>{
                if(!store.state.isPlay){
                    store.commit('controlPlay',true)
                }
                audio.play()
                addAnimation()
                // controlAnimation()
            }
            // 暂停音乐
            const pause=()=>{
                store.commit('controlPlay',false)
                audio.pause()
                controlAnimation()
                // controlAnimation()
            }
            onMounted(()=>{
                
                // addAnimation()
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
                }, false);
            })
            return{
                // props,
                // 使用 mutation
                store,
                isPlay,
                play,
                pause
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