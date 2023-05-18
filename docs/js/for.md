> ## 循环

---

- ## for

> ##### 遍历时间：`for循环遍历` < `for...of遍历` < `forEach遍历` < `for...in遍历` < `map遍历`

```javascript
for(let i=0; i<arr.length;i++){
    something...
}
// to
for(let i=0,len=arr.length;i<len;i++){
    something...
}
```

---

- ## find

>  `find()` 方法返回通过测试（函数内判断）的数组的第一个元素的值。

- 当数组中的元素在测试条件时返回 `true` 时, `find()` 返回符合条件的元素，之后的值不会再调用执行函数。
- 如果没有符合条件的元素返回 undefined
- `find()` 对于空数组，函数是不会执行的。
- `find()` 并没有改变数组的原始值(`find循环不会改变数组`)。

```js
[1, 2, 3, 4, 5].find((v) => (v === 5))
```

---

- ## forEach

>  `forEach()` 方法对数组的每个元素执行一次给定的函数。

!> `forEach`循环没有返回值；`map`，`filter`循环有返回值,`foreach`，`map`，`filter`循环中途是无法停止的，总是会将所有成员遍历完

```javascript
const array1 = ['a', 'b', 'c'];

array1.forEach(element => console.log(element));

// expected output: "a"
// expected output: "b"
// expected output: "c"

function log(element, index, array) {
     console.log('[' + index + '] = ' + element); 
} ；
 
[2, 5, 9].forEach(log); // [0] = 2 // [1] = 5 // [2] = 9
```

> `forEach()` 被调用时，`不会改变原数组`，也就是调用它的数组（尽管 callback 函数在被调用时可能会改变原数组）



---

- ## map

> `map()` 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。

```javascript
arr.map(item=>{ })
```

!> `map()`和`filter()`循环都会跳过空位，`for`和`while`不会

```javascript
var f = function (n) { 
    return 'a' 
}; 
 
[1, undefined, 2].map(f) // ["a", "a", "a"] 
[1, null, 2].map(f) // ["a", "a", "a"]
[1, , 2].map(f) // ["a", , "a"]
 
```

> `map` `不修改调用它的原数组本身`（当然可以在 callback 执行时改变原数组）

```js
var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt);
// roots的值为[1, 2, 3], numbers的值仍为[1, 4, 9]
```

---

- ## filter

> `filter()` 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素

```javascript
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
```

---

- ## for in

```javascript
var obj = {a: 1, b: 2, c: 3}; 
 
for (var i in obj) { 
    console.log('键名：', i); 
    console.log('键值：', obj[i]); 
} 
// 键名： a // 键值： 1 // 键名： b // 键值： 2
 
// 其中 obj为循环的对象， i 为对象中的“键名”。如果对象是数组，那么i就是坐标。
```

---

- ## for of

!> `for of`用来迭代对象的属性或数组的每个元素，它需要穷举对象的所有属性遍历数组性能远不如 `for`

```javascript
var arr = ['a', 'b', 'c', 'd'];

    for (let a in arr) {
        console.log(a); // 0 1 2 3
    }
        
    for (let a of arr) {
        console.log(a); // a b c d
    }

```

---

- ## sort

```javascript
const strings = ['top', 'jug', 'mid', 'adc', 'sup'];  
  
strings.sort(function(a, b) {  
  return a.localeCompare(b, 'zh');  
});  
  
console.log(strings);
// ['adc', 'jug', 'mid', 'sup', 'top']
```
- ## while 

```javascript
var i = 0; 
while (i < 100) { 
    console.log('i 当前为：' + i);
    i = i + 1; 
}
```

- `Object`：全为真。
- `Number`：0为假，一切非0数字为真；
- `String`：空字符串为假，所有非空字符串为真；
- `Boolean`：true为真，false为假；
- `null/Undefined/NaN`:全为假；

---

- ## do while 

> `do...while` 循环与 `while`循环类似，唯一的区别就是先运行一次循环体，然后判断循环条件。

```javascript
var x = 3;
var i = 0; 
 
do { 
    console.log(i); i++; 
} while(i < x);
```

- ## some

> `some()` 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。


!> 注意：如果用一个空数组进行测试，在任何情况下它返回的都是`false`。

```javascript
const array = [1, 2, 3, 4, 5];

// checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(array.some(even));
// expected output: true
```

> `some()`只要有一个是`true`，便返回`true`；而`every()`只要有一个是`false`，便返回`false`.

---

- ## every

> `every()` 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

!> 注意：若收到一个空数组，此方法在一切情况下都会返回 `true`。

```javascript
const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
// expected output: true

```

---

- ## reduce

> `reduce()` 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。

```javascript
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
```

> #### reducer 函数接收4个参数:

-  `Accumulator` `(acc)` ( 累计器 )
-  `Current Value` `(cur)` ( 当前值 )
-  `Current Index` `(idx)` ( 当前索引 )
-  `Source Array` `(src)` ( 源数组 )

---

- ## reduceRight

> `reduceRight()` 方法接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。

```javascript
const array1 = [[0, 1], [2, 3], [4, 5]].reduceRight(
  (accumulator, currentValue) => accumulator.concat(currentValue)
);

console.log(array1);
// expected output: Array [4, 5, 2, 3, 0, 1]
```

- ### 循环控制语句

>  `break`： 跳出本层循环，继续执行循环后面的语句。如果循环有多层，则break只能跳出一层。

> `continue：`跳过本次循环剩余的代码，继续执行下一次循环。①对与for循环，continue之后执行的语句，是循环变量更新语句i++；②对于while、do-while循环，continue之后执行的语句，是循环条件判断；因此，使用这两个循环时，必须将continue放到i++之后使用，否则continue



```javascript
for(var i=0;i<10;i++){
        if(i == 5){
            break;
        }
        console.log(i); //0,1,2,3,4
    }

    for(var i=0;i<10;i++){
        if(i == 5){
            continue;
        }
        console.log(i); //0,1,2,3,4,6,7,8,9
    }
```

---

- ### 手写 filte

```javascript
let arr = [1, 2, 4, 5, 6, 9, 10]

Array.prototype.myFilter = function(fn, thisArgs) {
    if (Object.prototype.toString.call(fn) !== '[object Function]') {
        throw ('Error in params');
    }
    let curArr = this;
    let result = [];
    for (let i = 0; i < curArr.length; i++) {
        if (fn.call(thisArgs, curArr[i], i, curArr)) {
            result.push(curArr[i])
        }
    }
    return result;
}

let res = arr.myFilter((item, index, data) => {
    return item > 3
})

console.log(res)
```

- ### 手写 map

```javascript
Array.prototype.myMap = function(callback, thisArgs) {
    if (this == undefined) {
        throw new TypeError('this is null or not defined')
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is null or not defined')
    }
    const res = []

    const O = Object(this)
    const len = O.lenght >>> 0
    for (let i = 0; i < len; i++) {
        if (i in O) {
            res[i] = callback.call(thisArgs, O[i], i, this)
        }
    }
    return res;
}
```

<style>
@import url('static/css/vueCode.css');
</style>