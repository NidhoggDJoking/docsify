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