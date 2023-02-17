# IntersectionObserver

---

> #### 使用`intersectionObserver`实现懒加载

 这玩意挺玄学的代码比通过高度位置计算的多几倍懒加载的效果却肉眼级别的提高

<ul>
    <li><img class="inter" data-src="static/png/1980/1.jpg"></li>
    <li><img class="inter" data-src="static/png/1980/2.jpg"></li>
    <li><img class="inter" data-src="static/png/1980/3.jpg"></li>
    <li><img class="inter" data-src="static/png/1980/4.jpg"></li>
    <li><img class="inter" data-src="static/png/1980/5.jpg"></li>
    <li><img class="inter" data-src="static/png/1980/6.jpg"></li>
    <li><img class="inter" data-src="static/png/1980/7.jpg"></li>
    <li><img class="inter" data-src="static/png/1980/8.jpg"></li>
    <li><img class="inter" data-src="static/png/1980/9.jpg"></li>
    <li><img class="inter" data-src="static/png/1980/10.jpg"></li>
    <li><img class="inter" data-src="static/png/1980/11.jpg"></li>
    <li><img class="inter" data-src="static/png/1980/12.jpg"></li>
    <li><img class="inter" data-src="static/png/1980/13.jpg"></li>
  </ul>

<!-- ```HTML
<ul>
    <li></li>
    <li><img class="inter" data-src="static/png/1980/2.jpg" alt=""></li>
    <li><img class="inter" data-src="static/png/1980/3.jpg" alt=""></li>
    ...
  </ul>
``` -->

> `<img class="inter" data-src="static/png/1980/1.jpg" alt="">`

```javascript
    let imgs = document.querySelectorAll('.inter')
    // 其实这个写法更不错
    // let imgs = document.querySelectorAll('[data-src]')
    let imgArr = Array.prototype.slice.call(imgs)
    // 类数组对象 to 普通数组
    // ES2015
    // The Array.from() method creates a new Array instance
    // from an array-like or iterable object.
    // => Array.from(imgs)
    // 简而言之: 每当有新的元素进入通过滚动条出现在屏幕范围内触发 如下图：
    const io = new IntersectionObserver(ioes => {
    ioes.forEach(ioe => {
        const el = ioe.target
        const intersectionRatio = ioe.intersectionRatio
            if(intersectionRatio > 0 && intersectionRatio <= 1) {
                // 本地图片
                // el.src = el.dataset.src
                // 线上图片
                el.src = getImageURL(500,300,el)
                // io.unobserve(el)
                // 停止观察当前元素 避免不可见时候再次调用callback函数 ()
            }
            // 改为当图片加载完成后再取消观察
            el.onload = el.onerror = () => io.unobserve(el)
        })
    })
    // io.observe接受一个DOM元素，添加多个监听 使用forEach
    for(let i=0;i<imgArr.length;i++) {
        io.observe(imgArr[i])
    }

    // 获取线上图片地址
    function getImageURL(width = 500 , height = 300 , domObj) {
        fetch(`https://picsum.photos/${width}/${height}`)
            .then(response =>{
                domObj.src = response.url
        })
        // 获取图片失败使用本地图片
        .catch(json => domObj.src = domObj.getAttribute('data-src'))
    }
```

<img class="IntersectionObserver" src="static/png/IntersectionObserver.png" alt="">

<br/>

#### [IntersectionObserver API ](http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)

---

# MutationObserver

?> `MutationObserver`接口提供了监视对DOM树所做更改的能力。


```javascript
// 选择需要观察变动的节点
const targetNode = document.getElementById('id');

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true };

// 当观察到变动时执行的回调函数
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
        }
        else if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);

// 以上述配置开始观察目标节点
observer.observe(targetNode, config);

// 之后，可停止观察
observer.disconnect();

