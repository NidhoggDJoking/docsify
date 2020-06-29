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