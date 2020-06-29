### 异步

>### AsyncFunction

```javascript
function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('joking');
    }, 1000);
  });
}

async function asyncCall() {
  console.log('calling');
  const result = await resolveAfter2Seconds();
  console.log('awaitOver');
  console.log(result);
}

asyncCall();

// calling
// Promise {<pending>}  (等待1s后)
// awaitOver
// joking

```


?> **async** 函数返回的 Promise 对象，必须等到内部所有的 await 命令的 Promise 对象执行完，才会发生状态改变。也就是说，只有当 async 函数内部的异步操作都执行完，才会执行 then 方法的回调。

```javascript
const delay = timeout => new Promise(resolve=> setTimeout(resolve, timeout));
async function f(){
    await delay(1000);
    await delay(2000);
    await delay(3000);
    return 'done';
}

f().then(v => console.log(v)); // 等待6s后才输出 'done'

```

#### さくら　每年都开得如此绚烂，但却不在是最初看到的那朵了。