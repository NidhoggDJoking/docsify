#### `JavaScript` 中 `call()`、`apply()`、`bind()` 的用法。

?> `call()`、`apply()`、`bind()` 都是用来重定义 `this` 这个对象的！- 可以编写能够在不同对象上使用的方法

# `例1:`

```javascript
var name = 'Joking',age='1733';
var obj = {
    name:'joker',
    objAge:this.age,
    myFun:function(){
        console.log(this.name + '岁月' + this.age);
    }
}

obj.objAge;  // '1733'
obj.myFun()  // joker岁月undefined
// 拓展:
obj.myFun.call() // Joking岁月1733
obj.myFun.call(this) // Joking岁月1733
obj.myFun.call(null) // Joking岁月1733
```


# `例2:`

```javascript
var fav = '盲人';
function show(){
    console.log(this.fav);
}

show() // '盲人'
```

> ##### 比较一下这两者 `this` 的差别，第一个打印里面的 `this` 指向 obj，第二个全局声明的 `show()` 函数 `this` 是 `window`

# `例3:`

```javascript
var name = 'Joking',age='1733';
var obj = {
    name:'joker',
    objAge:this.age,
    myFun:function(){
        console.log(this.name + '岁月' + this.age);
    }
}

var data = {
    name:'joking',
    age:'1945',
}

obj.myFun.call(data) //joking岁月1945
obj.myFun.apply(data) //joking岁月1945
obj.myFun.bind(data)() //joking岁月1945
```

> ##### 以上出了 `bind` 方法后面多了个 （） 外 ，结果返回都一致！由此得出结论，`bind` 返回的是一个新的函数，你必须调用它才会被执行。

# `例4:`

> #### `call()` 和 `apply()` 之间的区别
>  
> - **`call()` 方法分别接受参数**
> - **`apply()` 方法接受数组形式的参数**
> - **&nbsp;如果要使用数组而不是参数列表，则 `apply()` 方法非常方便**
> 
```javascript
var name = 'Joking',age='1733';
var obj = {
    name:'joker',
    objAge:this.age,
    myFun:function(home,family){
        console.log(this.name + '岁月' + this.age,'身居' + home + '去往' + family);
    }
}

var data = {
    name:'joking',
    age:'1945',
}

obj.myFun.call(data,'日本','德国') // joking岁月1945 身居日本去往德国
obj.myFun.apply(data,['日本','德国']); // joking岁月1945 身居日本去往德国
obj.myFun.bind(data,'日本','德国')(); // joking岁月1945 身居日本去往德国
obj.myFun.bind(data,['日本','德国'])(); // joking岁月1945 身居日本,德国去往undefined
```

> ##### 从上面四个结果不难看出: `call` 、`bind` 、 `apply` 这三个函数的第一个参数都是 this 的指向对象，第二个参数差别就来了：
> 
> - **`call` 的参数是直接放进去的，第二第三第 n 个参数全都用逗号分隔，直接放到后面 `obj.myFun.call(data,'家', ... ,'string' )`。**
> - **`apply` 的所有参数都必须放在一个数组里面传进去 `obj.myFun.apply(db,['家', ..., 'string' ])`**
> - **`bind` 除了返回是函数以外，它 的参数和 `call` 一样。**






<!-- <style>
@import url('static/css/vueCode.css');
</style> -->