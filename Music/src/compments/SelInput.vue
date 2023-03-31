<template>
    <div class="input-box" :style="'width:'+width">
        <input ref="ipt" class="ipt" v-model="info" type="text">
        <div ref="inputTtext" class="input-text">
            {{ text }}
        </div>
        <span class="warn" v-if="showWarn">
            <van-icon name="warn-o" />
        </span>
        <span class="succeess" v-if="showRight">
            <van-icon name="success" />
        </span>
    </div>
</template>
<script>
    import { onMounted,getCurrentInstance,reactive,toRefs,watch } from 'vue'
    import { debounce } from "../hooks/debounce"

    export default{
        props:['re','isClear','text','width','useIcon'],
        emits:["getValue","clearEnd"],
        setup(props,context){
            const dataInfo=reactive({
                eleStatus:'blur',
                info:"",
                showWarn:false,
                showRight:false,
                width:props.width,
                text:props.text
            })
            let pageInstance
            // 通过正则判断手机号是否合法
            const checkTelNum=()=>{
                let reg=props.re
                if(!reg.test(dataInfo.info)){
                    dataInfo.showWarn=true
                    dataInfo.showRight=false
                    context.emit("getValue",dataInfo.info)
                }else{
                    dataInfo.showWarn=false
                    dataInfo.showRight=true
                }
            }
            // 监听输入框的变化
            watch(()=>dataInfo.info,()=>{
                if(dataInfo.info.length!=0){
                    debounce(500,checkTelNum)
                }else{
                    dataInfo.showWarn=false
                }
            },{deep:true})
            // 监听isClear的变化
            watch(()=>props.isClear,()=>{
                if(props.isClear){
                    dataInfo.info=""
                    context.emit("clearEnd")
                }
            })
            // 为元素添加过渡
            const addTransition=()=>{
                let distance
                if(dataInfo.eleStatus=='blur'){
                    distance="2vw"
                }else{
                    distance="8vw"
                }
                // let doms=document.getElementsByClassName('input-text')
                // const pageInstance=getCurrentInstance()
                const e=pageInstance.refs.inputText
                console.log(e)
                
                // dom.style.bottom=distance
            }
            onMounted(()=>{
                pageInstance=getCurrentInstance()
                const ele=pageInstance.refs.ipt
                console.log(ele)
                ele.addEventListener('focus',()=>{
                    console.log("focus")
                    dataInfo.eleStatus='focus'
                    addTransition()
                })
                ele.addEventListener('blur',()=>{
                    console.log("blur")
                    dataInfo.eleStatus='blur'
                    if(dataInfo.info.length==0){
                        addTransition()
                    }
                    
                })
            })
            return{
                ...toRefs(dataInfo)
            }
        }
    }

</script>
<style lang="less" scoped>
    .input-box{
        position: relative;
        padding-top: 8vw;
        border-bottom: 0.5vw solid gray;
        .ipt{
            border: none;
            height:8vw;
            color: gray;
        }
        .input-text{
            position: absolute;
            bottom: 2vw;
            font-size: @normalText;
            transition: all 0.5s ease-out;
            color: #67C23A;
        }
        .warn{
            position: absolute;
            bottom: 1vw;
            right: -8vw;
            color: #E6A23C;
        }
        .succeess{
            position: absolute;
            bottom: 2vw;
            right: -8vw;
            color: #67C23A;
        }
    }
</style>