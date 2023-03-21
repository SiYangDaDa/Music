// 该文件主要用于封装axios请求
// import { getCookie } from './cookie.js'
import router from "../router/index"
import axios from 'axios'
const request =axios.create({
    timeout: 7000, // 请求超时时间
    baseURL:"http://localhost:3000",
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
})

// 拦截器---请求拦截
request.interceptors.request.use((config)=>{
    // 设置token start
    const token = sessionStorage.getItem("token");
    if (token) {
        config.headers.Authorization = "Bearer "+ token;
    }
    return config;s
},err=>{
    console.log(2)
    return Promise.reject(err)
})

// 拦截器---响应拦截
request.interceptors.response.use(res=>{
    return res
},error=>{
    console.log(error)
    if (error && error.response) {
        switch (error.response.status) {
          case 400:
            error.message = `错误请求`;
            break;
          case 401:
            error.message = `未授权，请重新登录`;
            router.push('/login')
            break;
          case 403:
            error.message = `拒绝访问`;
            break;
          case 404:
            error.message = `请求错误,未找到该资源`;
            break;
          case 405:
            error.message = `请求方法未允许`;
            break;
          case 408:
            error.message = `请求超时`;
            break;
          case 500:
            error.message = `服务器端出错`;
            break;
          case 501:
            error.message = `网络未实现`;
            break;
          case 502:
            error.message = `网络错误`;
            break;
          case 503:
            error.message = `服务不可用`;
            break;
          case 504:
            error.message = `网络超时`;
            break;
          case 505:
            error.message = `http版本不支持该请求`;
            break;
          default:
            error.message = `未知错误${error.response.status}`;
        }
      } else {
        error.message = "连接到服务器失败";
      }
      return Promise.reject(error);
    
})

export default request