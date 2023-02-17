# TypeScript

### 安装

`npm install -g typescript`

---

> #### TypeScript 变量声明

```javascript
const hello : string = "Hello World!"
console.log(hello)
```

> #### TypeScript 面向对象编程实例：

```javascript
class Site { 
   name():void { 
      console.log("Joking") 
   } 
} 
var obj = new Site(); 
obj.name();
```

> #### TypeScript 函数返回值

```javascript
// 函数定义
function greet():string { // 返回一个字符串
    return "Hello World" 
} 
 
function caller() { 
    var msg = greet() // 调用 greet() 函数 
    console.log(msg) 
} 
```

> #### TypeScript 联合类型

```javascript
var val:string|number 
val = 12 
console.log("数字为 "+ val) 
val = "Joking" 
console.log("字符串为 " + val)
```

> #### TypeScript 接口

```javascript
interface IPerson { 
    firstName:string, 
    lastName:string, 
    sayHi: ()=>string 
} 
 
var customer:IPerson = { 
    firstName:"Joking",
    lastName:"Nidhogg", 
    sayHi: ():string =>{return "Hi there"} 
} 
 
console.log("Customer 对象 ") 
console.log(customer.firstName) 
console.log(customer.lastName) 
console.log(customer.sayHi())  
 
var employee:IPerson = { 
    firstName:"Joker",
    lastName:"Nidhogg", 
    sayHi: ():string =>{return "Hello!!!"} 
} 
 
console.log("Employee  对象 ") 
console.log(employee.firstName) 
console.log(employee.lastName)
```

!> 需要注意接口不能转换为 JavaScript。 它只是 TypeScript 的一部分。

<br>

#### [TypeScript传送门](https://www.runoob.com/typescript/ts-tutorial.html)

<style>
@import url('static/css/vueCode.css');
</style>

---

Partial<T> 可以快速把某个接口类型中定义的属性变成可选的(Optional)：

```javascript
interface People {
  age: number;
  name: string;
}

const Jerry:People = {
    age: 10,
    name: 'Jerry'
};

const Tom: People = {
    name: 'Tom'
}

```
!> 上述代码会发生编译时错误：Property 'age' is missing in type '{ name: string; }' but required in type 'People'.


可以使用Partial 解决

```javascript
interface People {
  age: number;
  name: string;
}

const Jerry:People = {
    age: 10,
    name: 'Jerry'
};

type AnonymousPeople = Partial<People>;

const tom:AnonymousPeople = {
    name: 'Tom'
};
```

### Record

在 TS 中，类似数组、字符串、数组、接口这些常见的类型都非常常见，但是如果要定义一个对象的 key 和 value 类型该怎么做呢？这时候就需要用到 TS 的 Record 了。

```javascript
interface PageInfo {
  title: string;
}

type Page = "home" | "about" | "contact";

const nav: Record<Page, PageInfo> = {
  about: { title: "about" },
  contact: { title: "contact" },
  home: { title: "home" },
};
```

