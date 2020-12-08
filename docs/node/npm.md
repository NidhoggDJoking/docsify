# NPM 发布

<br>

> #### 基本命令

```bash
# 登录
npm login

# 最终步骤：再次构建与发布 😛
npm publish --access public

# 删除发布的包
npm unpublish joking-navigation --force

# 废除指定版本
npm deprecate <pkg>[@<version>] <message>

npm deprecate joking-navigation@0.1.0 '废除'

```

# `package.json`

```json
// 举个栗子 🗽
{
  "name": "joking-navigation",
  "version": "0.2.0",
  "private": false,
  "main": "./dist/joking-navigation.common.js",
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "package": "vue-cli-service build --target lib --name joking-navigation ./src/components/index.js"
  },
  "files": [
    "dist"
  ],
  ...
}
```

?> `version` &nbsp; : &nbsp; **版本号,每次迭代都需要变化增长**<br>
<br>`private` &nbsp;  :  &nbsp; 私有的状态为`false`不然无法上传<br>
<br>`scripts > package` &nbsp; : &nbsp;  组件进行针对NPM的打包<br>
<br>`main` &nbsp;  : &nbsp;  **指向打完包后的入口文件**<br>
<br>`files`  &nbsp; : &nbsp;  声明这个组件库项目需要包含的文件

<hr>

> #### 组件注册

`src/components目录下`

```javascript
import Vue from "vue";
// src/components目录下的一个组件
import lumen from "./lumen.vue";

const Components = {
    lumen
};

Object.keys(Components).forEach(name => {
    Vue.component(name, Components[name]);
});

export default Components;
```

> #### 引用

`main.js`

```javascript
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

#### [案例](https://gitee.com/NidhoggDJoking/navigation)

!> **一定要关闭NPM的二次验证** &nbsp;  `看到下面这个东西没,千万别打勾`

- [ ] Require Two Factor Authentication to publish or modify settings

<style>
@import url('static/css/code.css');
</style>