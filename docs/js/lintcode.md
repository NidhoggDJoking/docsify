### Lintcode / Leetcode  `登神长阶`

<hr>

####  空间换时间 `Map`

> #### 如果指定的属性在指定的对象或其原型链中，则 `in` 运算符返回`true`。

```javascript

// 数组
var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
0 in trees        // 返回true
3 in trees        // 返回true
6 in trees        // 返回false
"bay" in trees    // 返回false (必须使用索引号,而不是数组元素的值)

"length" in trees // 返回true (length是一个数组属性)

Symbol.iterator in trees // 返回true (数组可迭代，只在ES2015+上有效)


// 内置对象
"PI" in Math          // 返回true

// 自定义对象
var mycar = {make: "Honda", model: "Accord", year: 1998};
"make" in mycar  // 返回true
"model" in mycar // 返回true
```

### 复杂度 `值的大小 X`  `执行时间 Y`

> #### 复杂度依次  `2^n` > `n^2` > `nlogn` > `n` > `logn`

<img width="888" src="static/png/Complexity.png" />

#### &nbsp; &nbsp;[函数制图](http://www.fooplot.com)

<hr>

### 有符号位移:


### " >> "运算符


```javascript
5 >> 1 // 2
6 >> 1 // 3
7 >> 1 // 4

// x >> 1 等价于 除2向下取整

// 而当>>1变为2时则是重复两次

10 >> 2 // 2
// 既：
10 >> 1 //5
5 >> 1 //2
```

### "&" 运算符

> #### " & " 运算符（位与）用于对两个二进制操作数逐位进行比较。

```javascript
console.log(12 & 5);  //返回值4
// 转换为2进制
12 > 1100
5  > 0101
// 逐位进行比较:00为0 , 01为0 , 11为1 
0100 > 1*4 = 4

console.log(12 & 10);  //返回值8
// 转换为2进制
12 > 1100
10 > 1010
// 逐位进行比较 即:有0取0
1010 > 1*8 + 1*2 = 10

```

### "|" 运算符

> #### " | " 运算符（位或）用于对两个二进制操作数逐位进行比较。
```javascript
console.log(12 | 5);  //返回值13
// 转换为2进制
12 > 1100
5  > 0101
// 逐位进行比较:00为0 , 01为1 , 11为1
1101 > 8+2+1 = 13

console.log(12 | 10); //返回值14
// 转换为2进制
12 > 1100
10 > 1010
// 逐位进行比较 即:有1取1
1110 > 8+4+2 = 14

```

`奇技淫巧 - 向下取整`

```javascript
3.1415926535 | 0
// 3
```

### "^" 运算符

> #### " ^ " 运算符（位异或）用于对两个二进制操作数逐位进行比较。

```javascript
console.log(12 ^ 5);  //返回值9
// 转换为2进制
12 > 1100
5  > 0101
// 逐位进行比较:相同为0,不同为1
1001 > 8 + 1 =9

console.log(12 ^ 10); //返回值6
// 转换为2进制
12 > 1100
10 > 1010
// 逐位进行比较:相同为0,不同为1
0110 > 4 + 2 = 6
```


### "~" 运算符

> #### " ~ " 运算符（位非）用于对一个二进制操作数逐位进行取反操作。

```javascript
console.log(12 ~ 5);  //返回错误 Uncaught SyntaxError: missing ) after argument list

// 需单独使用

console.log( ~ 12 );  //返回值-13
12 > 1100

// 位非运算实际上就是对数字进行取负运算，再减 1。
console.log( ~ 12 == -(12+1)); //返回true

```

|   9   |    原码    |    反码    |    补码    |
| :---: | :--------: | :--------: | :--------: |
| 正 数 | `00001001` | `00001001` | `00001001` |
| 负 数 | `10001001` | `11110110` | `11110111` |


?> 正数的原码反码补码都一样.唯有负数不一样。左边第一位是符号位(0是正数,1是负数)<br>
负数的反码是：除符号位其余取反。<br>
补码是在反码的基础上+1.<br>
负数的补码怎么回到原码? 在补码的基础上除符号位其余取反再+1即使负数的原码

