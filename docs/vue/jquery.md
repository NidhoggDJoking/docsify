#### `Vue` 中使用 `JQuery`

<br>

> #### 安装 `JQuery`

```bash
cnpm install  jquery --save-dev
```

#### `Plan One` : 

```javascript
import Vue from 'vue'
import $ from 'jquery'  //全局引入
import App from './App.vue'
 
Vue.config.productionTip = false   
Vue.prototype.$ = $;   // 在vue原型上添加 $ 后可全局使用
new Vue({
  render: h => h(App),
}).$mount('#app')

```
```javascript
mounted() {
  console.log(this.$('#name'));	  
}
```
#### `Plan Two` : 

```javascript
<script>
import $ from 'jquery' //局部引用
export default {
    // $(".className").click()
}
</script>
```
<br>

#### そして私はこうして一人ぼつちづ