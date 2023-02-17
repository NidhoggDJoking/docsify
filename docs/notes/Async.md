<!-- ### 异步 -->
<svg viewBox="0 0 220 180">
  <symbol id="s-text">
    <text text-anchor="middle" x="50%" y="80%">异步</text>
  </symbol>
  <g class="g-ants">
    <use xlink:href="#s-text" class="text-copy"></use>
    <use xlink:href="#s-text" class="text-copy"></use>
    <use xlink:href="#s-text" class="text-copy"></use>
    <use xlink:href="#s-text" class="text-copy"></use>
    <use xlink:href="#s-text" class="text-copy"></use>
    <use xlink:href="#s-text" class="text-copy"></use>
  </g>
</svg>

<hr>

> ### AsyncFunction(async/await)

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

> ### Generator

?> ES6 中提出一个叫生成器（Generator）的概念，执行生成器函数，会返回迭代器对象（Iterator），这个迭代器对象可以遍历函数内部的每一个状态。(async/await是generator的语法糖)

```javascript
function* gen() { 
  yield 1;
  yield 2;
  yield 3;
}

let g = gen(); 
// "Generator { }"
```

>#### 方法 :

* ####  [Generator.prototype.next()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator/next)
> ##### 返回一个由 `yield`表达式生成的值.

* #### [Generator.prototype.return()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator/return)
> ##### 返回给定的值并结束生成器.

* #### [Generator.prototype.throw()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator/throw)
> ##### 向生成器抛出一个错误.

<hr>

#### `示例:一个无限迭代器`

```javascript
function* idMaker(){
    let index = 0;
    while(true)
        yield index++;
}

let gen = idMaker(); // "Generator { }"

console.log(gen.next().value); 
// 0
console.log(gen.next().value); 
// 1
console.log(gen.next().value); 
// 2
// ...
```

> ### function*

?> `function*` 这种声明方式(function关键字后跟一个星号）会定义一个生成器函数 (`generator function`)，它返回一个  `Generator`  对象。

```javascript
function* generator(i) {
  yield i;
  yield i + 10;
}

const gen = generator(10);

console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
// expected output: 10
// expected output: 20
// expected output: undefined

function* foo(i) {
  yield i;
  yield i + 10;
  yield i + 100;
}

let str = '';
for (const val of foo(1)) {
  str = str + '-' + val;
}

console.log(str);
// expected output: -1-11-101

```

> #### 实际开发中使用：

```javascript
function fetch(word) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("hello " + word);
        }, 1000)
    })
}

function* gen() {
    try {
        const api1 = yield fetch("China!");
        console.log(1);
 
        const api2 = yield fetch("World!");
        console.log(2);
        
        const api3 = yield fetch("Earth!");
        console.log(3);

    } catch(error) {
        console.log(error);  // Error: 抛出一个错误
    }
    
}
 
const iterator = gen();  // 返回迭代器对象
 
const result = iterator.next().value;
 
result.then(res1 => {
    console.log(res1)
    // iterator.throw(new Error("手动抛出一个错误"))
    return iterator.next().value;
}).then(res2 => {
    console.log(res2)
    return iterator.next().value;
}).then(res3 => {
    console.log(res3)
    return iterator.next().value;
})

// expected output:
> "hello China!"
> 1
(等待1s后)
> "hello World!"
> 2
(等待1s后)
> "hello Earth!"
> 3

```

> #### 为什么说 `async/await` 是 `generator` 的语法糖？

#### `在使用语法糖的情况(与本篇第一个例子相似)`

```javascript
function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, time);
  });
}

async function test () {
  for(let i = 0; i < 10; i++) {
    let result = await sleep(1000);
    console.log(result);
  }
}

test ()
```

>#### 在不使用语法糖的情况(效果等同上面的语法 只是将 `async/await` 转成 `generator` 和 `promise` 来实现)

```javascript
function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, time);
  });
}
let test = function () {
  // ret 为一个Promise对象，因为ES6语法规定 async 函数的返回值必须是一个 promise 对象
  let ret = _asyncToGenerator(function* () {
    for (let i = 0; i < 10; i++) {
      let result = yield sleep(1000);
      console.log(result);
    }
  });
  return ret;
}();

// generator 自执行器
function _asyncToGenerator(genFn) {
  return new Promise((resolve, reject) => {
    let gen = genFn();
    function step(key, arg) {
      let info = {};
      try {
        info = gen[key](arg);
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve(info.value);
      } else {
        return Promise.resolve(info.value).then((v) => {
          return step('next', v);
        }, (error) => {
          return step('throw', error);
        });
      }
    }
    step('next');
  });
}
```

#### 循环中的异步处理


```javascript
let arr = [0,1,2,3,4];

function awit1000(v){
  setTimeout(() => {
      console.log(`this is awit1000:${v}`)
    }, 1000);
}

arr.map(async(v)=>{
  awit1000(v)
})

console.log('这个快')

// expected output:
// 这个快
// undefined
// this is awit1000:0
// this is awit1000:1
// this is awit1000:2
// this is awit1000:3
// this is awit1000:4
```

>#### 如果在开发过程中遇到循环内需要使用异步时恰巧紧接着的代码又要使用循环的结果时：

```javascript
let arr = [0,1,2,3,4];

function resolveAfter2Seconds(v) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`this is awit1000:${v}`)
      resolve(`this is awit1000:${v}`)
    }, 1000);
  });
}


await Promise.all(
  arr.map(async(v)=>{
    await resolveAfter2Seconds(v)
  })
)

console.log('这个还快吗？')

// expected output:
// this is awit1000:0
// this is awit1000:1
// this is awit1000:2
// this is awit1000:3
// this is awit1000:4
// 这个还快吗？
// undefined

```

>#### 使用 `Promise.all` 内嵌带异步操作的循环可以使其变为同步

<br>

#### さくら　每年都开得如此绚烂，但却不在是最初看到的那朵了。

<style>
@import url(https://fonts.googleapis.com/css?family=Montserrat);
@import url('static/css/code3.css');

svg {
    display: block;
    font: 10.5em 'Montserrat';
    /* width: 120px; */
    height: 80px;
    /* margin: 0 auto; */
}

.text-copy {
    fill: none;
    stroke: white;
    stroke-dasharray: 6% 29%;
    stroke-width: 5px;
    stroke-dashoffset: 0%;
    animation: stroke-offset 5.5s infinite linear;
}

.text-copy:nth-child(1){
	stroke: #4D163D;
	animation-delay: -1;
}

.text-copy:nth-child(2){
	stroke: #840037;
	animation-delay: -2s;
}

.text-copy:nth-child(3){
	stroke: #BD0034;
	animation-delay: -3s;
}

.text-copy:nth-child(4){
	stroke: #BD0034;
	animation-delay: -4s;
}

.text-copy:nth-child(5){
	stroke: #FDB731;
	animation-delay: -5s;
}
.text-copy:nth-child(6){
	stroke: #fd3131;
	animation-delay: -6s;
}
@keyframes stroke-offset{
	100% {stroke-dashoffset: -35%;}
}
.markdown-section>svg{
  font-size:6rem;
}
</style>