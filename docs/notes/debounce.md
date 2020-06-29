### 防抖

> #### 在事件被触发n秒后，再去执行回调函数。如果n秒内该事件被重新触发，则重新计时。结果就是将频繁触发的事件合并为一次，且在最后执行。

?> 例：电梯5秒后会关门开始运作，如果有人进来，等待5秒，5秒之内又有人进来，5秒等待重新计时...直至超过5秒，电梯才开始运作。

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
### 节流

> #### 规定一个时间n，n秒内，将触发的事件合并为一次并执行。

?> 例：电梯等第一个人进来之后，5秒后准时运作，不等待，若5秒内还有人进来，也不重置。

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