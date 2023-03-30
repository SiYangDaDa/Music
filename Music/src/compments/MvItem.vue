<template>
  <div id="mv-item">
    <img :src="props.url" alt="" class="item-img">
    <div class="item-content">
        <div class="content-item">{{ props.desc }}</div><br v-if="props.desc">
        <div class="content-item">{{ props.artistName }}</div><br>
        <div class="content-item">{{ props.name }}</div>
    </div>
    <div class="mvItem-icon">
        <div class="icon-box">
            <van-icon name="eye-o" />
            <span>{{ props.playCount }}</span>
        </div>
        <div class="icon-box">
            <van-icon name="good-job-o" />
            <span>{{ props.duration }}</span>
        </div>
    </div>
  </div>
</template>

<script setup>
    import { defineProps } from 'vue'
    const props=defineProps(["url","desc","artistName","name","playCount","duration"])

</script>

<style lang="less" scoped>
    #mv-item{
        display: flex;
        padding: 2vw;
        background-color: #fff;
        margin: 0 2vw 2vw 2vw;
        border-radius: 5vw;
        overflow: hidden;
        position: relative;
        .item-img{
            width: 60vw;
            border-radius: 5vw;
        }
        .item-content{
            padding-left: 2vw;
            font-size: @smallFont;
            .content-item{
                width: 30vw;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .mvItem-icon{
            position: absolute;
            bottom: 2vw;
            color: gray;
            left: 64vw;
            display: flex;
            .icon-box{
                width: 15vw;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: @smallText;
            }
        }
    }
</style>