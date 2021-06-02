## 面筋儿

--- 

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

---


> #### 浏览器打开全屏模式 即 `F11`

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
console.log(flatter([1, 2, [1, [2, 3, [4, 5, [6]]]]]));
// > [1, 2, 1, 2, 3, 4, 5, 6]
```

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

<style>
@import url('static/css/code2.css');
</style>