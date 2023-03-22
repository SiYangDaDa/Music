<script setup>
    import { defineProps } from 'vue'
    // const props=defineProps(['songName','imgUrl','songId',"singer"])
    const props=defineProps({
        songName:{
            type:String,
            default:"歌名"
        },
        imgUrl:{
            type:String,
            default:"../../public/img/lazy.png",
        },
        singer:{
            type:String,
            default:"歌手"
        },
        songId:{
            type:Number
        }
    })
</script>

<template>
  <div class="list">
    <div class="list-left">
        <img class="song-img" :src="props.imgUrl" alt="">
        <div class="song-detail">
            <div class="song-name">{{ songName }}</div>
            <div class="singer-name">{{ singer }}</div>
        </div>
    </div>
    <div class="list-right">
        <i class="iconfont icon-xiazai2"></i>
        <i class="iconfont icon-xihuan-xianxing"></i>
    </div>
  </div>
</template>

<style lang="less" scoped>
    .list{
        box-sizing: border-box;
        padding: 1vw;
        margin: 0 1vw;
        height: 15vw;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        margin-bottom: 1vw;
        border-radius: 0.667vw;
        .list-left{
            display: flex;
            .song-img{
                height: 100%;
            }
            .song-detail{
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-left: 2vw;
                .singer-name{
                    color: gray;
                }
                .song-name,.singer-name{
                    width: 50vw;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap
                }
            }
        }
        .list-right{
            box-sizing: border-box;
            height: 100%;
            display: flex;
            align-items: center;
            .iconfont{
                margin-right: 2vw !important;
            }
        }
    }
</style>