### event.preventDefault :

>  Event 接口的 preventDefault()方法，告诉user agent：如果此事件没有被显式处理，它默认的动作也不应该照常执行。此事件还是继续传播，除非碰到事件侦听器调用stopPropagation() 或stopImmediatePropagation()，才停止传播。


阻止默认的点击/键盘输入事件执行

通过在 @keydown 事件中添加以下代码可以阻止键盘输入操作

```js
if(event.preventDefault) event.preventDefault
else windows.event.returnValue = false
```