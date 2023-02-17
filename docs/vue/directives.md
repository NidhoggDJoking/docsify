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


> ### vue hook

```javascript
mounted() {
  // 创建一个定时器
    this.timer = setInterval(() => {
      // ......
    }, 500);
  },
  // 销毁这个定时器。
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
```

?> 在 Vue 组件中，可以用过$on,$once 去监听所有的生命周期钩子函数，如监听组件的 updated 钩子函数可以写成 `this.$on('hook:updated', () => {})`

```javascript
mounted() {
    let timer = setInterval(() => {
      // ......
    }, 500);
    this.$once("hook:beforeDestroy", function() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    });
  }
```

```
<!--通过@hook:updated监听组件的updated生命钩子函数-->
<!--组件的所有生命周期钩子都可以通过@hook:钩子函数名 来监听触发-->
<custom-select @hook:updated="doSomething" />
```

> ### 动态指令参数

```javascript
<a v-on:[eventName]="doSomething"></a>

export default {
  data () {
    return { eventName: "focus" }
  }
}

```

```javascript
<template>
  <div>
    <aButton @[someEvent]="handleSomeEvent()" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      someEvent: someCondition ? "click" : "dbclick"
    }
  },
  methods: {
    handleSomeEvent () {
      // handle some event
    }
  }
}
</script>
```

> ### 权限控制

```javascript
// array.js
export function checkArray(key) {
  let arr = ['admin', 'editor']
  let index = arr.indexOf(key)
  if (index > -1) {
    return true // 有权限
  } else {
    return false // 无权限
  }
}
```

```javascript
// main.js
import { checkArray } from './common/array'
Vue.config.productionTip = false
Vue.directive('permission', {
  inserted(el, binding) {
    let permission = binding.value // 获取到 v-permission的值
    if (permission) {
      let hasPermission = checkArray(permission)
      if (!hasPermission) {
        // 没有权限 移除Dom元素
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  },
})
```

```html
<div class="btns">
  <button v-permission="'admin'">权限按钮1</button> // 会显示
  <button v-permission="'visitor'">权限按钮2</button> //无显示
  <button v-permission="'editor'">权限按钮3</button> // 会显示
</div>

// 权限判断 可配合 Vue状态管理，状态失效则重新获取
```




<style>
@import url('static/css/vueCode.css');
</style>