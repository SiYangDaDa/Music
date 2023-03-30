<template>
  <div id="nav-box">
    <div class="back-box" @click="onClickLeft">
        <van-icon name="arrow-left" />
        <span>返回</span>
    </div>
    <span class="title">{{ title }}</span>
  </div>
</template>

<script setup>
    import { defineProps } from 'vue';
    const props=defineProps(["title"])
    // 返回上一级
    const onClickLeft = () => history.back()
</script>

<style lang="less" scoped>
    #nav-box{
        height: 12vw;
        background-color: #fff;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 999;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        .back-box{
            position: absolute;
            left: 2vw;
            color: @titleSelectedColor;
            font-size: @normalText;
        }
        .title{
          font-size: @titleText;
          font-weight: bold;
        }
    }
</style>