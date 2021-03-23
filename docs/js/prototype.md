### 每当遇见并将头皮发麻 Js 原型链

---

> JavaScript 只有一种结构：对象。每个实例对象（ object ）都有一个私有属性（称之为 `__proto__` ）指向它的构造函数的原型对象（`prototype` ）。该原型对象也有一个自己的原型对象( `__proto__` ) ，层层向上直到一个对象的原型对象为 `null`。根据定义，`null` 没有原型，并作为这个原型链中的最后一个环节。

几乎所有 JavaScript 中的对象都是位于原型链顶端的 Object 的实例。

?>尽管这种原型继承通常被认为是 JavaScript 的弱点之一，但是原型继承模型本身实际上比经典模型更强大。例如，在原型模型的基础上构建经典模型相当简单。


```javascript
function Foo() {}

console.log(Foo.prototype)
console.log(Foo.prototype.contructor)
console.log(Foo.__proto__)
console.log(Foo.prototype.__proto__)
```

> 前言 `__proto__` 和 `constructor` 属性是 **对象** 所独有的， `prototype`属性是函数所独有的

-  `__proto__` 和 `constructor` 属性是 **对象** 所独有的
-  `prototype`属性是函数所独有的。但是由于**JS中函数也是一种对象**，所以函数也拥有`__proto__`和`constructor`属性
-  `constructor` 属性的含义就是指向该 **对象的构造函数**，所有函数（此时看成对象了）最终的构造函数都指向`Function`。
---

- ##### Js 中万物皆对象，每个对象都有一个隐式原型 `__proto__` ，指向创建它的构造函数的原型对象。

```javascript
var a = {}
 
console.log(a.__proto__=== Object.prototype); // true
```

- ##### 原型对象有一个属性`constructor`，它指向这个构造函数本身。

```javascript
var a = {}

console.log(a.__proto__ === a.constructor.prototype); // true
```

- ##### 函数（构造函数）除了有一个隐式原型对象，还有一个属性 `prototype` ，它指向一个对象，这个对象就是原型对象，也叫显式原型。


```javascript
var B = function(){}
var b = new B();
 
console.log(b.__proto__=== B.prototype); // true
```

- ##### 实例对象的`__proto__`属性等于其构造函数的`prototype`(显式原型)属性值

```javascript
function Foo() {}
// 每个函数都有一个prototype，即显式原型
console.log(Foo.prototype)
// 每个实例对象都有一个__proto__ 称之为隐式原型
var fn = new Foo();
console.log(fn.__proto__)
// 实例对象的__proto__属性是在创建对象时自动添加的,默认值为其构造函数的prototype(显式原型)属性值
console.log(Foo.prototype === fn.__proto__); // true
```

!> 原型链:访问一个对象的属性时,先在自身属性中查找,找到返回;如果没有,再沿着`__proto__`(隐式原型属性)这条链向上查找,找到返回;如果最终没有找到则返回`undefined`.因为原型链是沿着`__proto__`(隐式原型属性)查找,所以又叫隐式原型链.原型链的作用是查找对象属性(方法)的

- ##### `Object` 的原型对象是原型链的尽头

```javascript
console.log(Object.prototype.__proto__);//null
```

> ##### 运行一下

```javascript
function Person(){
	this.name;
}
Person.prototype.say=function(){
	console.log("hello");
}
 
var person=new Person();
 
console.log(Person.__proto__);
console.log(Function.prototype);
 
console.log(Person.prototype.__proto__);
console.log(Object.prototype);
 
console.log(person.__proto__);
console.log(Person.prototype);
 
console.log(Person.prototype.constructor);
console.log(Person);
```

<br/>

#### [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

#### [CSDN好文章](https://blog.csdn.net/cc18868876837/article/details/81211729)

<style>
@import url('static/css/VueCode.css');
.markdown-section strong{
    color:#e23030;
}
</style>