## 炒冷饭 与 未来新特性

---

- #### Dynamic Import
- #### Decorators 
- #### Private Fields
- #### Destructuring
- #### Spread Operator
- #### rest parameter
- #### Arrow Functions
......

---

## Dynamic Import

> 按需 import 提案几年前就已提出，如今终于能进入ES正式规范。这里个人理解成“按需”更为贴切。现代前端打包资源越来越大，打包成几M的JS资源已成常态，而往往前端应用初始化时根本不需要全量加载逻辑资源，为了首屏渲染速度更快，很多时候都是按需加载，比如懒加载图片等。而这些按需执行逻辑资源都体现在某一个事件回调中去加载。

```javascript
const oBtn = document.querySelector('#btn')
oBtn.addEventListener('click', () => {
    import('./ajax').then(mod => {
        // console.log(mod)
        mod.default('static/a.json', res => {
            console.log(res)
        })
    })
})

```

通过 Babel 成浏览器兼容的 JavaScript 代码

```javascript
const oBtn = document.querySelector('#btn');
oBtn.addEventListener('click', () => {
  Promise.resolve().then(() => babelHelpers.interopRequireWildcard(require('./ajax'))).then(mod => {
    // console.log(mod)
    mod.default('static/a.json', res => {
      console.log(res);
    });
  });
});
```

!> webpack目前已很好的支持了该特性


## Decorators

> Decorator 提案经过了大幅修改，目前还没有定案，不知道语法会不会再变。等待定案以后，需要完全重写。装饰器（Decorator）是一种与类（class）相关的语法，用来注释或修改类和类方法。许多面向对象的语言都有这项功能，目前有一个提案将其引入了 ECMAScript。装饰器是一种函数，写成@ + 函数名。它可以放在类和类方法的定义前面。

```javascript
{
  //定义一个修饰器
  let readonly = function(target,name,descriptor){
    descriptor.writable = false;
    return descriptor;
  };
  
  class Text{
  //修改行为
    @readonly
    time() {
        return '2017-03-11'
      }
  }

  let test = new Text();
  //无法重新设置属性
  test.time = function(){
    console.log('reset time'); //不生效
  }

  console.log(test.time()); //2017-03-11
}

```
!> 还只是提案未来不知道成啥样看看样子就好

## Destructuring`(解构赋值)`

> 这个没什么好说的一个例子就明白了

```javascript
// 数据对象person 
var person = {
    name: 'john',
    age: 22
}

// ES5的方式：
var name = person.name,
    age = person.age;
    
// ES6解构赋值方式
var {name, age} = person;

// 格式二
var name, age;
({name, age} = person);
```

## Arrow Functions`(箭头函数)`

```javascript
var add = (a, b) => a + b
add(3, 8) // 11
```

!> 箭头函数改变了方法里的this指向问题:`谁调用箭头函数this就指向谁`

```javascript
setTimeout(() => {
    this.fun()
}, 1000)

var _this = this;
setTimeout(function(){
    _this.fun()
}, 1000)
```

---

#### 这篇调研报告很不错！ 👇

#### [2020 年 JavaScript 状态调研报告小结](https://segmentfault.com/a/1190000039007864)

---

## ??`零合并操作符`

> 零合并操作符 ?? 是一个逻辑操作符，当左侧的操作数为 null 或者 undefined 时，返回右侧操作数，否则返回左侧操作数。

```javascript
undefined || 'default' // 'default'
null || 'default'      // 'default'
false || 'default'     // 'default'
0 || 'default'         // 'default'

undefined ?? 'default' // 'default'
null ?? 'default'      // 'default'
false ?? 'default'     // 'false'
0 ?? 'default'         // 0

// Eg:
undefined ?? 'default'
// babel7
undefined !== null && undefined !== void 0 ? undefined : 'default';
```

可以运用赋值运算符的简写 ??=

```javascript
let a = {b: null, c: 10}
a.b ??= 20
a.c ??= 20
console.log(a)     // 输出 { b: 20, c: 10 }
```

babel7 编译
```javascript
"use strict";

var _a$b, _a$c;

let a = {
  b: null,
  c: 10
};
(_a$b = a.b) !== null && _a$b !== void 0 ? _a$b : a.b = 20;
(_a$c = a.c) !== null && _a$c !== void 0 ? _a$c : a.c = 20;
console.log(a);
```

