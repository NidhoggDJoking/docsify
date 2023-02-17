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

> #### 手写 promise `基于 babel`

```javascript
class MyPromise {
    constructor(executor) {
        // 执行传入的函数参数
        executor(this.resolve, this.reject)
    }

    // 更改为成功状态
    resolve = () => {
    }
    // 更改为失败状态
    reject = () => {
    }
}
```

```javascript
const PENDING = 'pending'; // 等待
const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败
class MyPromise {
    constructor(executor) {
        // 执行传入的函数参数
        executor(this.resolve, this.reject)
    }
    status = PENDING;
    // 更改为成功状态
    resolve = () => {
        // 如果不是等待状态 就阻止程序向下执行
        if (this.status !== PENDING) return;
        this.status = FULFILLED;
    }
    // 更改为失败状态
    reject = () => {
        // 如果不是等待状态 就阻止程序向下执行
        if (this.status !== PENDING) return;
        this.status = REJECTED;
    }
}
```