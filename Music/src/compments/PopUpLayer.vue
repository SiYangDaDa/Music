<!-- 这是一个遮罩层组件 -->
<template>
  <div id="popUpLayer" ref="popUpLayer">
    <van-icon class="back" name="arrow-left" @click="closePopUpLayer"/>
    <slot></slot>
  </div>
</template>

<script>
    export default{
        emits:["hiddenDom"],
        setup(props,context){
            const closePopUpLayer=()=>{
                context.emit("hiddenDom")
            }
            return{
                closePopUpLayer,
            }
        }
    }
</script>

<style lang="less" scoped>
    #popUpLayer{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 100vh;
        background-color: #fff;
        backdrop-filter: blur(5px);
        animation: ease-out 0.3s moveUp 1;
        .back{
            position: fixed !important;
            top: 2vw !important;
            left:2vw !important;
            color: #409EFF;
            font-size: 5vw;
            z-index: 10000;
        }
    }
    @keyframes moveUp{
        0%{
            top:100vh,
        }
        100%{
            top: 0;
        }
    }
</style>