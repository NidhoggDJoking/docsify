### 深浅拷贝:

> #### 数据分为基本数据类型和对象数据类型,深浅拷贝是针对于对象数据类型的
> #### 对象数据类型(也称为引用数据类型) `Array`,`Object`,`Function`

`栈内存:`

| name | val |
| :--------: | :--------:|
| 栈 A | `堆A地址` |
| 栈 B | `'abcdef'` |

`堆内存:`

| name | val |
| :--------: | :--------:|
| 堆 A  | `[0,1,2,3,4]` |

```javascript
let 栈A =  [0,1,2,3,4];
let 栈B = 'abcdef';

let 栈C = 栈A; // 栈A获取的并不是堆A的值而是堆A的地址
栈C[0] = 10; // 修改的值也是在堆A处直接改变的

// 栈A = 栈C = [10,1,2,3,4]

```


#### 深拷贝：

#### `通过JSON对象实现`

```javascript
var  clone = JSON.parse(JSON.stringify(obj));  // 缺点：丢失constructor，RegExp无法实现

// 有 RegExp 情况
const obj={
    date: new RegExp('/[0-9]{1,2}/'),
    name:'111'
}
console.log(obj.date)
console.log(JSON.parse(JSON.stringify(obj)).date)
///\/[0-9]{1,2}\//
//{}

// 如果json里有对象是由构造函数生成的，则会丢掉对象的constructon
function Person(name){
    this.name=name
}
let li=new Person('lili')
const obj={
    name:li
}
console.log(obj.name.__proto__.constructor)
console.log(JSON.parse(JSON.stringify(obj)).name.__proto__.constructor)
//[Function: Person]
//[Function: Object]

// 如果对象中有函数或者undefined，则会直接被丢掉
const obj={
    date:function(){
        console.log(1)
    },
    name:undefined,
}
console.log(obj)
console.log(JSON.parse(JSON.stringify(obj)))
//{ date: [Function: date], name: undefined }
//{}

// 如果对象中存在NAN，则序列化后会变成null
let obj={
    age:NaN
}
console.log(obj)
console.log(JSON.parse(JSON.stringify(obj)))
// { age: NaN }
// { age: null }

// 如果对象中存在循环引用的情况也无法正确实现深拷贝
let obj={
    age:18
}
obj.obj=obj;
console.log(obj)
console.log(JSON.parse(JSON.stringify(obj)))
// { age: 18, obj: [Circular] }
// VM2628:6 Uncaught TypeError: Converting circular structure to JSON
//     at JSON.stringify (<anonymous>)
//     at <anonymous>:6:29
```

#### `封装方法`

```javascript
/* sourceObj 表示源对象
 * 执行完函数，返回目标对象
*/
  function deepClone (sourceObj = {}) {
    let targetObj = Array.isArray(sourceObj) ? [] : {};
    let copy;
    for (var key in sourceObj) {
        copy = sourceObj[key];
        if (typeof(copy) === 'object') {
            if (copy instanceof Object) {
                targetObj[key] = deepClone(copy);
            } else {
                targetObj[key] = copy;
            } 
        } else if (typeof(copy) === 'function') {
            targetObj[key] = eval(copy.toString());
        } else {
            targetObj[key] = copy;
        }
    }
    return targetObj;
}
```

```javascript
// 定义 sourceObj
let sourceObj = {
    number: 1,
    string: 'source1',
    boolean: true,
    null: null,
    undefined: undefined,
    arr: [{name: 'arr1'}],
    func: () => 'sourceFunc1',
    obj: {
        string: 'obj1',
        func: () => 'objFunc1'
    }
}

// 拷贝sourceObj
let copyObj = deepClone(sourceObj);

// 修改 source
copyObj.number = 2;
copyObj.string = 'source2';
copyObj.boolean = false;
copyObj.arr[0].name = 'arr2';
copyObj.func = () => 'sourceFunc2';
copyObj.obj.string = 'obj2';
copyObj.obj.func = () => 'objFunc2';

// 执行
console.log(sourceObj);
/* {
    number: 1,
    string: 'source1',
    boolean: true,
    null: null,
    undefined: undefined,
    arr: [{name: 'arr1'}],
    func: () => 'sourceFunc1',
    obj: {
        func: () => 'objFunc1',
        string: 'obj1'
    }
}
*/
console.log(copyObj);
/* {
    number: 2,
    string: 'source2',
    boolean: false,
    null: null,
    undefined: undefined,
    arr: [{name: 'arr2'}],
    func: () => 'sourceFunc2',
    obj: {
        func: () => 'objFunc2',
        string: 'obj2'
    }
}
*/
```

#### `Object.assign()` . `Object.create()`

!> `Object.assign()`、`Object.create()` 都是一层（根级）深拷贝，之下的级别为浅拷贝。

若拷贝对象只有一层，可以通过对象的解构来实现深拷贝；

```javascript
let sourceObj = {
    str: 'hh1',
    number: 10
}
let targetObj = Object.assign({}, sourceObj)
targetObj.str = 'hh2'
console.log(sourceObj);
// {str: 'hh1', number: 10}
```
若拷贝对象有多层，通过对象的解构实现的是对象的浅拷贝。

```javascript
let sourceObj = {
    str: 'hh',
    number: 10,
    obj: {
        str: 'kk1'
    }
}
let targetObj = Object.assign({}, sourceObj)
targetObj.obj.str = 'kk2'
console.log(sourceObj);
// {
//     str: 'hh',
//     number: 10,
//     obj: {
//         str: 'kk2'
//     }
// }
```


<style>
@import url('static/css/vueCode.css');
</style>