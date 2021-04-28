## 面筋儿

> #### 冷知识

```javascript
![] == false
true

![] === false
true

[] == false
true

[] === false
false
```

```javascript
'' == '0'
false

0 == '' 
true

0 == '0'
true

false == 'false'
false

false == '0'
true

false == undefined
false

false == null
false

null == undefined
true

'\t\r\n' == 0
true
```

---

#### 使用SSR是否无须再使用NodeJS中间件了

#### 微前端 + 中间件 best march

#### servicework 原理（反正是真的快）
---


> 浏览器打开全屏模式 即“F11”

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

<style>
@import url('static/css/code2.css');
</style>