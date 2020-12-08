## 防抖

> #### 在事件被触发n秒后，再去执行回调函数。如果n秒内该事件被重新触发，则重新计时。
> #### 结果就是将频繁触发的事件合并为一次，且在最后执行。

?> 例：电梯5秒后会关门开始运作，如果有人进来，等待5秒，5秒之内又有人进来，5秒等待重新计时...直至超过5秒，电梯才开始运作。

!> 在砸瓦鲁多里的你抖动了一下被DIO看到DIO的砸瓦鲁多将继续

> ### 输出式场景

```html
<html>
<head>
    <title>加入防抖</title>
</head>
<body>
    <div>
        加入防抖：<input type="text" id="debounce"/>
    </div>
    <script>
        window.onload = () => {
            function ajax (data) {
                console.log(new Date().toLocaleTimeString() + ' - ' + data)
            }

            function debounce (fn, delay) {
                return args => {
                    console.log(fn.id)
                    console.log(args)
                    clearTimeout(fn.id)

                    fn.id = setTimeout(() => {
                        fn.call(this, args)
                    }, delay)
                }
            }
           
            const debounceAjax = debounce(ajax, 1000)

            document.querySelector('#debounce').addEventListener('keyup', e => {
                debounceAjax(e.target.value)
            })
        }
    </script>
</body>
</html>
```

> ### 触发式场景 `依次为：无防抖，防抖，防抖（立即执行）`

<div class="debounceBox1">
    0
</div>

<div class="debounceBox2">
    0
</div>

<div class="debounceBox3">
    0
</div>

```javascript
    let Debounce = function (fn, delay = 300, immediate = false) {
    let timer = null // 闭包存储setTimeout状态
    return function () {
        let self = this // 事件源this
        let args = arguments // 接收事件源的event
        if (timer) clearTimeout(timer) // 存在就清除执行fn的定时器
        if (immediate) { // 立即执行
            let callNow = !timer // 执行fn的状态
            timer = setTimeout(function () {
                timer = null
            }, delay)
            if (callNow) fn.apply(self, args)
        } else { // 非立即执行
            timer = setTimeout(function () { // 或者使用箭头函数将this指向dom
                fn.apply(self, args)
            }, delay)
        }
    }
}

let con1 = document.querySelector('.debounceBox1')
let con2 = document.querySelector('.debounceBox2')
let con3 = document.querySelector('.debounceBox3')


con1.onmousemove = addNum // 无防抖

con2.onmousemove = Debounce(addNum) // 防抖

con3.onmousemove = Debounce(addNum, 300, true) // 防抖（立即执行）
```

### 节流

> #### 规定一个时间n，n秒内，将触发的事件合并为一次并执行。

?> 例：电梯等第一个人进来之后，5秒后准时运作，不等待，若5秒内还有人进来，也不重置。

!> 无论你已多快的速度触发它都会按照自己的节奏响应，好像漏水的水管无论多大的水压它还是滴答滴答流动 

> ### 输出式场景

```html
<!DOCTYPE html>
<html>
<head>
    <title>加入节流-定时器</title>
</head>
<body>
    <div>
        加入节流-定时器：<input type="text" id="throttle"/>
    </div>
    <script>
        window.onload = () => {
            function ajax (data) {
                console.log(new Date().toLocaleTimeString() + ' - ' + data)
            }

            function throttle (fn, delay) {
                return args => {
                    if (fn.id) return

                    fn.id = setTimeout(() => {
                        fn.call(this, args)
                        clearTimeout(fn.id)
                        fn.id = null
                    }, delay)
                }
            }

            const throttleAjax = throttle(ajax, 1000)

            document.querySelector('#throttle').addEventListener('keyup', e => {
                throttleAjax(e.target.value)
            })
        }
    </script>
</body>
</html>

```

> ### 触发式场景 `依次为：无节流，节流`

<div class="throttleBox1">
    0
</div>

<div class="throttleBox2">
    0
</div>

```javascript
let Throttle = function (fn, delay = 500) {
    let flag = true
    return function () {
        let self = this
        let args = [...arguments]
        if (!flag) return
        flag = false
        setTimeout(function () {
            fn.apply(self, args)
            flag = true
        }, delay)
    }
}

let ton1 = document.querySelector('.throttleBox1')
let ton2 = document.querySelector('.throttleBox2')

let addNum = function (args) {
    this.innerText = (+this.innerText) + 1
}


ton1.onmousemove = addNum // 无节流

ton2.onmousemove = Throttle(addNum, 1000) // 节流
```

# `添加是否立即执行用法同防抖`

```javascript
// 是否立即执行
let ThrottlePro = function (fn, delay = 500, immediate = false) {
    let preTime = 0 // 记录上一次执行时间
    return function () {
        let self = this, // 保留执行时候的的this
            args = [...arguments], // 执行时候的传入参数
            nowTime = +new Date(), // 记录当前的时间
            flag = nowTime - preTime >= delay // 执行命令
        if (immediate) { // 是否立即执行
            if (!flag) return
            preTime = nowTime // 更新执行时间
            fn.apply(self, args)
        } else {
            if (!flag) return // 不满足执行条件
            preTime = nowTime
            setTimeout(function () {
                fn.apply(self, args)
            }, delay)
        }
    }
}

```
<script>
    // =============计步器=================
    let addNum = function (args) {
        // console.log(this, args)
        this.innerText = (+this.innerText) + 1
    }

    // ==============防====抖==================

    let Debounce = function (fn, delay = 300, immediate = false) {
    let timer = null // 闭包存储setTimeout状态
    return function () {
        let self = this // 事件源this
        let args = arguments // 接收事件源的event
        if (timer) clearTimeout(timer) // 存在就清除执行fn的定时器
        if (immediate) { // 立即执行
            let callNow = !timer // 执行fn的状态
            timer = setTimeout(function () {
                timer = null
            }, delay)
            if (callNow) fn.apply(self, args)
        } else { // 非立即执行
            timer = setTimeout(function () { // 或者使用箭头函数将this指向dom
                fn.apply(self, args)
            }, delay)
        }
    }
}

let con1 = document.querySelector('.debounceBox1')
let con2 = document.querySelector('.debounceBox2')
let con3 = document.querySelector('.debounceBox3')



con1.onmousemove = addNum // 无防抖

con2.onmousemove = Debounce(addNum) // 防抖

con3.onmousemove = Debounce(addNum, 300, true) // 防抖（立即执行）

// ==============防====抖==================



// ===============节===流====================

let Throttle = function (fn, delay = 500) {
    let flag = true
    return function () {
        let self = this
        let args = [...arguments]
        if (!flag) return
        flag = false
        setTimeout(function () {
            fn.apply(self, args)
            flag = true
        }, delay)
    }
}

let ton1 = document.querySelector('.throttleBox1')
let ton2 = document.querySelector('.throttleBox2')


ton1.onmousemove = addNum // 无节流

ton2.onmousemove = Throttle(addNum, 1000) // 节流



// ===============节===流====================


</script>

<style>
.debounceBox1,.debounceBox2,.debounceBox3,.throttleBox1,.throttleBox2{
    width:100px;
    height:100px;
    margin:10px;
    cursor: pointer;
    text-align: center;
    line-height: 100px;
    color:#fff;
    font-size:20px;
    border-radius: 8px;
    display: inline-block;
}
.debounceBox1{
    background-color:#c5558f;
}
.debounceBox2{
    background-color:#6358d0;
}
.debounceBox3{
    background-color:#1cb77c;
}

.throttleBox1{
    background-color:#f44336;
}
.throttleBox2{
    background-color:#1eb3f7;
}
</style>