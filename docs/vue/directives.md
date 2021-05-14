### 全局公用组件注册

```javascript
// @/components/index.js
import Vue from "vue";
import lumen from "./lumen.vue";

const Components = {
    lumen
};

Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name]);
});

export default Components;
```

```javascript
// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引用我们的自定义组件
import "@/components";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

```


### 全局公用方法注册

```javascript
import copy from './copy'

// 自定义指令
const directives = {
    copy,
}

export default {
    install(Vue) {
        Object.keys(directives).forEach((key) => {
            Vue.directive(key, directives[key])
        })
    },
}
```

###  .env.* 文件全局变量

`.env 文件`

```bash
# just a flag
NODE_ENV = 'production'

# base api
BASE_URL = '/prod-api'
```

`直接使用`

```js
const service = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 5000
})
```
### 打包内存溢出

```bush
npx --max_old_space_size=4096 vue-cli-service serve

setx NODE_OPTIONS --max_old_space_size=10240
```


#### [对应案例](https://gitee.com/NidhoggDJoking/jwebsite)