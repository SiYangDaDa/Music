<template>
  <div class="search-box">
    <div class="search-container">
        <van-icon class="search-icon" name="search" />
        <input class="search" v-model="info" type="search" placeholder="请输入搜索条件">
    </div>
  </div>
</template>

<script>
    import {watch,reactive,toRefs} from "vue"
    export default{
        props:["isClear"],
        emits:["onChange","clearEnd"],
        setup(props,context){
            const dataInfo=reactive({
                info:"",
                timer:null
            })
            // 防抖函数
            const debounce=()=>{
                clearTimeout(dataInfo.timer)
                dataInfo.timer=setTimeout(()=>{
                    context.emit("onChange",dataInfo.info)
                },500)
            }
            watch(()=>props.isClear,()=>{
                if(props.isClear){
                    dataInfo.info=""
                    context.emit("clearEnd")
                }
            },{deep:true})
            // 监听输入框值的变化
            watch(()=>dataInfo.info,()=>{
                debounce()
            },{deep:true})
            return{
                ...toRefs(dataInfo),
            }
        }
    }
</script>

<style lang="less" scoped>
    .search-box{
        margin-top: 12vw;
        background-color: #fff;
        text-align: center;
        padding: 2vw;
        .search-container{
            width: 90vw;
            background-color: #f4f4f4;
            margin: auto;
            border-radius: 5vw;
            display: flex;
            align-items: center;
            padding: 0 2vw;
            position: relative;
            .search{
                border: none;
                background: #f4f4f4;
                padding: 0;
                height: 10vw;
                width: 976vw;
                margin-left: 7vw;
            }
            .search-icon{
                font-size: 5vw;
                color: gray;
                position: absolute;
                left: 2vw;
            }
        }
    }
</style>