` ~~  转换成数字并且把小数点去掉  效率比Math.floor(向下取整)高`

```javascript
var a = 8.86
console.log(~~a);
//返回值 8
    
var a = '13.14'
console.log(~~a);
//返回值 13
```

### "**" 运算符

> #### " ** " 运算符用于对一个数进行乘方计算。

```javascript
// 例 2 的 3次方

2*2*2

2**3

// Math.pow()是用bai来计算乘方

Math.pow(2,3)
```


### "&&" , "||"  替代  "if"

> #### 以下方法不被推荐因为是降低了代码的可读性

```javascript
if (fn) fn()

fn && fn()


if (!fn) fn()

fn || fn()
```

### 一元操作符加号 `+`

> #### 一元操作符加号尝试将 bool 转为 number

```javascript
+true; // 1

+false; // 0
```

### 高精度运算：

> #### 在Js经常出现以下的低精度运算误差

```javascript
0.1+0.2
// 0.30000000000000004

0.1*0.2
// 0.020000000000000004

0.3-0.1
// 0.19999999999999998
```

> #### 加法：

```javascript
//加法  
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try { 
        r1 = arg1.toString().split(".")[1].length 
    } catch (e) { 
        r1 = 0 
    }
    try { 
        r2 = arg2.toString().split(".")[1].length 
    } catch (e) { 
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
}
accAdd(0.1,0.2)
// 0.3

// Math.max(x,y) 函数返回一组数中的最大值
// Math.pow(x,y) 可返回 x 的 y 次幂的值
```

?> 将两个数都乘以一个10的N次幂使两个数变成整数然后进行加法运算在将结果除以那个10的N次幂避免小数计算

> #### 减法：

```javascript
function Subtr(arg1,arg2){ 
  var r1,r2,m,n; 
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0} 
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0} 
  m=Math.pow(10,Math.max(r1,r2)); 
  n=(r1>=r2)?r1:r2; 
  return ((arg1*m-arg2*m)/m).toFixed(n); 
}
Subtr(0.3,0.1)
// "0.2"

// toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。
```

?> 思路与加法一样，不过这`.toFixed(n)`


> #### 乘法：

```javascript
 //乘法 
 function accMul(arg1, arg2) {
     var m = 0,
         s1 = arg1.toString(),
         s2 = arg2.toString();
     try {
         m += s1.split(".")[1].length
     } catch (e) {}
     try {
         m += s2.split(".")[1].length
     } catch (e) {}
     return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
 }
 accMul(0.1,0.2)
 // 0.02
```

?> 思路与加法类似,也可以都乘以一个10的N次幂在除以那个10的N次幂2次

> #### 除法：


```javascript
function accDiv(arg1, arg2) {
    var t1 = 0,
        t2 = 0,
        r1, r2;
    try { t1 = arg1.toString().split(".")[1].length } catch (e) {}
    try { t2 = arg2.toString().split(".")[1].length } catch (e) {}
    with(Math) {
        r1 = Number(arg1.toString().replace(".", ""))
        r2 = Number(arg2.toString().replace(".", ""))
        return accMul((r1 / r2), pow(10, t2 - t1));
    }
}
```

?> 目前尚未碰到过除法精度问题


> #### 大数相加:

```javascript
function sumBigNumber(a, b) {
  var res = '', temp = 0;
  a = a.split('');
  b = b.split('');
  while (a.length || b.length || temp) {
    temp += ~~a.pop() + ~~b.pop();
    res = (temp % 10) + res;
    temp = temp > 9;
  }
  return res.replace(/^0+/, '');
}
```

?> 将数字转换数组对应的下标数相加去个位数，进位存储在temp参与下一次相加，布尔类型的temp参与四则运算默认false为0 true为1因为加法运算最多进位为一所以可以使用


<style>
@import url('static/css/code3.css');
</style>
