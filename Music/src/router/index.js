import { createRouter,createWebHistory } from "vue-router";


const routes=[
    // 配置默认路由
    {
        path:"/",
        redirect:'/home',
    },
    {
        name:'home',
        path:"/home",
        component:()=>import('../views/Home.vue'),
        meta:{isAuth:false},
        children:[
            {
                name:"music",
                path:"music",
                component:()=>import('../views/Music.vue')
            },
            {
                name:"mv",
                path:"mv",
                component:()=>import('../views/Mv.vue')
            },
        ]
    },
    {
        name:"musicList",
        path:"/musicList",
        component:()=>import("../views/MusicList.vue")
    },
    {
        name:'my',
        path:"/my",
        component:()=>import("../views/My.vue"),
        meta:{isAuth:false}
    }
]
const router=createRouter({
    history:createWebHistory(),
    routes
})

// 全局前置守卫，初始化的时候执行，每次路由切换前执行，对路由进行权限校验
router.beforeEach((to,from,next)=>{
    if(to.meta.isAuth){
        if(sessionStorage.getItem('token')){
            next()
        }else{
            router.push({name:"login"})
            // alert("暂无权限查看，请先登录！")
            MessageBox.confirm('未授权，请先登录！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
              }).then(() => {
                // 点击确定前往登录页面
                router.push('/login')
              }).catch(() => {
                router.push('/login')    
              })
        }
        next()
    }
    next()
})


export default router