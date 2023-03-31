<template>
    <NavBar :title="'我的'"></NavBar>
    <div id="my-content">
        <div class="photo-box">
            <img class="photo" src="../../public/img/lazy.png">
        </div>
        <van-cell-group inset>
            <van-field
                disabled
                v-model="id"
                label="ID"
                placeholder="未登录"
            />
            <van-field
            disabled
                v-model="nickName"
                label="昵称"
                format-trigger="onBlur"
                placeholder="未登录"
            />
            <van-button type="primary" block @click="skipToLoginAndRegist">前往登录</van-button>
        </van-cell-group>
    </div>
</template>

<script>
    import NavBar from '../compments/NavBar.vue'
    import { reactive,toRefs } from 'vue'
    import { useRouter } from 'vue-router'
    export default{
        components:{
            NavBar
        },
        setup() {
            const dataInfo=reactive({
                id:"",
                nickName:""
            })
            const router=useRouter()
            // 跳转到登录注册页
            const skipToLoginAndRegist=()=>{
                router.push({path:"/loginAndRegist"})
            }
            return{
                ...toRefs(dataInfo),
                skipToLoginAndRegist
            }
        }
    }
</script>

<style lang="less" scoped>
    #my-content{
        box-sizing: border-box;
        padding-top: 14vw;
        .photo-box{
            text-align: center;
            .photo{
                width: 30vw;
                height: 30vw;
                border-radius: 50%;
            }
        }
    }

</style>
