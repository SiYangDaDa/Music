<template>
    <NavBar :title="showLogin ? '登录' : '注册'"></NavBar>
    <div id="login-box" v-if="showLogin">
        <van-cell-group inset>
            <van-field
                v-model="phone"
                label="手机号"
                placeholder="请输入手机号"
                :error-message="msg"
            />
            <van-field
                v-model="idCode"
                center
                clearable
                label="短信验证码"
                placeholder="请输入短信验证码"
            >
                <template #button>
                    <van-button size="small" type="primary" @click="getIdCode" v-if="num==''">发送验证码</van-button>
                    <van-button size="small" disabled type="primary" v-else>{{ num }}秒后重发</van-button>
                </template>
            </van-field>
            <van-button type="primary" block @click="testIdCode">提交</van-button>
        </van-cell-group>
    </div>
    <div id="regist-box" v-else>
        
    </div>
</template>
<script>
    import {countDown} from "../hooks/countDown"
    import {GetIdCodeApi,VerifyIdCode} from "../http/api"
    import { debounce } from "../hooks/debounce"
    import SelInput from "../compments/SelInput.vue"
    import NavBar from "../compments/NavBar.vue"
    import { useRoute,useRouter } from "vue-router"
    import { watch,reactive,toRefs } from "vue"
    export default{
        components:{
            NavBar,
            SelInput
        },
        setup() {
            const route=useRoute()
            const router=useRouter()
            const dataInfo=reactive({
                showLogin:true,
                idCode:"",
                phone:"",
                regPhone:"",
                reg:/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/,
                msg:"",
                time:null,
                num:""
            })
            const submit=()=>{
                console.log(dataInfo.phone)
            }
            // 获取倒计时秒数
            const getSeconds=(value)=>{
                dataInfo.num=value
            }
            // 通过正则判断手机号是否合法
            const checkTelNum=()=>{
                if(!dataInfo.reg.test(dataInfo.phone)){
                    dataInfo.msg="手机号格式错误"
                    dataInfo.regPhone=""
                }else{
                    dataInfo.msg=""
                    dataInfo.regPhone=dataInfo.phone
                }
            }
            // 监听输入框的变化
            watch(()=>dataInfo.phone,()=>{
                if(dataInfo.phone.length>0){
                    debounce(500,checkTelNum)
                }else{
                    dataInfo.msg=""
                }
            })
            // 监听num
            watch(()=>dataInfo.num,()=>{
                if(dataInfo.num==0){
                    dataInfo.num=""
                }
            })
            // 手机号获取验证码
            const getIdCode=async()=>{
                if(dataInfo.regPhone.length==0){
                    return
                }else{
                    const res=await GetIdCodeApi({phone:dataInfo.regPhone})
                    if(res.data.cod==200){
                        countDown(60,getSeconds)
                    }
                }
            }
            // 验证验证码
            const testIdCode=async()=>{
                if(dataInfo.idCode.length>0){
                    try {
                        const res=await VerifyIdCode({phone:dataInfo.regPhone,captcha:dataInfo.idCode})
                        console.log(res.data)
                    } catch (error) {
                        console.log(error)
                    }
                }
                return
            }
            // 再次跳转到该页面
            const skipToMvPlay=()=>{
                router.push({path:"/mvPlay"})
            }
            return{
                ...toRefs(dataInfo),
                getIdCode,
                submit,
                testIdCode
            }
        }
    }
</script>

<style lang="less" scoped>
    #login-box,#regist-box{
        box-sizing: border-box;
        padding-top: 14vw;
    }
</style>