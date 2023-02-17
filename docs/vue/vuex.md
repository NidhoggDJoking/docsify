# Vuex3.x

<hr>

#### Vue 组件中获得 Vuex 属性：

> #### 当 store.state.count 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM

```javascript
computed: {
        count: function(){
            return this.$store.state.count
        }
},
```

### 基础 :

```javascript
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

`Action 通过 store.dispatch 方法触发：`

```javascript
store.dispatch('increment')   

this.$store.dispatch('increment')
```

### Vuex 辅助函数们：

#### `mapState`

?> 当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 `mapState` 辅助函数帮助我们生成计算属性，让你少按几次键

```javascript
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```

?> 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。

```javascript
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```
#### 对象展开运算符

?> `mapState` 函数返回的是一个对象。我们如何将它与局部计算属性混合使用呢？通常，我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 `computed` 属性。但是自从有了对象展开运算符，我们可以极大地简化写法：

```javascript
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```

#### `mapGetters`

?> `mapGetters` 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：

```javascript
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```
如果你想将一个 getter 属性另取一个名字，使用对象形式：

```javascript
...mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```

### 模块化


`模块化结构`

```bash
├── index.js
├── getters.js
└── modules
    │── app.js
    │── user.js
    │── settings.js
    └── permission.js

```

```javascript
// import Vue from 'vue'
// import Vuex from 'vuex'
// import getters from './getters'
// import app from './modules/app'
// import settings from './modules/settings'
// import user from './modules/user'
// import permission from './modules/permission'

// Vue.use(Vuex)

// const store = new Vuex.Store({
//     modules: {
//         app,
//         settings,
//         user,
//         permission
//     },
//     getters
// })

// export default store

// =====上老======下新======

import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

const store = new Vuex.Store({
    modules,
    getters
})

export default store
```

!> React 社区在 HOOK API 出现后很快就使用 `useReducer`、`useContext` 代替了 `Redux` 进行状态管理一样。`Vue3` 说不定也会抛弃`Vuex`吧


#### [Vuex3.x 传送门](https://vuex.vuejs.org/zh/)

---

### [Vue-observable](https://cn.vuejs.org/v2/api/#Vue-observable)

<br>

当然模块化的状态管理在一些小型项目显然大材小用了 推荐使用 `Vue-observable` 我愿称它为` 小Vuex ` 。


如果是`this.$store.state`直接取值赋值不使用模块化不如使用下面的方法

```javascript
//store.js
import Vue from 'vue';
export let store = Vue.observable({count:0,name:'张三'});
export let mutations = {
    setCount(count){
        store.count = count;
    },
    changeName(name){
        store.name = name;
    }
}
```

```js
//Home.vue
<template>  
   <div class="container">  
      <button @click="setCount(count+1)">+1</button>
      <button @click="setCount(count-1)">-1</button>
      <div>store中count：{{count}}</div>
      <button @click="changeName(name1)">父页面修改name</button>
      <div>store中name：{{name}}</div>
  </div>  
</template>  
<script>  
  import {store,mutations} from '@/store'
  export default {  
    computed:{
        count(){
          return store.count
        },
        name(){
          return store.name
        }
    },
    methods:{
        setCount:mutations.setCount,
        changeName:mutations.changeName    
    }
  }  
</script>  
```

---


# Vuex4.x

> #### 到达4.0以上版本构建方法发生变化

```javascript
import { createStore } from 'vuex';

export default createStore({
  state: {
    stateDemo:'this is vuex'
  },
  mutations: {
    changeData(state, newData) {
      console.log('来前:',state.stateDemo)
      state.stateDemo = newData
      console.log('过后:',state.stateDemo)
    }
  },
  actions: {
  },
  modules: {
  },
});
```

> #### 4.0以上版本对Ts的支持

```javascript
// vuex-shim.d.ts
import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    count: number
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
```

> #### 在Vue3.x中的使用

```javascript
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()

    return {
      // 在 computed 函数中访问 state
      count: computed(() => store.state.count),

      // 在 computed 函数中访问 getter
      double: computed(() => store.getters.double)
    }
  }
}
```

?> 其余的变化不大，详情查看文档

#### [Vuex4.x 传送门](https://next.vuex.vuejs.org/)



!> 避免使用下面的这种获取方式，因为这样直接操作`浅拷贝`复制的变量会影响到其本身，且不被`Vue-devtool`工具触发监听出现BUG更难以排查

```javascript
let count = store.state.count
let double = store.getters.double
count++
double = double + 2
```

<style>
@import url('static/css/code2.css');
</style>