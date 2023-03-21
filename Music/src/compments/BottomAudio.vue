<template>
  <div id="play-bar">
        <audio id="player" src="" loop="false" controls poster="" name="未知音频" author="俩白" 
            binderror="" bindplay="" bindpause="" bindtimeupdate="" bindended="">
        </audio>
    </div>
</template>

<script>
    import { defineProps } from 'vue'
    
    export default{
        
        setup(){
            const props=defineProps(['url','name','imgUrl','id'])

            return{
                props,
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
        height: 12vw;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        
        #player{
            height: 8vw;
        }
    }
</style>