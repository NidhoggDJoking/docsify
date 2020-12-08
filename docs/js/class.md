## ES6—Class基础语法:

<br>

>#### JavaScript 语言传统方法是通过构造函数定义并生成新对象。例：
```javascript
    function Add (a, b) {
        this.a = a;
        this.b = b;
    }

    Add.prototype.toString = function () {
        return this.a + this.b;
    }

    var add = new Add(5, 8)

```
<br>

>#### 而在ES6中，引入了Class这个概念来作为对象的模板。

?>  class只是一个语法糖写法，还是基于ES5封装而来的。用class来改写如下：

```javascript
// 定义类

    class Add {
        constructor (a, b) {
            this.a = a;
            this.b = b;
        }

        toString () {
            return this.a + this.b;
        }
    }
```

>#### 使用
```javascript
var add = new Add2(5, 8)

add.toString()

// 返回 13
```
```javascript
class Point {
    constructor() { }
}
Point.prototype.name = 'Joking';

let p1 = new Point();
console.log(p1.name);   //Joking

let p2 = new Point();
console.log(p2.name);   //Joking
```
>#### constructor方法

?> `constructor`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。一个类必须有`constructor`方法，如果没有显式定义，一个空的`constructor`方法会被默认添加。

!> `constructor`方法默认返回实例对象（即this）

```javascript
class Point {
	constructor() {
	        return new Date();
	        //return Object.create(null);
	    }
    }
	let p = new Point();   //返回为Date对象
	console.log(p); // Tue Dec 01 2020 17:30:00 GMT+0800 (中国标准时间)
```

### ES2019 : 私有类字段

<br>

>#### 类属性在默认情况下是公共的，可以被外部类检测或修改。在ES2019中，增加了定义私有类字段的能力，写法是使用一个#作为前缀。

```javascript
class ClassWithPrivateField {
  #privateField
}

class ClassWithPrivateMethod {
  #privateMethod() { 
    return 'hello world'
 }
}

class ClassWithPrivateStaticField {
  static #PRIVATE_STATIC_FIELD
}
```


<style>
@import url('static/css/code2.css');
</style>