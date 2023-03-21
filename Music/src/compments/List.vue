<script setup>
    import { defineProps } from 'vue'
    const props=defineProps(['songName','imgUrl','songId',"singer"])
</script>

<template>
  <div class="list">
    <img class="song-img" :src="props.imgUrl" alt="">
    <div class="song-detail">
        <div class="song-name">{{ songName }}</div>
        <div class="singer-name">{{ singer }}</div>
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
        background-color: #fff;
        // border-bottom: 0.133vw solid rgb(228, 226, 226);
        margin-bottom: 1vw;
        border-radius: 0.667vw;
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
        }
    }
</style>