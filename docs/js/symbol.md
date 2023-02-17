## ES6 Symbol

<br>

>#### ES6 引入了一种新的原始数据类型 Symbol ，表示独一无二的值，最大的用法是用来定义对象的唯一属性名。


?> 可以避免实例自定义的属性或方法覆盖原型上的属性或方法

```javascript
function Foo(name) {
    this.name = name
}
Foo.prototype.say = function() { 
    return this.name 
}
var f = new Foo('f')
var say = Symbol('say')
f[say] = function() {
    return 'other name'
}
f.say() // 'f'
f[say]() // 'other name'

```

#### 使用场景

>#### 由于每一个 Symbol 的值都是不相等的，所以 Symbol 作为对象的属性名，可以保证属性不重名。

```javascript
let sy = Symbol("key1");
 
// 写法1
let syObject = {};
syObject[sy] = "kk";
console.log(syObject);    // {Symbol(key1): "kk"}
 
// 写法2
let syObject = {
  [sy]: "kk"
};
console.log(syObject);    // {Symbol(key1): "kk"}
 
// 写法3
let syObject = {};
Object.defineProperty(syObject, sy, {value: "kk"});
console.log(syObject);   // {Symbol(key1): "kk"}
```

<br>

##### [菜鸟传送门](https://www.runoob.com/w3cnote/es6-symbol.html)