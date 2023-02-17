## 面筋儿

---


> #### 浏览器打开全屏模式 即 手动触发`F11`

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
<h1>全屏模式</h1>
<p>单击“打开全屏模式”按钮以全屏模式打开此页面。通过单击键盘上的“Esc”键或使用“关闭全屏模式”按钮将其关闭。</p>

<button onclick="openFullscreen();">打开全屏模式</button>
<button onclick="closeFullscreen();">关闭全屏模式</button>
```

```javascript
// 使用 JavaScript 在全屏模式中打开页面
var elem = document.documentElement;
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}
```

---

- ### 满足 (a === 1 && a === 2 && a === 3) 的值为true? 

#### `方法一 :`

```javascript
class A {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return this.value++;
  }
}
const a = new A(1);
if (a == 1 && a == 2 && a == 3) {
  console.log("Hi world!");
}
```
> ####  当然，你也可以不使用toString，换成valueOf也行，效果也是一样的

#### `方法二 :`

```javascript
class A extends Array {
  join = this.shift;
}
const a = new A(1, 2, 3);
if (a == 1 && a == 2 && a == 3) {
  console.log("Hi world!");
}

```

#### `babel7 ：` 

```javascript
"use strict";

function _defineProperty(obj, key, value) { 
if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } 
else { obj[key] = value; } return obj; }

class A extends Array {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "join", this.shift);
  }

}

const a = new A(1, 2, 3);

if (a == 1 && a == 2 && a == 3) {
  console.log("Hi world!");
}
```

#### `方法三 :`

```javascript
var value = 1;
Object.defineProperty(window, "a", {
  get() {
    return this.value++;
  }
});

if (a === 1 && a === 2 && a === 3) {
  console.log("The World!");
}

```

---

- ### 数组扁平化

##### `递归`

```javascript
function flatter(arr) {
  if (!arr.length) return;
  return arr.reduce(
    (pre, cur) =>
      // 如果当前的值为数组则开始递归在直到数组完全展开
      Array.isArray(cur) ? [...pre, ...flatter(cur)] : [...pre, cur],
    []
  );
}
(flatter([1, 2, [1, [2, 3, [4, 5, [6]]]]]));
// > [1, 2, 1, 2, 3, 4, 5, 6]
```
##### `使用 flat`
```javascript
const arr = [1, 2, [1, [2, 3, [4, 5, [6]]]]];

console.log(arr.flat(Infinity));

```
?> `flat() `方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。参数指定要提取嵌套数组的结构深度，默认值为 1。

---

- ### 手写 ` AJAX `

```javascript
const getJSON = function (url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(xhr.responseText));
      }
    };
    xhr.send();
  });
};

```

- ### 虚拟 Dom 转化为真实 Dom

```javascript
// 真正的渲染函数
function _render(vnode) {
  // 如果是数字类型转化为字符串
  if (typeof vnode === "number") {
    vnode = String(vnode);
  }
  // 字符串类型直接就是文本节点
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }
  // 普通DOM
  const dom = document.createElement(vnode.tag);
  if (vnode.attrs) {
    // 遍历属性
    Object.keys(vnode.attrs).forEach((key) => {
      const value = vnode.attrs[key];
      dom.setAttribute(key, value);
    });
  }
  // 子数组进行递归操作
  vnode.children.forEach((child) => dom.appendChild(_render(child)));
  return dom;
}

var vv = {
  tag: 'DIV',
  attrs:{
  id:'app'
  },
  children: [
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] }
      ]
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] },
        { tag: 'A', children: [] }
      ]
    }
  ]
}

console.log(_render(vv))
```

> #### 处理字符串为代码内容

```javascript

// 例如 ：处理 String ： " 1 < 3 " 的返回

new Function("return 1 < 3")()

eval('1 < 3')

```

> #### 震惊我3年的js

```javascript
(!(~+[])+{})[--[~+""][+[]]*[~+[]] + ~~!+[]]+({}+[])[[~!+[]]*~+[]]
// 'sb'

