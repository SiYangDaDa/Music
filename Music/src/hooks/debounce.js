import { reactive } from 'vue'

let data=reactive({
    timer:null
})
// 防抖函数
export const debounce=(t,fun)=>{
    clearTimeout(data.timer)
    data.timer=setTimeout(()=>{
        fun()
    },t)
}