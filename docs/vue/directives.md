## Vue2.x 相关

---

> ### 全局公用组件注册

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


> ### 全局公用方法注册

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

> ###  .env.* 文件全局变量

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
#### [以上代码对应案例](https://gitee.com/NidhoggDJoking/jwebsite)


> ### 打包内存溢出

```bush
npx --max_old_space_size=4096 vue-cli-service serve

setx NODE_OPTIONS --max_old_space_size=10240
```

> ### 组件延迟加载

```html
<template>
  <div>
    <h2>I'm an heavy page</h2>

    <template v-if="defer(2)">
      <Heavy v-for="n in 10" :key="n"/>
    </template>

    <Heavy v-if="defer(3)" class="super-heavy" :n="9999999"/>
  </div>
</template>

<script>
import Defer from '@/mixins/Defer'

export default {
  mixins: [
    Defer()
  ]
}
</script>
```

```js
export default function (count = 10) {
  return {
    data () {
      return {
        displayPriority: 0
      }
    },

    mounted () {
      this.runDisplayPriority()
    },

    methods: {
      runDisplayPriority () {
        const step = () => {
          requestAnimationFrame(() => {
            this.displayPriority++
            if (this.displayPriority < count) {
              step()
            }
          })
        }
        step()
      },

      defer (priority) {
        return this.displayPriority >= priority
      }
    }
  }
}
```

<style>
@import url('static/css/vueCode.css');
</style>