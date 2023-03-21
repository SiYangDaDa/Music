<script setup>
    import { defineProps } from 'vue'
    const props=defineProps(['width','name','url','id'])
</script>

<template>
    <div class="card" :style="'width:'+props.width+';height:'+props.width">
        <img class="cover" :src="props.url" alt="" srcset="">
        <van-text-ellipsis class="text" :content="props.name" />
    </div>
</template>

<style lang="less" scoped>
    .card{
            background-color: #fff;
            border-radius: 5%;
            margin-bottom: 2vw;
            overflow: hidden;
            position: relative;
            .cover{
                width: 100%;
                height: 100%;
            }
            .text{
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 2;
                background-color: rgba(255,255,255,0.5);
                --van-text-ellipsis-line-height:1.2;
            }
        }
</style>