"false[object object]"[3] 
// 's'
"[object object]"[2]
// 'b'
```

```javascript
'(!(~+[])+{})[--[~+""][+[]]*[~+[]] + ~~!+[]]+({}+[])[[~!+[]]*~+[]]', 
// +[] ==> 0
'(!(~0)+{})[--[~+""][+[]]*[~+[]] + ~~!+[]]+({}+[])[[~!+[]]*~+[]]',
// ~0 ==> -1  取反减1
'(!(-1)+{})[--[~+""][+[]]*[~+[]] + ~~!+[]]+({}+[])[[~!+[]]*~+[]]',
// !(-1) ==> false 
'(false+{})[--[~+""][+[]]*[~+[]] + ~~!+[]]+({}+[])[[~!+[]]*~+[]]',
// false+{} ==> "false[object object]"
'"false[object object]"[--[~+""][+[]]*[~+[]] + ~~!+[]]+({}+[])[[~!+[]]*~+[]]',
// +"" ==> 0
'"false[object object]"[--[~0][+[]]*[~+[]] + ~~!+[]]+({}+[])[[~!+[]]*~+[]]',
// ~0 ==> -1
'"false[object object]"[--[-1][+[]]*[~+[]] + ~~!+[]]+({}+[])[[~!+[]]*~+[]]',
// +[] ==> 0
'"false[object object]"[--[-1][0]*[~+[]] + ~~!+[]]+({}+[])[[~!+[]]*~+[]]',
// +[] ==> 0
'"false[object object]"[--[-1][0]*[~0] + ~~!+[]]+({}+[])[[~!+[]]*~+[]]',
// ~0 ==> -1
'"false[object object]"[--[-1][0]*[-1] + ~~!+[]]+({}+[])[[~!+[]]*~+[]]',
// --[-1][0] ==> -2
'"false[object object]"[-2*[-1] + ~~!+[]]+({}+[])[[~!+[]]*~+[]]',
// [-1] ==> "-1"
'"false[object object]"[-2*"-1" + ~~!+[]]+({}+[])[[~!+[]]*~+[]]',
// "-1" ==> 1
'"false[object object]"[-2*-1 + ~~!+[]]+({}+[])[[~!+[]]*~+[]]',
// -2*-1 ==> 2
'"false[object object]"[2 + ~~!+[]]+({}+[])[[~!+[]]*~+[]]',
// +[] ==> 0
'"false[object object]"[2 + ~~!0]+({}+[])[[~!+[]]*~+[]]',
// !0 ==> true
'"false[object object]"[2 + ~~true]+({}+[])[[~!+[]]*~+[]]',
// ~true ==> -2
'"false[object object]"[2 + ~-2]+({}+[])[[~!+[]]*~+[]]',
// ~-2 ==> 1
'"false[object object]"[2 + 1]+({}+[])[[~!+[]]*~+[]]',
// 2+1 ==> 3
'"false[object object]"[3]+({}+[])[[~!+[]]*~+[]]',
// "false[object object]"[3] ==> s
'"s"+({}+[])[[~!+[]]*~+[]]',
// {} ==> "[object object]"
'"s"+("[object object]"+[])[[~!+[]]*~+[]]',
// [] ==> ""  [].toString() 
'"s"+("[object object]"+"")[[~!+[]]*~+[]]',
// "[object object]"+""  ==> "[object object]"
'"s"+"[object object]"[[~!+[]]*~+[]]',
// +[] ==> 0
'"s"+"[object object]"[[~!0]*~+[]]',
// !0 => true
'"s"+"[object object]"[[~true]*~+[]]',
// ~true ==> -2
'"s"+"[object object]"[[-2]*~+[]]',
// +[] ==> 0
'"s"+"[object object]"[[-2]*~0]',
// ~0 ==> -1
'"s"+"[object object]"[[-2]*-1]',
// [-2] ==> "-2"
'"s"+"[object object]"["-2"*-1]',
// "-2" ==> 2
'"s"+"[object object]"[-2*-1]',
// -2*-1 ==> 2
'"s"+"[object object]"[2]',
// "[object object]"[2] ==> b
'"s"+"b"',
// "s" + "b" ==> "sb"
'"sb"',


-----

([][[]]+[])[+!![]]+([]+{})[!+[]+!![]]
// 'nb'
```

> #### 冷知识

```javascript
![] == false // true

![] === false // true

[] == false // true

[] === false // false
```

```javascript
'' == '0' // false

0 == '' // true

0 == '0' // true

false == 'false' // false

false == '0' // true

false == undefined // false

false == null // false

null == undefined // true

'\t\r\n' == 0 // true
```

<style>
@import url('static/css/code2.css');
</style>