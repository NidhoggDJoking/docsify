# 宏任务和微任务

> 作为浏览器脚本语言，`JavaScript`的主要用途是与用户互动，以及操作DOM。<br/>
这决定了它只能是单线程，否则会带来很复杂的同步问题。<br/>
比如，假定`JavaScript`同时有两个线程，一个线程在某个DOM节点上添加内容，<br/>
另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？<br/>
所以，为了避免复杂性，从一诞生，`JavaScript`就是单线程由于js是单线程的,<br/>
只有当上一个任务完成之后才会继续完成下一个任务,<br/>
如果前一个任务耗时很长，后一个任务就不得不一直等着。<br/>
于是，所有任务可以分成两种一种是同步任务`synchronous`，另一种是异步任务`asynchronous`。

---

> ##### 例如

```javascript
setTimeout(function() {
    console.log('1');
})

new Promise(function(resolve) {
    console.log('2');
}).then(function() {
    console.log('3');
})

console.log('4');

//打印顺序 2 4 3 1
```

<br/>

- #### 同步任务
> 在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务;


- #### 异步任务
> 不进入主线程、而进入"任务队列" `task queue`的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行;


<div class="event-loop-box">
    <img src="static/png/event.png">
</div>

---

> #### 宏、微任务分类：

<div class="event-loop-flex">

| 宏任务 | 浏览器 | Node |
| :-------- | --------:| :--: |
| `setTimeout` | ✅ |✅ |
| `setInterval` | ✅ | ✅ |
| `setImmediate` | ❌ | ✅ |
| `requestAnimationFrame` | ✅ | ❌ |

| 微任务 | 浏览器 | Node |
| :-------- | --------:| :--: |
| `process.nextTick` | ❌ |✅ |
| `MutationObserver` | ✅ | ❌ |
| `Promise.then catch finally` | ✅ | ✅ |

</div>

!> `Promise` 创建后就会立刻执行 属于微任务的其实只是`then`,`catch`,`finally`

<div class="event-loop-box">
    <img src="static/png/loop.png">
</div>


> #### 增强
 
```javascript
// 加入宏任务1
setTimeout(function() {
    console.log(1)
}, 0);
// Promise 创建立刻执行 输出 2,10,3
new Promise(function(resolve, reject) {
    console.log(2)
    for(var i = 0; i < 10000; i++) {
        if(i === 800) {
            console.log(10)
        }
    i == 9999 && resolve();
    }
    console.log(3)
}).then(function() {
    // 加入微任务
    console.log(4)
})
// 加入宏任务2
setTimeout(function() {
    console.log(9);
    new Promise(function(resolve) {
        console.log(7);
        resolve();
    }).then(function() {
        console.log(8)
    })
}, 0);
// 同步立即执行 输出5
console.log(5);

// 2 10 3 5 4 1 9 7 8
```


<style>
@import url('static/css/VueCode.css');
.event-loop-box{
    width:100%;
    max-width:500px;
}
.event-loop-box > img{
    width:100%;
    height:100%;
}
.event-loop-flex{
    display:flex;
    justify-content: flex-start;
}
.event-loop-flex table{
    width:30%;
}
</style>