---


## ?.`可选链操作符` 

> 可选链操作符 ?. 允许读取位于连接对象链深处的属性的值，而不必验证链中的每个引用是否有效。?. 操作符的功能类似于 . 链式操作符，不同之处在于，在引用为 null 或者 undefined 的情况下不会引起错误，该表达式短路返回值是 undefined。

```javascript
const obj = {
  a: 'foo',
  b: {
    c: 'bar'
  }
}

console.log(obj.b?.c)      // 输出 bar
console.log(obj.d?.c)      // 输出 undefined
console.log(obj.func?.())  // 不报错，输出 undefined
```

bable7:

```javascript
"use strict";

var _obj$b, _obj$d, _obj$func;

const obj = {
  a: 'foo',
  b: {
    c: 'bar'
  }
};
console.log((_obj$b = obj.b) === null || _obj$b === void 0 ? void 0 : _obj$b.c);

console.log((_obj$d = obj.d) === null || _obj$d === void 0 ? void 0 : _obj$d.c);

console.log((_obj$func = obj.func) === null || _obj$func === void 0 ? void 0 : _obj$func.call(obj));
```

### #`私有方法/属性`

> 在一个类里面可以给属性前面增加 # 私有标记的方式来标记为私有，除了属性可以被标记为私有外，getter/setter 也可以标记为私有，方法也可以标为私有。

```javascript
class Person {
  getDesc(){ 
    return this.#name +' '+ this.#getAge()
  }
  
  #getAge(){ return this.#age } // 私有方法

  get #name(){ return 'foo' } // 私有访问器
  #age = 23                   // 私有属性
}
const a = new Person()
console.log(a.age)       // undefined 直接访问不到
console.log(a.getDesc()) // foo 23

```

### `babel7 转换`

```javascript
"use strict";

function _classPrivateMethodGet(receiver, privateSet, fn) { 
  if (!privateSet.has(receiver)) { 
    throw new TypeError("attempted to get private field on non-instance"); 
  } 
  return fn; 
}

function _classPrivateFieldGet(receiver, privateMap) { 
  var descriptor = privateMap.get(receiver); 
  if (!descriptor) { 
    throw new TypeError("attempted to get private field on non-instance"); 
  } 
  if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _getAge = new WeakSet();

var _name = new WeakMap();

var _age = new WeakMap();

class Person {
  constructor() {
    _name.set(this, {
      get: _get_name,
      set: void 0
    });

    _getAge.add(this);

    _age.set(this, {
      writable: true,
      value: 23
    });
  }

  getDesc() {
    return _classPrivateFieldGet(this, _name) + ' ' + _classPrivateMethodGet(this, _getAge, _getAge2).call(this);
  } // 私有属性


}

var _getAge2 = function _getAge2() {
  return _classPrivateFieldGet(this, _age);
};

var _get_name = function () {
  return 'foo';
};

const a = new Person();
console.log(a.age); // undefined 直接访问不到

console.log(a.getDesc()); // foo 23
```

---

### bfcache往返缓存:

> 将页面Dom结构和JavaScript的状态都保存在缓存里，如果页面位于bfcache中，那么再次打开该页面就不会触发load事件，消耗一定的内存可以更好的提高性能。

---

### WindowOrWorkerGlobalScope.caches 🧪

#### `下面的例子展示了你在service worker上下文中如何应该运用cache对离线资产的进行存储。`

```javascript
this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/sw-test/',
        '/sw-test/index.html',
        '/sw-test/style.css',
        '/sw-test/app.js',
        '/sw-test/image-list.js',
        '/sw-test/star-wars-logo.jpg',
        '/sw-test/gallery/',
        '/sw-test/gallery/bountyHunters.jpg',
        '/sw-test/gallery/myLittleVader.jpg',
        '/sw-test/gallery/snowTroopers.jpg'
      ]);
    })
  );
});
```

> 若干新的特性不断出现越发的像前端框架的模式靠近，出现了越来越多类似生命周期的监听方法以及缓存机制

<style>
@import url('static/css/vueCode.css');
</style>