# Vuex

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

<br>

#### [Vuex 传送门](https://vuex.vuejs.org/zh/)


<style>
@import url('static/css/code2.css');
</style>