```

!> 这个也是 `vue.$nextTick` 的策略之一 `Promise -> MutationObserver -> setTimeout`

#### [ MutationObserver API](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)

<script>
    // ===============使用intersectionObserver实现懒加载START==========================

    let imgs = document.querySelectorAll('.inter')
    let imgArr = Array.prototype.slice.call(imgs)
    // 简而言之: 每当有新的元素通过滚动条出现在屏幕范围内触发
    const io = new IntersectionObserver(ioes => {
    // console.log('ioes:',ioes)
    ioes.forEach(ioe => {
        // console.log('forEach:',ioes)
        const el = ioe.target
        const intersectionRatio = ioe.intersectionRatio
        // console.log('intersectionRatio:',intersectionRatio)
            if(intersectionRatio > 0 && intersectionRatio <= 1) {
                // el.src = el.dataset.src
                el.src = getImageURL(500,300,el)
                // io.unobserve(el)  // 停止观察当前元素 避免不可见时候再次调用callback函数
                // console.log(el)
            }
        el.onload = el.onerror = () => io.unobserve(el)
        })
    })

    for(let i=0;i<imgArr.length;i++) {
        io.observe(imgArr[i])
    }

    function getImageURL(width = 500 , height = 300 , domObj) {
        fetch(`https://picsum.photos/${width}/${height}`)
            .then(response =>{
                domObj.src = response.url
        })
        // 获取图片失败使用本地图片
        .catch(json => domObj.src = domObj.getAttribute('data-src'))
    }

    // ===============使用intersectionObserver实现懒加载END=======================

    // ========== JavaScript - history路由变化监听 ==============

    class Dep {                  // 订阅池
        constructor(name) {
            this.id = new Date() //这里简单的运用时间戳做订阅池的ID
            this.subs = []       //该事件下被订阅对象的集合
        }
        defined() {              // 添加订阅者
            Dep.watch.add(this);
        }
        notify() {              //通知订阅者有变化
            this.subs.forEach((e, i) => {
                if (typeof e.update === 'function') {
                    try {
                        e.update.apply(e)  //触发订阅者更新函数
                    } catch (err) {
                        console.warr(err)
                    }
                }
            })
        }
    }
    Dep.watch = null;

    class Watch {
        constructor(name, fn) {
            this.name = name;       //订阅消息的名称
            this.id = new Date();   //这里简单的运用时间戳做订阅者的ID
            this.callBack = fn;     //订阅消息发送改变时->订阅者执行的回调函数
        }
        add(dep) {                  //将订阅者放入dep订阅池
            dep.subs.push(this);
        }
        update() {                  //将订阅者更新方法
            var cb = this.callBack; //赋值为了不改变函数内调用的this
            cb(this.name);
        }
    }


    var addHistoryMethod = (function () {
        var historyDep = new Dep();
        return function (name) {
            if (name === 'historychange') {
                return function (name, fn) {
                    var event = new Watch(name, fn)
                    Dep.watch = event;
                    historyDep.defined();
                    Dep.watch = null;       //置空供下一个订阅者使用
                }
            } else if (name === 'pushState' || name === 'replaceState') {
                var method = history[name];
                return function () {
                    method.apply(history, arguments);
                    historyDep.notify();
                }
            }

        }
    }())

    window.addHistoryListener = addHistoryMethod('historychange');
    history.pushState = addHistoryMethod('pushState');
    history.replaceState = addHistoryMethod('replaceState');
    window.addHistoryListener('history', function () {
        console.log('窗口的history改变了');
    })

    // history.pushState({first:'first'}, "#", "/first2")
    // window.addHistoryListener('history', function () {
    //     console.log('窗口的history改变了');
    // })
</script>

<style>
    @import url('static/css/code2.css');
    ul li{
        list-style:none;
    }
    .inter{
        width: 500px;
        height: 300px;
        background-color: #cbcbcb;
        border-radius:10px;
        margin-bottom: 20px;
    }
    .IntersectionObserver{
        width:100%;
        max-width:600px;
    }
</style>