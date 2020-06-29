## JavaScript Promise 对象

<br >

>#### ECMAscript 6 原生提供了 Promise 对象。Promise 对象代表了未来将要发生的事件，用来传递异步操作的消息。

`JavaScript Demo: Promise Constructor:`

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo');
  }, 300);
});

promise1.then((value) => {
  console.log(value);
  // expected output: "foo"
});

console.log(promise1);
// expected output: [object Promise]
```