// 这是一个倒计时
import { reactive } from "vue"

const dataInfo=reactive({
    timer:null
})

export const countDown=(t,fun)=>{
    let num=t
    dataInfo.timer=setInterval(()=>{
        if(num>=0){
            fun(num)
            num--
        }else{
            clearInterval(dataInfo.timer)
        }
    },1000)
}