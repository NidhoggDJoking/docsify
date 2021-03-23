## Vue的双向数据绑定原理

?> 是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

```javascript
// <input type="text" id="inp" />
// <div id="box"></div>

let obj = {};
let oInp = document.getElementById('inp');
let oBox = document.getElementById('box');
Object.defineProperty(obj, 'name', {
    configurable: true,
    enumerable: true,
    get: function() {
        console.log(111)
        return val;
    },
    set: function(newVal) {
        oInp.value = newVal;
        oBox.innerHTML = newVal;
    }
});
oInp.addEventListener('input', function(e) {
    obj.name = e.target.value;
});
obj.name = 'PHP是世界上最好的语言!';

```

### 案例：

<br>

<input type="text" id="inp" />
<div id="box"></div>

<script>
let obj = {};
let oInp = document.getElementById('inp');
let oBox = document.getElementById('box');
Object.defineProperty(obj, 'name', {
    configurable: true,
    enumerable: true,
    get: function() {
        console.log(111)
        return val;
    },
    set: function(newVal) {
        oInp.value = newVal;
        oBox.innerHTML = newVal;
    }
});
oInp.addEventListener('input', function(e) {
    obj.name = e.target.value;
});
obj.name = 'PHP是世界上最好的语言!';
</script>

<br>

### Vue3的双向数据绑定原理

?> Vue3.0基于`Proxy`来做数据大劫持代理，可以原生支持到数组的响应式，不需要重写数组的原型，还可以直接支持新增和删除属性， 比Vue2.x的`Object.defineProperty`更加的清晰明了。

```javascript
let data = {
    name: "joking",
    age: 14,
    price: 600000000
};
let proxyData = new Proxy(data,{
    get(target,key){
        // 获取的时候拦截
        if(key == "price"){
            return target[key]*.9;
        }
        return target[key];
    },
    set(target,key,newVal){  
        // 设置的时候拦截
        target[key] = newVal;
    },
    has(target,key){ 
        //判断某个值存不存
        if(key == "desire"){
            return true;
        }
        return (key in target);
    }
});
console.log(proxyData); // Proxy {name: "joking", age: 14, price: 600000000}

console.log(proxyData.age); // 14

console.log(proxyData.price); // 540000000

proxyData.price = 520;

console.log(proxyData.price); // 468

console.log("desire" in proxyData); // true

```

<style>
@import url('static/css/vueCode.css');

#inp{
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    padding: 0 15px 0 20px;
    border: 1px solid #e3e3e3;
    color: #3e5063;
    outline: none;
    border-radius: 25px;
    margin-right: 10px;
    font-size: 14px;
    width: 250px;
    color: #5f5f5f;
}

#box{
    padding: 0 15px 0 20px;
    line-height: 50px;
    color: #5f5f5f;
}
</style>