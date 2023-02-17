## Axios 封装

<hr>

#### 设置公用请求文件`request.js`
```javascript
import axios from "axios";
import router from '@/router'
const service = axios.create({
    // 请求根路径
    baseURL: process.env.BASE_URL,
    // 过期时间
    timeout: 5000
})
service.interceptors.request.use(config => {
    // 添加Token
    const token = localStorage.getItem("Authorization");
    if (token) {
        config.headers['Authorization'] = token
        // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config;
})

service.interceptors.response.use(function(response) {
    // 成功请求到数据:对响应数据做点什么
    return response;
}, function(error) {
    if (error.response.status === 401) {
        error.resMsg = '用户未登录，请重新登录'
        router.push({
            path: '/login',
            query: { redirect: location.href }
        })
    } else {
        // 对响应错误做点什么
        error.resMsg = error.response.data.msg
    }

    return Promise.reject(error);
});
export default service;

```

```javascript
//  使用ES6语法更加简洁明了
service.interceptors.response.use(
    response => {  
        //成功请求到数据
    },
    error => {  
        //响应错误处理
        return Promise.reject(error)
    }
);
```
<br>

#### 使用 : 单独将请求放在`api.js`文件里

```javascript

//api.js 写法一:
import service from './request'
export const getPersonInfo = data => {
    return service({
        url: '/person_pay/getpersoninfo',
        method: 'post',
        data
    })
};

//api.js 写法二:
import request from './request'
export function getPersonInfo(data) {
    return request({
        url: '/person_pay/getpersoninfo',
        method: 'post',
        data
    })
}

// get 传参 使用js模板语法
url: `/person_pay/getpersoninfo?paramsId=${params.id}`,

```
<br>

#### 在`Vue`页面的使用:
```javascript
//index.vue
import {getPersonInfo} from '../axios/api.js'
export default {
    created: async function () {
        const params = {
            id: '1'
        };
        let res = await getPersonInfo(params);
        console.log(res);
    }
}

// *****更偏爱下面这种写法*****

//index.vue
import {getPersonInfo} from '../axios/api.js'
export default {
    mounted(){
        const params = {
            id: '1'
        };
        this.getDate(params);
    },
    methods: {
        getDate(params){
            getPersonInfo(params).then(res => {
                console.log(res);
            });
        }
    }
}
```

---

> #### 忆苦思甜 回顾 `AJAX`

```javascript
<script type="text/javascript">
var xmlhttp;
function loadXMLDoc(url){
    xmlhttp=null;
    if (window.XMLHttpRequest){// code for all new browsers
        xmlhttp=new XMLHttpRequest();
    }
    else if (window.ActiveXObject){// code for IE5 and IE6
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlhttp!=null){
        xmlhttp.onreadystatechange=state_Change;
        // 请求
        xmlhttp.open("GET",url,true);
        // 传参
        xmlhttp.send(null);
    }
    else{
        alert("Your browser does not support XMLHTTP.");
    }
}

function state_Change(){
if (xmlhttp.readyState==4){// 4 = "loaded"
    if(xmlhttp.status==200){// 200 = OK
    // ...our code here...
    }else{
        alert("Problem retrieving XML data");
    }
  }
}
</script>
```

<style>
@import url('static/css/code2.css');
</style>